# Spec: Agent Collaboration Board

## Goal

Make Workspace Monitor show how agents are working together inside task flows.

## Scope

- Combine `_ops/coordination/status.json` agents/tasks with `agent-platform/configs/agents/` definitions into a `collaborationBoard` snapshot.
- Show work lanes, agent-task-project flow, and an agent workload strip in the Agents tab.
- Show each task's status, priority, agent, project, timing, blocker, and next action.
- Preserve the existing static Next.js/Vercel export structure and dependency-free CSS visualization approach.

## Non-Goals

- Real-time websocket tracing
- External observability backend integration
- Agent process control
- Browser-based task status mutation

## Design Decisions

- Data model: add `collaborationBoard` to the snapshot.
- Lane normalization: active, blocked, queued, completed, and other.
- Visualization: CSS grid lane/flow UI without a new chart library.
- Provenance: coordination status and agent config are the primary sources.

## Evidence

- OpenAI Agents SDK tracing suggests recording agent-run events such as handoffs, tool calls, guardrails, and custom events.
- LangGraph/AutoGen materials show multi-agent workflows as nodes and flows.
- Temporal Web UI/Visibility materials support the need for operators to inspect and search workflow executions.
