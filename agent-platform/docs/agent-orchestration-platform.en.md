# Agent Creation And Orchestration Platform

## Purpose

This platform is not a single chatbot. It is a workspace for turning repeated human work into reusable agents and connecting those agents when a task needs orchestration. A new agent is not just a prompt; it is a reusable capability with input, output, tools, policy, state, handoff, and validation contracts.

The source setting is `agent-platform/configs/orchestration/agent-orchestration-registry.json`.

## Principles

- Agents need explicit input and output contracts.
- Agent tools, skills, CLIs, and file boundaries must be visible in the spec or workflow.
- Multi-agent work should select a pattern first: supervisor/router, sequential pipeline, parallel fan-out/merge, or handoff network.
- State, handoff, human decisions, observability, resources, and evaluation must not stay implicit.
- The platform should not lock itself to one framework. LangGraph, AutoGen, CrewAI, and the OpenAI Agents SDK are references or implementation candidates; the platform contract stays framework-neutral.

## Agent Creation Flow

1. Capture request intent and project boundary.
2. Select the smallest fitting blueprint from `research_agent`, `planning_agent`, `execution_agent`, `evaluation_agent`, `integration_agent`, or `domain_project_agent`.
3. Check research needs and existing agent or tool reuse.
4. For meaningful changes, record requirements and spec artifacts.
5. Create the agent spec under `agent-platform/configs/agents/`.
6. Declare tools, skills, CLI adapters, and installation needs.
7. If several agents are connected, record the orchestration pattern and controls.
8. Run validation commands and save history/evaluation records.

## Orchestration Patterns

- `single_agent`: one agent can complete the task independently.
- `supervisor_router`: a supervisor chooses specialized agents by request type or risk.
- `sequential_pipeline`: one stage artifact feeds the next stage, such as research to plan to implementation to evaluation.
- `parallel_fanout_merge`: independent lanes run in parallel and a merge gate reconciles outputs.
- `handoff_network`: specialized agents dynamically transfer control through explicit handoff payloads.

## Validation Commands

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/agent-orchestrator-agent.json
```

## Operational Notes

Multi-agent orchestration can become slow or hold resources for a long time. If long-running agents, subprocesses, browsers, queues, caches, streams, file handles, or servers are involved, run the `resource-guard-agent` and document cleanup paths plus measurement evidence. If work can run in parallel, use `parallel-work-planner-agent` to define touch paths, dependencies, and merge gates first.
