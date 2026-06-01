# Web Search Record: Agent Collaboration Board

## Search Date

- 2026-06-02

## Question

What structure should Workspace Monitor use to show agents working together in the UI?

## Queries

- `OpenAI Agents SDK tracing multi agent workflow visualization official docs`
- `LangGraph multi-agent workflows visualization official docs`
- `Temporal Web UI workflow visibility official docs`
- `Microsoft AutoGen multi-agent conversation framework official documentation`

## Sources Checked

- OpenAI Agents SDK Tracing: https://openai.github.io/openai-agents-python/tracing/
- OpenAI Agent Builder: https://platform.openai.com/docs/guides/agent-builder
- LangGraph multi-agent workflows: https://www.langchain.com/blog/langgraph-multi-agent-workflows
- Microsoft AutoGen AgentChat: https://microsoft.github.io/autogen/docs/Use-Cases/agent_chat/
- Temporal Web UI/Visibility materials: https://docs.temporal.io/
- AutoGen paper: https://arxiv.org/abs/2308.08155

## Decision

- Agent collaboration should connect agents, tasks, handoffs, blockers, and projects instead of showing a flat list only.
- Workspace Monitor is static-snapshot based today, so deriving lanes and flows from coordination status is the right current implementation.
- If real-time visibility becomes necessary, a separate trace/event store should be designed later.

## Plan Impact

- Add a `collaborationBoard` snapshot.
- Add a lane board and agent-task-project flow to the Agents tab.
- Keep dependency-free CSS visualization.
