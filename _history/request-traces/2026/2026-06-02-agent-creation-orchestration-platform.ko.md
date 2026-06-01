# 요청-결과 추적: Agent Creation And Orchestration Platform

## 요청

- ID: `UR-2026-06-02-015`
- 요약: 플랫폼으로서 다양한 에이전트를 만들고, 쉽게 만들고, 오케스트레이션할 수 있는 구조를 만든다.

## 요구사항

- `REQ-WS-060`

## 작업 모드

- `governance`

## 결과

- agent creation/orchestration source of truth를 `agent-orchestration-registry.json`으로 추가했다.
- registry를 검증하는 Python 모듈과 CLI `check-agent-orchestration`을 추가했다.
- `agent-orchestrator-agent` spec, 운영 문서, workflow, prompt를 추가했다.
- 메모리 부트스트랩, prompt router, operations index, persistent instructions를 갱신했다.

## 산출물

- `agent-platform/configs/orchestration/agent-orchestration-registry.json`
- `agent-platform/src/agent_platform/orchestration/agent_orchestration.py`
- `agent-platform/src/agent_platform/cli.py`
- `agent-platform/tests/test_agent_orchestration.py`
- `agent-platform/configs/agents/agent-orchestrator-agent.json`
- `agent-platform/docs/agent-orchestration-platform.ko.md`
- `_ops/workflows/72-agent-creation-orchestration.md`
- `_ops/prompts/102-agent-creation-orchestration.md`
- `_specs/workspace-platform/2026-06-02-agent-creation-orchestration-platform/`

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `check-agent-orchestration`
- `list-agents`
- `inspect-agent`
- `check-config-contract`
- `check-memory-bootstrap`

## 평가

- `_history/evaluations/2026/2026-06-02-agent-creation-orchestration-platform.ko.md`

## 커밋

- 예정: `feat(platform): add agent orchestration registry`
