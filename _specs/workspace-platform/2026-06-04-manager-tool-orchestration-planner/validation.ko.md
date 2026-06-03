# Validation: Manager Tool Orchestration Planner

## 필수 검증

```bash
cd agent-platform
PYTHONPATH=src python3 -m unittest discover -s tests
PYTHONPATH=src python3 -m agent_platform.cli plan-agent-orchestration configs/orchestration/manager-tool-plan-template.json
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/agent-orchestrator-agent.json
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/orchestration/agent-orchestration-registry.json configs/orchestration/manager-tool-plan-template.json
```

## 추가 검증

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research ../_history/plans/2026/2026-06-04-manager-tool-orchestration-coding-research.json
PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-04-manager-tool-orchestration-omission-input.json
PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-04-manager-tool-orchestration-grounding-input.json
PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-04-manager-tool-orchestration-evaluation-input.json
```

## 수용 기준

- unit test가 성공한다.
- planner 결과가 `ready_to_orchestrate`다.
- manager self-call, unknown subagent, invalid pattern은 테스트에서 `rework_required`로 확인된다.
- config contract와 agent orchestration registry가 ready/self-documenting 상태다.

## 실행 결과

- `tests.test_manager_tool_orchestration`: 5 tests OK
- `tests.test_agent_orchestration tests.test_manager_tool_orchestration`: 9 tests OK
- `plan-agent-orchestration`: `ready_to_orchestrate`
- `complete-coding-research`: `ready_to_implement`
- `check-agent-orchestration`: `ready`
- `check-config-contract`: `self_documenting`
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`
- 전체 `unittest discover -s tests`: 172 tests 중 기존 registry/view-mode readiness 실패 3건이 있으며, 이번 변경 파일과 직접 관련된 diff는 없다.
