# 요구사항 변경: Agent Creation And Orchestration Platform

## 변경 ID

- `REQ-CHANGE-2026-06-02-015`

## 변경 요약

사용자는 플랫폼이 다양한 에이전트를 만들고, 다양한 에이전트를 쉽게 만들고, 오케스트레이션할 수 있는 구조가 되어야 한다고 명시했다. 이를 공통 요구사항 `REQ-WS-060`으로 추가했다.

## 추가 요구사항

- `REQ-WS-060`: reusable agent 생성과 multi-agent orchestration은 agent spec contract, blueprint, creation pipeline, orchestration pattern, controls, lifecycle gates, validation commands를 가진 registry로 관리하고 `check-agent-orchestration`으로 검증한다.

## 근거

- 사용자 요청: `UR-2026-06-02-015`
- 외부 참고: LangGraph, Microsoft AutoGen, CrewAI, OpenAI Agents SDK의 공식 문서는 multi-agent 시스템에서 agent 단위, handoff, state, workflow, tracing/evaluation 같은 경계를 분리해 다루는 방향을 보여준다.
- 내부 참고: 기존 platform에는 agent spec과 CLI/parallel pipeline은 있었지만, “agent를 쉽게 만들고 여러 agent를 연결하는 공통 계약”은 분리된 source of truth가 부족했다.

## 영향 범위

- `agent-platform/configs/orchestration/agent-orchestration-registry.json`
- `agent-platform/src/agent_platform/orchestration/agent_orchestration.py`
- `agent-platform/configs/agents/agent-orchestrator-agent.json`
- `_ops/workflows/72-agent-creation-orchestration.md`
- `_ops/prompts/102-agent-creation-orchestration.md`

## 검증

- `check-agent-orchestration`
- `list-agents`
- `inspect-agent`
- `python3 -m unittest discover -s tests`
- `check-config-contract`
- `check-memory-bootstrap`
