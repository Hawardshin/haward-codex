# Validation: Infrastructure Expert Agent

## 필수 검증

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/infrastructure-expert-agent.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json`
- `cd agent-platform && PYTHONPATH=src python3 -m unittest discover -s tests`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --category projects --category tools`
- `cd workspace-monitor && npm run collect && npm test && npm run check && npm run build`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-infrastructure-expert-agent-omission.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-infrastructure-expert-agent-grounding.json`
- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-infrastructure-expert-agent-evaluation-input.json`

## 수용 기준

- 모든 CLI 검증이 통과한다.
- agent list에 `infrastructure-expert-agent`가 포함된다.
- monitor snapshot/build가 깨지지 않는다.
- 누락/근거/evaluation 결과가 close-out 가능 상태다.
