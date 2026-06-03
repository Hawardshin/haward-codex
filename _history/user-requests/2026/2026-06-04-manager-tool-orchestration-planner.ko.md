# 사용자 요청 요약: Manager Tool Orchestration Planner

## 요약

사용자는 multi-agent를 관리하는 방법으로 중앙 manager와 subagent 구조를 사용하고, subagent를 도구처럼 다루는 agent orchestration tool을 쉽게 만들 수 있는 구조를 요구했다.

## 해석

- 기존 문서/registry만으로 끝내지 않고 실제 CLI 형태의 도구가 필요하다.
- manager가 subagent를 tool roster로 호출하고, final merge/evaluation을 소유하는 구조가 요청 의도에 가장 가깝다.
- 외부 runtime framework 설치는 요청에 직접 포함되지 않았으므로, 실행 전 계획 도구를 먼저 구현한다.

## 반영 위치

- `agent-platform/src/agent_platform/orchestration/manager_tool.py`
- `agent-platform/src/agent_platform/cli.py`
- `agent-platform/configs/orchestration/manager-tool-plan-template.json`
- `agent-platform/configs/agents/agent-orchestrator-agent.json`
- `_requirements/changes/2026-06-04-manager-tool-orchestration-planner.ko.md`
- `_specs/workspace-platform/2026-06-04-manager-tool-orchestration-planner/`
