# Agent Creation And Orchestration Workflow

## Purpose

Use this workflow when the platform needs a new reusable agent, when an existing agent spec changes, or when several agents/tools/CLIs need to be orchestrated through a supervisor, pipeline, fan-out/merge, or handoff pattern.

## Inputs

- User request or repeated workflow candidate
- `agent-platform/configs/orchestration/agent-orchestration-registry.json`
- `agent-platform/configs/agents/`
- `agent-platform/docs/agent-orchestration-platform.ko.md`
- Relevant project boundary and work mode
- Prior agents, tools, skills, CLI adapters, and workflows that may already solve the need

## Sequence

1. Run web-first intake and record the search.
2. Run memory bootstrap.
3. Select `work_mode`; use `governance` when the change affects platform rules, registries, validation gates, or reusable agent contracts.
4. Decide whether the request needs a new agent, an existing agent update, a workflow, a tool, a skill, or only documentation.
5. Select one `agent_blueprint` from the orchestration registry.
6. If the agent will coordinate other agents or tools, select one `orchestration_pattern`:
   - `single_agent`
   - `supervisor_router`
   - `sequential_pipeline`
   - `parallel_fanout_merge`
   - `handoff_network`
7. Define the agent input contract, output contract, allowed tools, policy, docs targets, and validation commands.
8. Define state, handoff, tool access, human checkpoint, observability, resource, and evaluation controls.
9. Create or update the agent spec under `agent-platform/configs/agents/`.
10. If the work changes common behavior, update requirements, specs, memory bootstrap, navigation, and maps.
11. Run:

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/agent-orchestrator-agent.json
```

12. If orchestration launches long-running work, subprocesses, browsers, workers, queues, caches, streams, or servers, run `_ops/workflows/69-resource-leak-prevention.md`.
13. If orchestration fans out parallel lanes, run `_ops/workflows/52-parallel-work-planning.md`.
14. Close with history, request trace, timing, omission/resource/grounding checks when applicable, evaluation, commit, and push.

## Output Contract

- Selected blueprint and rejected alternatives
- Selected orchestration pattern or explicit `single_agent`
- Agent spec path
- State and handoff contract
- Tool access and human checkpoint policy
- Observability, resource, and evaluation controls
- Validation command results
- Requirements/spec/history/evaluation links when meaningful

## Rule

Do not create agent behavior as only an informal prompt. If the behavior will be reused, orchestrated, evaluated, or exposed through the platform, give it a spec and validation gate.
