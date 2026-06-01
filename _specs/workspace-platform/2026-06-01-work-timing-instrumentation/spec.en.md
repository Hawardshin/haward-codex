# Spec: Work Timing And Bottleneck Records

## Requirement

- `REQ-WS-039`

## Problem

Work is tracked through history and evaluation, but it is hard to see which phase took the most time. Parallelization and tooling decisions need phase-level timing and bottleneck candidates.

## Goals

- Store per-task timing records under `_history/work-timings/YYYY/`.
- Record duration by phase and explicitly mark unmeasured spans.
- Summarize the slowest measured phase and bottleneck candidates with a tool.
- Show timing summaries in the coordination board and Workspace Monitor.
- Make the work evaluator recognize `timing_summary_targets` as a close-out target.

## Non-Goals

- Do not score human productivity.
- Do not require false second-level precision.
- Do not backfill exact historical timing for old work.

## Design

- `_tools/work-timer/` validates and summarizes timing JSON.
- `_tools/work-timer/configs/work-timing-policy.json` describes phase vocabulary, thresholds, and schema fields.
- `_history/work-timings/` stores per-task timing records.
- `_ops/workflows/42-record-work-timing.md` defines when to record and how to validate timing.
- Tasks in `_ops/coordination/status.json` may include `timing_report`.
- task-board and Workspace Monitor read `timing_report` and show total measured time plus the slowest phase.

## Acceptance Criteria

- work-timer tests pass.
- The current task timing record passes `check`.
- work-evaluator tests pass and count `timing_summary_targets`.
- task-board and Workspace Monitor can display timing summaries.
- config contract, memory bootstrap, and workspace-health pass.
