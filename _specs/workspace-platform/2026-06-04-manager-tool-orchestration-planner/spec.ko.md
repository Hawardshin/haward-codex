# Spec: Manager Tool Orchestration Planner

## 목표

중앙 manager agent가 여러 specialist subagent를 도구처럼 호출하는 orchestration 구조를 저장소 안에서 쉽게 만들 수 있도록, 실행 전 계획 JSON을 생성하는 CLI와 검증 가능한 입력 템플릿을 추가한다.

## 요구사항

- `REQ-WS-060`
- `REQ-CHANGE-2026-06-04-001`

## 범위

- 포함:
  - `plan-agent-orchestration` CLI
  - registered agent specs 기반 subagent tool roster 생성
  - manager, orchestration pattern, state/handoff/control, human checkpoint, validation command 계획 산출
  - manager tool plan input template
  - 단위 테스트와 문서/요구사항/trace 업데이트
- 제외:
  - 실제 LLM runtime 실행
  - LangGraph, CrewAI, OpenAI Agents SDK 설치
  - parallel worker, queue, long-running process 실행
  - UI graph editor

## 성공 기준

- `plan-agent-orchestration`이 `manager-tool-plan-template.json`을 읽고 `ready_to_orchestrate` JSON을 출력한다.
- 요청된 subagent는 `run_<agent_name>` tool로 표현되고, input/output contract와 tool allow/block 상태가 산출물에 포함된다.
- 누락된 manager, 누락된 requested agent, invalid pattern, manager self-call은 `rework_required`로 분류된다.
- 기존 `check-agent-orchestration`, agent inspect, config contract, unit tests를 통과한다.

## 설계 방향

- 언어/런타임: Python 3.11
- 구조: 기존 `agent_platform.orchestration` package 안에 deterministic planner를 추가한다.
- 패턴: `supervisor_router`를 기본으로 하되 registry의 다른 pattern id도 입력으로 받을 수 있게 한다.
- 정책: manager가 route, subagent tool call, merge, evaluation을 소유한다. subagent는 bounded subtask tool로만 계획된다.
