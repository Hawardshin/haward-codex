# Prohibition-To-Positive Constraint Requirement Change

## Change Summary

- New requirement: `REQ-WS-078`
- User request: “AI does not understand prohibitions.”
- Intent: Do not trust prohibition-heavy instructions as-is; convert them into positive behavior targets and checkable execution contracts.

## Change

- Add `prohibition_rewrite_contract` to `agent-platform/configs/usage/ai-usage-gap-profile.json`.
- Add the philosophy principle “Prohibition is not a behavior goal” to `_philosophy/agent-operating-philosophy.en.md`.
- Update `_ops/workflows/59-bridge-ai-usage-gap.md` and `_ops/prompts/89-bridge-ai-usage-gap.md` to convert prohibition-heavy instructions.
- Link the new principle to execution and validation targets in `philosophy-traceability.json`.

## Evidence

- OpenAI prompt guidance recommends saying what to do instead of only saying what not to do.
- Negation benchmark papers show LLMs can handle negation unreliably.
