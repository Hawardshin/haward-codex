# Validation

## Verification Plan

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/planning/large-scope-decomposition-profile.json
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/large-scope-decomposer-agent.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json
```

## Additional Checks

- Core shared settings config contract
- JSON parse
- docs audit
- naming audit
- workspace index/map refresh
- workspace monitor snapshot/build refresh
- omission guard
- grounding guard
- work evaluator
- git status, commit, and push check
