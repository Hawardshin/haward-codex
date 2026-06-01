# Plan Evidence: Timekeeper Agent

## Decision

- Implement Timekeeper as a reusable domain agent in `agent-platform`.
- Reuse the existing `_tools/work-timer` and coordination board.
- Exclude real notification delivery, calendar integration, and a new timing runtime from this scope.
- Treat urgency as a schedule trade-off problem, not permission to skip verification.

## Evidence

- The user explicitly asked for a role that repeatedly calls out time in a company context.
- `REQ-WS-039` and `_tools/work-timer` already exist, so an agent policy is more maintainable than another timing tool.
- Scrum timeboxes, Microsoft critical path, Atlassian scheduling, and PMI scheduling references support separating deadline, timebox, dependency, slack, and resource trade-offs.

## Alternatives

- New `time-tracker` tool: excluded because it would duplicate work-timer.
- Real notification delivery: deferred because tokens/webhooks and channel policy are needed.
- Productivity scoring: excluded because the platform goal is time savings and bottleneck visibility, not worker evaluation.
