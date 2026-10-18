import { Requirement, Question, Coverage } from "../schema/kit.js";

/**
 * Deterministic coverage checker (no LLM).
 * Verifies that all must-have requirements are referenced by at least one question.
 */
export function checkCoverage(
  requirements: Requirement[],
  questions: Question[]
): Coverage {
  const mustRequirements = requirements.filter((r) => r.priority === "must");
  const mustIds = new Set(mustRequirements.map((r) => r.id));

  // Collect all requirement IDs referenced by questions
  const coveredIds = new Set<string>();
  for (const q of questions) {
    for (const rid of q.requirement_ids) {
      if (mustIds.has(rid)) {
        coveredIds.add(rid);
      }
    }
  }

  // Find uncovered must-have requirements
  const uncovered: string[] = [];
  for (const mustId of mustIds) {
    if (!coveredIds.has(mustId)) {
      uncovered.push(mustId);
    }
  }

  return {
    uncovered_requirement_ids: uncovered,
    passes: 0, // Caller will set the actual pass count
  };
}
