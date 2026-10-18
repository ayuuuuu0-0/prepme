import { z } from "zod";
import { Requirement, Question, Kit, Warning } from "../schema/kit.js";
import { ILlmClient } from "../llm/types.js";
import { checkCoverage } from "./checkCoverage.js";
import { wrapUntrusted } from "../llm/wrapUntrusted.js";

/**
 * Coverage repair loop with deterministic fallback.
 * Ensures 100% must-have requirement coverage per D4 specification.
 *
 * Algorithm:
 * 1. Check initial coverage
 * 2. If gaps exist, run up to 2 repair passes targeting uncovered requirements
 * 3. After 2 passes, apply deterministic fallback for remaining gaps
 *
 * @returns Final questions, updated kit, coverage status, and warnings
 */
export async function runCoverageLoop(
  requirements: Requirement[],
  initialQuestions: Question[],
  llmClient: ILlmClient,
  kit: Kit
): Promise<{
  questions: Question[];
  updatedKit: Kit;
  coverage: { uncovered_requirement_ids: string[]; passes: number };
  warnings: Warning[];
}> {
  const warnings: Warning[] = [];
  let allQuestions = [...initialQuestions];
  let passCount = 1;

  // Initial coverage check
  let coverage = checkCoverage(requirements, allQuestions);
  coverage.passes = passCount;

  // Maximum 2 repair rounds (Decision D4)
  const MAX_REPAIR_PASSES = 2;

  for (let repairPass = 1; repairPass <= MAX_REPAIR_PASSES; repairPass++) {
    if (coverage.uncovered_requirement_ids.length === 0) {
      // All must-haves covered
      break;
    }

    passCount++;

    // Attempt targeted generation for uncovered requirements
    const uncoveredReqs = requirements.filter((r) =>
      coverage.uncovered_requirement_ids.includes(r.id)
    );

    try {
      const repairQuestions = await generateRepairQuestions(
        uncoveredReqs,
        llmClient,
        kit
      );

      if (repairQuestions.length > 0) {
        // Assign IDs and add to collection
        for (const q of repairQuestions) {
          if (kit.id_counters) {
            kit.id_counters.q++;
            q.id = `q${kit.id_counters.q}`;
          }
          q.origin = "generated";
        }
        allQuestions.push(...repairQuestions);
      }
    } catch (error) {
      warnings.push({
        code: "COVERAGE_REPAIR_FAILED",
        message: `Pass ${repairPass} repair generation failed: ${error instanceof Error ? error.message : String(error)}`,
      });
    }

    // Re-check coverage
    coverage = checkCoverage(requirements, allQuestions);
    coverage.passes = passCount;
  }

  // Deterministic fallback for remaining gaps (D4 guarantee)
  if (coverage.uncovered_requirement_ids.length > 0) {
    const fallbackQuestions = generateFallbackQuestions(
      requirements,
      coverage.uncovered_requirement_ids,
      kit
    );

    allQuestions.push(...fallbackQuestions);

    warnings.push({
      code: "MUST_COVERAGE_FALLBACK",
      message: `Applied deterministic fallback for ${fallbackQuestions.length} uncovered must-have requirements after ${MAX_REPAIR_PASSES} repair passes.`,
    });

    // Final coverage check
    coverage = checkCoverage(requirements, allQuestions);
    coverage.passes = passCount;
  }

  // Update kit with final questions
  const updatedKit: Kit = {
    ...kit,
    questions: allQuestions,
    coverage,
  };

  return {
    questions: allQuestions,
    updatedKit,
    coverage,
    warnings,
  };
}

// Schema for repair question generation response
const RepairQuestionSchema = z.object({
  prompt: z.string(),
  answer_outline: z.string(),
  difficulty: z.number().int().min(1).max(3),
  requirement_ids: z.array(z.string()),
  category: z.enum(["technical", "behavioural", "system-design", "company-fit"]),
});

const RepairResponseSchema = z.object({
  questions: z.array(RepairQuestionSchema),
});

/**
 * Generate targeted repair questions for uncovered requirements using LLM.
 */
async function generateRepairQuestions(
  uncoveredReqs: Requirement[],
  llmClient: ILlmClient,
  kit: Kit
): Promise<Question[]> {
  const reqTexts = uncoveredReqs
    .map((r) => `${r.id}: ${r.text} (${r.kind})`)
    .join("\n");

  const systemPrompt = `You are an expert interview question designer. Generate targeted interview questions to cover the following specific requirements that were missed in the initial generation. Each question must directly address at least one of these requirements.`;

  const userPrompt = wrapUntrusted(
    "uncovered-requirements",
    `Uncovered requirements:\n${reqTexts}\n\nGenerate 1-2 high-quality interview questions that directly address these requirements. Return JSON: {"questions": [{"prompt": "...", "answer_outline": "...", "difficulty": 1-3, "requirement_ids": ["..."], "category": "technical|behavioural|system-design|company-fit"}]}`
  );

  const response = await llmClient.generateJson<z.infer<typeof RepairResponseSchema>>(
    {
      system: systemPrompt,
      user: userPrompt,
      stepName: "coverage-repair-pass",
    },
    RepairResponseSchema
  );

  return response.questions.map((q) => ({
    id: "", // Will be assigned by caller
    prompt: q.prompt,
    answer_outline: q.answer_outline,
    difficulty: q.difficulty,
    requirement_ids: q.requirement_ids,
    category: q.category,
    origin: "generated" as const,
  }));
}

/**
 * Generate deterministic fallback questions for requirements that couldn't be covered by LLM.
 * Guarantees 100% must-have coverage per D4.
 */
function generateFallbackQuestions(
  requirements: Requirement[],
  uncoveredIds: string[],
  kit: Kit
): Question[] {
  const fallbackQuestions: Question[] = [];

  for (const reqId of uncoveredIds) {
    const req = requirements.find((r) => r.id === reqId);
    if (!req) continue;

    let qid = "q0";
    if (kit.id_counters) {
      kit.id_counters.q++;
      qid = `q${kit.id_counters.q}`;
    }

    let prompt: string;
    let answerOutline: string;
    let category: "technical" | "behavioural" | "system-design" | "company-fit";

    if (req.kind === "behavioural") {
      category = "behavioural";
      prompt = `Tell me about a time you demonstrated: ${req.text}`;
      answerOutline = `Use the STAR method (Situation, Task, Action, Result) to provide a concrete example showing ${req.text}.`;
    } else if (req.kind === "domain") {
      category = "company-fit";
      prompt = `How does your background in ${req.text} align with this role?`;
      answerOutline = `Connect your domain expertise in ${req.text} to the role's responsibilities and company's needs.`;
    } else {
      // technical
      category = "technical";
      prompt = `Describe your experience with ${req.text}. Provide a concrete example.`;
      answerOutline = `Discuss practical experience with ${req.text}, including tools, techniques, and outcomes from real projects.`;
    }

    // Add evidence context if available
    if (req.evidence && req.evidence.trim()) {
      answerOutline += ` (Requirement from JD: "${req.evidence.substring(0, 100)}...")`;
    }

    fallbackQuestions.push({
      id: qid,
      prompt,
      answer_outline: answerOutline,
      difficulty: 2,
      requirement_ids: [reqId],
      category,
      origin: "fallback",
    });
  }

  return fallbackQuestions;
}
