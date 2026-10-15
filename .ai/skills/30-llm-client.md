---
name: llm-client
load_when: implementing or changing the model adapter, limiter, retries, fallback chain or dev cache
depends_on: [00-rules, 11-architecture]
related: [23-prompt-safety, 41-batch-cli]
code: packages/core/src/llm
---

# Llm client

## D2. Open-Weight Model Architecture (Google Gemma 2 & Ollama)

- **Challenge Alignment: Side Hustle & Open-Weight Models**:
  - **Primary Engine**: Google Gemma 2 (`gemma2:9b` locally via Ollama `http://localhost:11434/v1`, or `gemma-2-9b-it` via cloud open weights).
  - **Why Open Innovation Matters for this Side Hustle**:
    - **Zero Marginal Inference Cost**: Running inference locally via Ollama or a fixed-price GPU instance costs $0 per generation. A $19/kit side hustle yields ~98% gross profit margins, unlike closed APIs that bleed margins through token billing.
    - **Air-Gapped Candidate Privacy**: Proprietary job postings, candidate notes, and resume details never leave the user's machine. Zero data leakage to closed AI servers.
    - **High-Precision Grounding**: Gemma 2's instruction-following accurately adheres to verbatim quotation extraction without hallucinating phantom skills.
  - **Ordered Fallback Chain**:
    - **Provider 1 (Primary)**: `gemma2-local` (`gemma2:9b` via Ollama).
    - **Provider 2 (Fallback 1)**: `gemma2-cloud` (`gemma2-9b-it` via Groq / OpenRouter / Hugging Face).
    - **Provider 3 (Fallback 2)**: Open-weight Mistral / Llama (`mistral-small` / `llama-3.3-70b`).
    - **Provider 4 (Offline Mock)**: Deterministic `FakeLlmClient` for instant offline testing and CI/CD without model daemons.
  - **Local Inference Adapter**: Provider configuration supports local endpoints (e.g. Ollama, vLLM) without requiring an API key. Defaults to Bearer authentication with token fallback.

## 6.13 LLM client and provider rate limits

**Brief**: "A pipeline that falls over the first time a provider says slow down is the most common way to lose points." The same goes for a briefly failing provider.

- **AGENT**: a queue, retry logic, request logging.
- **GUIDE (spec)**:
  - One shared limiter for the whole process, so concurrent cases in the batch still respect provider limits. It enforces `LLM_RPM`, `LLM_TPM` and `LLM_CONCURRENCY` (start at 1 or 2). Estimate tokens before each call as characters divided by 4.
  - On 429, wait for the `Retry-After` value if present. Otherwise use exponential backoff starting at 2 seconds, doubling, with 25% random jitter, capped at 60 seconds, at most 5 attempts.
  - Retry 5xx responses and network errors the same way. Do not retry other 4xx responses except 408.
  - **Two kinds of 429**. A per-minute limit gets `Retry-After` or backoff. A daily quota that is used up gets no benefit from waiting: treat a 429 with a wait longer than about 60 seconds, or an error message naming a daily quota, as exhaustion. Mark that provider exhausted for the rest of the run and fail over at once.
  - **Provider chain**: an ordered list built from environment variables. Providers with no key are skipped. With one provider, the pipeline runs single-provider and reports `LLM_UNAVAILABLE` only when it is exhausted.
  - **Circuit breaker**: after 3 consecutive failures, skip a provider for a cooldown (for example 60 seconds), then let one trial call through.
  - **Per-step model**: allow `LLM_MODEL_EXTRACT` so the 20-point extraction step can use a stronger model than the other steps. One call per case keeps it inside a small daily quota.
  - **Dev only cache**: when `LLM_DEV_CACHE=1`, store responses in a git-ignored folder keyed by a hash of provider, model and prompt. It protects your daily quota while you debug. It is off by default and never active in the batch run graders use.
  - **Call accounting**: log the number of live calls per run and per day, so you notice before the quota runs out.
  - Trim every prompt to a fixed budget: 6,000 characters per page, 20,000 characters in total for pages.
  - Use the provider's JSON or structured-output mode if it has one. Set a low temperature, such as 0.2.
  - Record every call in a trace: step name, provider, model, input size, latency, attempts, outcome. The trace feeds the job progress view and your video.
  - **Invalid JSON**: strip code fences, parse, validate against the step's schema. On failure, retry once with the validation error appended to the prompt. After 2 failures the step reports `LLM_INVALID_OUTPUT`. Each step has a defined fallback: flashcards derive from questions (6.10), a failed category leaves its requirements to the coverage loop (6.11), the brief falls back to the honest deterministic brief (6.8). Extraction has no fallback, so it fails the case with `EXTRACTION_FAILED`.
  - **Injected client**: the LLM client is passed into `runPipeline`. Tests use a fake client, so they run without network or key.
- **YOU (budget)**: a rough call budget with numbers.

| Step              | Calls              |
| ----------------- | ------------------ |
| Extraction        | 1                  |
| Interview process | 0 or 1             |
| Company brief     | 0 or 1             |
| Questions         | 4                  |
| Flashcards        | 1                  |
| Coverage repair   | 0 to 2             |
| Retries           | a few              |
| **Per case**      | **about 8 to 12**  |
| **5 cases**       | **about 40 to 60** |

Over 15 minutes that is roughly 3 to 4 calls per minute, which fits most free-tier RPM limits. Tokens matter more: if an average call carries 4,000 input tokens, 50 calls send about 200,000 tokens, or about 13,000 per minute over 15 minutes. Compare that figure with your provider's TPM limit. If it is tight, cut calls: derive flashcards in code, skip categories with no requirements, skip the process call when there is no hiring text, cap repairs at 1.

- **Test yourself**: run the 5-case batch and record wall-clock time, calls and retries. Put the real numbers in the README.

## Done when
- A fake client exists and every step test uses it.
- Tests cover: 429 with Retry-After, daily quota exhaustion failing over, circuit breaker cooldown, missing fallback key, invalid JSON retry once, call trace with provider and model.
- Live calls exist only in npm run test:live.
- The real limits for the chosen model are recorded in DECISIONS.md with the date.

---
Section numbers such as 6.11 in this file refer to the master plan. The map in `.ai/README.md` says which skill holds each section.
