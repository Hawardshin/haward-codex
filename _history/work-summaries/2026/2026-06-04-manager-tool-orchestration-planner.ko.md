# 작업 요약: Manager Tool Orchestration Planner

## 결과

`agent-platform`에 manager가 subagent를 도구처럼 호출하는 계획을 만드는 `plan-agent-orchestration` CLI를 추가했다.

## 주요 산출물

- `agent-platform/src/agent_platform/orchestration/manager_tool.py`
- `agent-platform/configs/orchestration/manager-tool-plan-template.json`
- `agent-platform/tests/test_manager_tool_orchestration.py`
- `agent-platform/configs/agents/agent-orchestrator-agent.json`
- `_specs/workspace-platform/2026-06-04-manager-tool-orchestration-planner/`

## 검증 요약

- 새 planner 테스트: 통과
- `plan-agent-orchestration`: `ready_to_orchestrate`
- `check-agent-orchestration`: `ready`
- `check-config-contract`: `self_documenting`
- 전체 test suite는 기존 registry 경로/view-mode 문제 3건으로 실패했으며, 이번 변경 파일과 직접 관련된 diff는 없다.

## 남은 후속 후보

- 실제 LLM/subagent runtime adapter 연결
- planner auto-selection scoring 개선
- runtime trace store와 cancellation/resource cleanup 설계
