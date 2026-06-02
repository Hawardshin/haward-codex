# Validation

## Planned Commands

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/orchestration/capability-promotion-registry.json
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/capability-promotion-agent.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

## Additional Checks

- JSON parse
- docs audit
- naming audit
- workspace index/map refresh
- task board refresh
- omission/grounding/evaluator close-out
- idea generation/evaluation fields exist in registry, agent docs, workflow, prompt, and requirement baseline
- human process model fields exist in registry, agent docs, workflow, prompt, and requirement baseline
