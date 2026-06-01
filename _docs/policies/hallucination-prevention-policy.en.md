# Hallucination Prevention Policy

## Purpose

Agents in this repository must not publish unsupported probabilistic guesses as final facts. Important answers, documents, plans, and evaluations use claim-level grounding, uncertainty labeling, tool verification, and post-work evaluation.

The operating philosophy lives in [_philosophy/agent-operating-philosophy.en.md](../../_philosophy/agent-operating-philosophy.en.md). This document turns that philosophy into executable policy.

## Principles

- Separate factual claims from opinions, inferences, plans, and user preferences.
- Link factual claims to evidence such as files, command outputs, test results, official docs, papers, data, or web sources.
- Record access dates for freshness-sensitive claims.
- Mark weakly supported content as `uncertain`, `inferred`, or `needs verification` instead of presenting it as fact.
- Do not make a definitive claim when sources conflict until the conflict is resolved.
- Verify code and repository state through real file inspection, tests, or command execution.
- Start every new instruction with web search; for external facts and current information, review source content and record the access date.
- Use at least two independent evidence sources for high-risk judgments.
- Close final outputs through `hallucination-guard-agent` and `work-evaluator-agent`.

## Workflow

1. Classify the factual-risk level of the request.
2. Confirm which project owns the current work.
3. Validate internal knowledge-base evidence with `knowledge-skeptic-agent`.
4. Use `research-insight-planner-agent` with `research-agent-profile.json` when external facts, current information, or multiple references affect the plan.
5. Extract factual claims from the draft output.
6. Attach evidence IDs, source types, access dates, and verification steps to each claim.
7. Treat citations as verification handles, not proof, and check that the source directly supports the claim.
8. Run `hallucination-guard-agent` and require `ready_to_publish`.
9. If the report returns `grounding_required`, remove unsupported claims, add evidence, verify with tools, or caveat uncertainty.
10. Record the grounding check in the final evaluation file.

## Evidence Requirements By Claim Type

| Claim Type | Required Evidence |
| --- | --- |
| Repository state | File paths, `git status`, `rg`, `find`, or index tool output |
| Code behavior | Test result, execution result, and related code path |
| External fact | Official docs, paper, web source, dataset, and access date |
| Current information | Web search result, current official source, and access date |
| Calculation or aggregate | Input data, formula, and execution result |
| Recommendation or judgment | Decision criteria, comparison evidence, and contrary signals |
| User instruction | User message or durable rule document |

## Prohibitions

- Do not claim a file, test, commit, or push is done without checking it.
- Do not assert uncited numbers, dates, versions, prices, laws, policies, or schedules.
- Do not assume external current facts are correct just because an internal document says so.
- Do not use search result titles as evidence without reading the source.
- Do not use weak evidence as a `ready_to_close` basis in evaluation reports.

## Accepted Uncertainty Language

- "Based on the sources checked..."
- "This part was not verified."
- "The source may be stale and should be rechecked."
- "Sources conflict, so this should not be stated definitively."

## Related Operating Files

- [_ops/workflows/70-hallucination-prevention.md](../../_ops/workflows/70-hallucination-prevention.md)
- [_ops/prompts/96-ground-output.md](../../_ops/prompts/96-ground-output.md)
- [agent-platform/docs/hallucination-guard-agent.en.md](../../agent-platform/docs/hallucination-guard-agent.en.md)
- [_research/topics/agent-reliability/2026-05-31-hallucination-prevention.en.md](../../_research/topics/agent-reliability/2026-05-31-hallucination-prevention.en.md)
