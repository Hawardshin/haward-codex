# Requirement Change: Work Timing And Bottleneck Records

## Change ID

- `REQ-CHANGE-2026-06-01-WORK-TIMING`

## Background

The user asked to record per-task duration so bottlenecks are easy to see.

## Change

- Add `REQ-WS-039`.
- Meaningful work stores phase-level timing records under `_history/work-timings/YYYY/`.
- Close-out evaluation input includes `timing_summary_targets` when required by the selected work mode.
- Coordination board and Workspace Monitor show total measured time and the slowest phase when a task links a timing report.

## Evidence

- OpenTelemetry trace/span concepts support breaking work into timed sub-operations.
- Google SRE golden signals treat latency as a core observable signal.
- DORA metrics use workflow-level lead-time measurement to identify improvement areas.

## Impact

- `_tools/work-timer/`
- `_history/work-timings/`
- `_ops/workflows/42-record-work-timing.md`
- `_ops/coordination/`
- `workspace-monitor/`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`

## Verification

- work-timer unit tests
- work-timer timing record check
- work-evaluator unit tests
- task-board freshness
- workspace-monitor tests/typecheck/build
- workspace-health
