# Timekeeper Agent

## Purpose

`timekeeper-agent` turns the corporate role of repeatedly saying "we are short on time", "we need to move faster", and "the deadline is coming" into a platform agent.

It is not just a pressure agent. Timekeeper keeps deadlines, timeboxes, remaining time, critical path, slack, bottlenecks, next checkpoints, and de-scope options visible. The point is to move faster without weakening quality or safety gates.

## Use When

- The user says "hurry", "by when", "deadline", "duration", or "how long will this take"
- A task needs a time budget and checkpoint cadence at the start
- Work is getting long and bottlenecks should be visible
- The critical path across multiple tasks needs to be identified
- Ship-first, de-scope, parallelization, or deferred improvement decisions are needed
- Deadline risk should trigger configured notifications

## Output Contract

A Timekeeper brief includes:

- requested deadline or timebox
- assumptions when no time budget was specified
- current phase and elapsed time
- remaining time and next checkpoint
- critical path and dependencies
- slack or buffer
- schedule risk: `green`, `yellow`, `red`
- hurry-up options: scope trim, parallelization, ship-first, deferred improvement
- quality or safety items that must not be skipped
- notification or escalation recommendation

## Operating Rules

- "Hurry" is not permission to skip required verification. If verification cannot be reduced, adjust scope, sequence, parallelism, or output depth.
- Do not present unmeasured timing as precise. Mark estimates as estimates.
- Separate hard deadlines, soft targets, estimated deadlines, and user pressure.
- If work is blocked on a user answer, isolate only the `blocked_decision` and continue unaffected work.
- When schedule risk is `red`, propose the minimum shippable output, deferred items, and notification or human decision inbox routing.

## Existing Structure Links

- Time measurement: `_tools/work-timer/`
- Timing records: `_history/work-timings/YYYY/`
- Coordination board display: `_ops/coordination/status.json`
- Parallelization decisions: `parallel-work-planner-agent`
- Work evaluation: `work-evaluator-agent`
- Notifications: `agent-platform/configs/integrations/notification-channels.json`

## Validation Commands

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/timekeeper-agent.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
```

## Related Files

- `agent-platform/configs/agents/timekeeper-agent.json`
- `_tools/work-timer/configs/work-timing-policy.json`
- `_ops/workflows/42-record-work-timing.md`
- `_specs/workspace-platform/2026-06-02-timekeeper-agent/`
