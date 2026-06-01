# Research Note: Agent Collaboration UI

## Summary

For multi-agent work visibility, the UI should show more than a flat agent list. It should connect `agent -> task -> project` relationships, work lanes, blockers, and next actions.

## Referenced Patterns

- OpenAI Agents SDK tracing: records run events, handoffs, tool calls, guardrails, and custom events.
- OpenAI Agent Builder: presents multi-step workflows through a visual canvas.
- LangGraph/AutoGen: frames multi-agent workflows as nodes and connections.
- Temporal visibility/Web UI: supports operator inspection of workflow executions.

## Workspace Monitor Application

- There is no real-time event store yet, so `_ops/coordination/status.json` remains the primary state.
- Generate `collaborationBoard` and split tasks into active, blocked, queued, completed, and other lanes.
- Show the lane board and agent-task-project flow in the Agents tab.

## Uncertainty

- Only one runtime agent is currently registered. The same UI will become more informative when multiple agents are active.
- Real-time traces would require a separate backend or local event log.
