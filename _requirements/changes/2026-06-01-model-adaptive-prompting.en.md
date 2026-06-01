# Model-Adaptive Prompting Requirement Change

## Change Summary

- Date: 2026-06-01
- Source request: `UR-2026-06-01-033`
- Added requirement: `REQ-WS-044`
- Work mode: `governance`

## User Request Summary

The user stated that good and weak models require different usage strategies, and that for weaker non-reasoning models, sending the request twice can produce much better performance.

## Change

Add `REQ-WS-044` to promote model-capability-specific prompting into shared operating rules.

- Weak, non-reasoning, or uncertain models: when cost and latency allow and task variance is high, use two independent attempts or a draft-critique-revise loop.
- Compare and merge: do not simply concatenate outputs; compare convergence, conflicts, missing requirements, and supported parts.
- Strong reasoning models: prioritize clear goal, context, constraints, success criteria, and verification over unnecessary duplicate calls.
- Repeated agreement is not proof; validate with sources, tests, tools, evaluators, or human judgment.

## Evidence

- Self-consistency research shows that sampling multiple reasoning paths and selecting a consistent answer can improve some reasoning benchmark results.
- Self-Refine and Reflexion research support structured draft, feedback, and retry loops for improving outputs.
- OpenAI and Microsoft reasoning-model guidance state that reasoning models and general model families can require different prompting approaches.

## Impact

- `agent-platform/configs/usage/ai-usage-gap-profile.json` becomes the source of truth for model-specific prompt/retry strategy.
- `_ops/workflows/59-bridge-ai-usage-gap.md` and `_ops/prompts/89-bridge-ai-usage-gap.md` classify model capability during gap diagnosis.
- Persistent instructions and memory bootstrap keep the rule discoverable for future sessions.
