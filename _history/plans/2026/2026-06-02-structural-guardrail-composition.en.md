# Structural Guardrail Composition Plan

## Request

- `UR-2026-06-02-040`
- "Create structural composition."

## Work Mode

- `governance`

## Plan

1. Check web evidence for guardrails and risk management.
2. Separate the new implementation from `REQ-WS-078` and `REQ-WS-079`.
3. Record `REQ-WS-080` in requirement change, review, and baseline files.
4. Implement `agent-platform/src/agent_platform/governance/guardrail_composition.py`.
5. Add the `check-guardrail-composition` CLI command.
6. Add a self-documenting template and unit tests.
7. Write memory bootstrap anchor, history, request trace, work summary, and evaluation files.
8. Validate, commit, and push.

## Evidence

- `_history/web-searches/2026/2026-06-02-structural-guardrail-composition.en.md`
- `_specs/workspace-platform/2026-06-02-structural-guardrail-composition/`
- `agent-platform/configs/governance/structural-guardrail-composition-template.json`
