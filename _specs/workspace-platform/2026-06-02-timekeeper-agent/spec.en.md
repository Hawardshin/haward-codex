# Spec: Timekeeper Agent

## Goal

Add `timekeeper-agent` so task time, deadlines, timeboxes, critical path, schedule risk, bottlenecks, next checkpoints, and hurry-up trade-offs remain visible.

## Requirements

- `REQ-WS-039`
- `REQ-WS-060`
- `REQ-WS-064`

## Scope

- Included:
  - `timekeeper-agent` spec
  - Korean and English docs
  - requirement, spec, search, plan, evaluation, and request-trace records
  - links to the existing `_tools/work-timer`, coordination board, and notification settings
  - policy preventing urgency from bypassing quality or safety gates
- Excluded:
  - new time-tracking runtime implementation
  - real calendar, Slack, Discord, or Teams notification sending
  - productivity scoring for worker evaluation

## Success Criteria

- `timekeeper-agent` is inspectable/listable through the agent registry.
- The policy translates time pressure into schedule risk and trade-offs.
- Existing work-timer and coordination board structures are reused instead of duplicated.
- Timekeeper proposes scope, sequence, parallelization, or deferred-improvement trade-offs rather than skipping verification.
