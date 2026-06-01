# Web Search Record: Agent Creation And Orchestration Platform

## Request

- `UR-2026-06-02-015`: build the platform so many agents can be created easily and orchestrated.

## Queries

- `LangGraph official documentation multi-agent orchestration agents`
- `Microsoft AutoGen official documentation multi-agent orchestration`
- `CrewAI official documentation multi agent orchestration agents`
- `OpenAI Agents SDK official documentation orchestration agents`
- `LangGraph multi-agent systems supervisor handoffs official docs`

## Sources Checked

| Source | Type | What Was Checked | Decision |
| --- | --- | --- | --- |
| https://docs.langchain.com/oss/python/langchain/multi-agent | official | LangChain multi-agent docs describe patterns such as subagents, handoffs, skills, router, and custom workflow, plus parallelization/context trade-offs. | Used for framework-neutral pattern candidates |
| https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/index.html | official | AutoGen AgentChat separates agents, teams, human-in-the-loop, state, tracing/observability, and multi-agent design patterns. | Reflected in agent spec and orchestration controls |
| https://docs.crewai.com/concepts/crews | official | CrewAI Crews covers agents, tasks, process, memory, cache, callbacks, planning, and YAML configuration. | Reflected in blueprint, agent/task separation, observability, and resource controls |
| https://docs.crewai.com/concepts/flows | official | CrewAI Flows provide event/state workflow references. | Used as stateful orchestration inspiration |
| https://openai.github.io/openai-agents-python/ | official | OpenAI Agents SDK exposes agents, tools, handoffs, and tracing as core concepts. | Reflected in tool/handoff/tracing validation |

## Weak Or Excluded Sources

- Blogs, Reddit, and forum results were treated only as discovery signals. This change establishes a platform contract, so official docs and internal repository structure were prioritized.
- Framework installation instructions were excluded from this scope. Future adoption requires separate installation audit plus license and security review.

## Plan Impact

- Several frameworks converge on separating agents, tools, tasks/workflows, state, handoffs, observability, and evaluation.
- The repository should first define a framework-neutral registry and later attach LangGraph, AutoGen, CrewAI, or the OpenAI Agents SDK through adapters when implementation is justified.
- Prompt-only agent behavior is not maintainable over time, so reusable agents need specs, blueprints, input/output contracts, tool policy, and validation commands.

## Uncertainty

- Framework docs change quickly. The registry stores operating contracts rather than concrete API calls, so latest official docs must be checked again before adopting a framework.

## Public Decision Summary

This work should not install an agent runtime or implement a scheduler yet. The right next step is to add the shared contract and validation gate required to create and connect many agents safely.
