# Requirement Change: Structural Guardrails

## Change Summary

- New requirement: `REQ-WS-079`
- Request summary: The user said guardrails are necessary.

## Change

- Material-risk work needs structural guardrails instead of prompt wording alone.
- The platform records risk surface, selected guardrail, allowed actions, blocked actions, fallback/escalation, and verification evidence.
- Low-risk reversible work can use light checks; high-risk work needs stronger execution boundaries.

## Reflected In

- `agent-platform/configs/usage/ai-usage-gap-profile.json`
- `_philosophy/agent-operating-philosophy.en.md`
- `_ops/workflows/59-bridge-ai-usage-gap.md`
- `_ops/prompts/89-bridge-ai-usage-gap.md`
- `_docs/operating-models/ai-usage-gap-operating-model.en.md`
