# 2026-05-31 Work Mode Routing Requirement Review

## Reviewed Scope

- `REQ-WS-020`
- `_requirements/changes/2026-05-31-work-mode-routing.en.md`
- `agent-platform/configs/workflows/work-mode-registry.json`

## Review Result

- Status: accepted
- Rationale: the existing full loop is safe but creates unnecessary friction for tiny and urgent work. Mode-based routing satisfies the user's efficiency request while preserving `standard` and `governance` strictness.

## Acceptance Criteria

- Work can select a mode at startup.
- The evaluator applies different blocking targets by mode.
- Deferred improvements from `ship_first` are recorded in a backlog target.
- The default mode remains `standard`, preserving current strict close-out behavior and tests.

## Remaining Observation

- After several real tasks, review whether `quick` and `ship_first` are too loose or too strict, then close or revise the backlog item in `_ops/backlog/deferred-improvements.en.md`.
