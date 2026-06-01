# Spec: Work Mode Enforcement

## Goal

Turn work modes from prompt guidance into execution contracts enforced by config, checks, records, and evaluation.

## Requirement

- `REQ-WS-055`

## Scope

- Add enforcement layers and mode selection record requirements to the work mode registry.
- Add Python CLI commands: `check-work-modes`, `list-work-modes`, and `show-work-mode`.
- Make the work evaluator treat missing `mode_selection_record_targets` as blocking for non-`quick` modes.
- Reflect the rule in policy, workflows, persistent instructions, and memory bootstrap.

## Non-Scope

- Do not force every task into full governance.
- Do not install an external policy engine.

## Acceptance Criteria

- `check-work-modes` checks registry/evaluator drift.
- `evaluate-work` catches missing mode selection records.
- Tests and config checks pass.
