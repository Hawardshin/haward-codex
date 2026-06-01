# Validation: Agent Creation And Orchestration Platform

## 필수 검증

```bash
cd agent-platform
PYTHONPATH=src python3 -m unittest discover -s tests
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/agent-orchestrator-agent.json
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/orchestration/agent-orchestration-registry.json configs/memory/bootstrap-manifest.json configs/workflows/work-mode-registry.json
PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..
```

## 수용 기준

- 모든 명령이 성공한다.
- agent orchestration report가 `ready`를 반환한다.
- memory bootstrap에 `agent_orchestration_registry` anchor가 포함된다.
