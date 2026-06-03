# 요구사항 변경: Manager Tool Orchestration Planner

## 변경 ID

- `REQ-CHANGE-2026-06-04-001`

## 변경 요약

사용자는 multi-agent를 관리하는 방법으로 manager/subagent 구조를 쓰고, subagent를 도구처럼 다루는 agent orchestration tool을 쉽게 만들라고 요청했다. 기존 `REQ-WS-060`은 agent 생성/오케스트레이션 계약과 검증 게이트를 정의했지만 실제 manager-as-tools 계획 생성 CLI는 없었다.

## 반영 요구사항

- `REQ-WS-060`을 확장해 중앙 manager가 subagent를 tool roster로 호출하는 실행 전 계획을 `plan-agent-orchestration`으로 만들도록 했다.
- 계획 산출물은 manager agent, selected pattern, subagent tool name, input/output contract, allowed/blocked tools, state/handoff/control, human checkpoint, validation command를 포함해야 한다.

## 근거

- 사용자 요청: `UR-2026-06-04-001`
- 외부 참고: OpenAI Agents SDK와 LangChain multi-agent 공식 문서는 manager/agents-as-tools, subagents, router, handoff 패턴을 분리해 설명한다.
- 내부 참고: `_requirements/reviews/2026-06-02-agent-creation-orchestration-platform.ko.md`는 runtime orchestrator 또는 scaffold generator가 향후 개선 후보라고 남겼다.

## 영향 범위

- `agent-platform/src/agent_platform/orchestration/manager_tool.py`
- `agent-platform/src/agent_platform/cli.py`
- `agent-platform/configs/orchestration/manager-tool-plan-template.json`
- `agent-platform/configs/orchestration/agent-orchestration-registry.json`
- `agent-platform/configs/agents/agent-orchestrator-agent.json`
- `agent-platform/docs/agent-orchestration-platform.ko.md`
- `_specs/workspace-platform/2026-06-04-manager-tool-orchestration-planner/`

## 검증

- `plan-agent-orchestration`
- `check-agent-orchestration`
- `check-config-contract`
- `inspect-agent`
- `python3 -m unittest discover -s tests`
