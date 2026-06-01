# Requirement Review: Work Timing And Bottleneck Records

## Review Target

- `REQ-WS-039`

## Fit

- Matches the user intent. Phase-level duration is needed to identify bottlenecks; a total duration alone is not enough.
- Does not conflict with work modes or parallel-work planning. Timing is an observability target, not a replacement mode.
- False precision risk is reduced by `measurement_quality=partial` and `measurement=not_measured`.

## Decision

- Approved.
- Treat timing targets as blocking in `standard`, `research`, and `governance`.
- Keep missing timing non-blocking in `quick` and `ship_first`, while still recording it when the task is meaningful.

## Verification Criteria

- A tool validates the timing record schema.
- Coordination board and Workspace Monitor show timing summaries.
- Work evaluator recognizes `timing_summary_targets`.
