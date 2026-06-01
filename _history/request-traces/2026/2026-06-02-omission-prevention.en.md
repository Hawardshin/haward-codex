# 2026-06-02 Omission Prevention Request Trace

## Request

- ID: `UR-2026-06-02-011`
- Summary: The user noted that an agent can miss something during work, so the platform needs a structure to prevent omissions.

## Result

- Added `REQ-WS-056`
- Added `omission-guard-agent` and `check-omissions`
- Added `omission_check_targets` to `work-evaluator-agent`
- Made omission coverage a blocking close-out target for non-`quick` work modes
- Updated omission policy, workflow, prompt, persistent instructions, memory bootstrap, and navigation

## Key Artifacts

- `agent-platform/src/agent_platform/evaluation/omission_guard.py`
- `agent-platform/configs/evaluation/omission-guard-template.json`
- `agent-platform/configs/agents/omission-guard-agent.json`
- `agent-platform/docs/omission-guard-agent.en.md`
- `_docs/policies/omission-prevention-policy.en.md`
- `_ops/workflows/68-omission-prevention.md`
- `_ops/prompts/99-omission-prevention.md`
- `_specs/workspace-platform/2026-06-02-omission-prevention/`

## Verification

- `python3 -m unittest discover -s tests`
- `check-omissions`
- `check-work-modes`
- `check-memory-bootstrap`
- `check-config-contract`
- `docs-audit`, `naming-audit`, `structure-audit`, `workspace-index`, `task-board`

## Evaluation

- `_history/evaluations/2026/2026-06-02-omission-prevention.en.md`
