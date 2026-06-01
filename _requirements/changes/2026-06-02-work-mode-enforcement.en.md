# Requirement Change: Work Mode Enforcement

## User Instruction

- If modes are only prompted, freedom increases but enforcement does not.
- The platform design becomes stronger only when modes are enforced.

## Change

- Added `REQ-WS-055`.
- Defined work modes as execution contracts enforced through registry config, CLI checks, mode selection records, evaluator gates, and evaluation reports.

## Impact Scope

- `agent-platform/configs/workflows/work-mode-registry.json`
- `agent-platform/src/agent_platform/work_modes.py`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `_ops/workflows/02-select-work-mode.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_docs/policies/work-mode-enforcement-policy.en.md`

## Verification Criteria

- `check-work-modes` must catch drift between the registry and evaluator policy.
- `evaluate-work` must return a blocking gap when non-`quick` modes omit `mode_selection_record_targets`.
