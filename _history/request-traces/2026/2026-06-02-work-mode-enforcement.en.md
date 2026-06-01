# Request Trace: Work Mode Enforcement

## Request Summary

- Prompt-only modes are not enforced; the platform needs stronger design enforcement.

## Result

- Added `REQ-WS-055`.
- Added enforcement layers and mode selection record requirements to the work mode registry.
- Added `check-work-modes`, `list-work-modes`, and `show-work-mode` CLI commands.
- Updated the evaluator so non-`quick` modes block when `mode_selection_record_targets` are missing.
- Reflected the rule in policy, workflows, persistent instructions, memory bootstrap, history, and evaluation docs.

## Key Artifacts

- `agent-platform/src/agent_platform/work_modes.py`
- `agent-platform/configs/workflows/work-mode-registry.json`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `_docs/policies/work-mode-enforcement-policy.en.md`
- `_ops/workflows/02-select-work-mode.md`
- `_ops/workflows/40-evaluate-and-rework.md`

## Evaluation

- `_history/evaluations/2026/2026-06-02-work-mode-enforcement.en.md`
