# Validation: Agent Creation And Orchestration Platform

## Required Checks

```bash
cd agent-platform
PYTHONPATH=src python3 -m unittest discover -s tests
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/agent-orchestrator-agent.json
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/orchestration/agent-orchestration-registry.json configs/memory/bootstrap-manifest.json configs/workflows/work-mode-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..
```

## Acceptance Criteria

- All commands succeed.
- The agent orchestration report returns `ready`.
- Memory bootstrap includes the `agent_orchestration_registry` anchor.
