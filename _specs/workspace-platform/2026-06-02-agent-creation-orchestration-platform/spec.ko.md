# Spec: Agent Creation And Orchestration Platform

## 목표

다양한 reusable agent를 쉽게 만들고 여러 agent를 안전하게 오케스트레이션할 수 있도록 공통 registry, 검증 CLI, workflow, prompt, 문서를 추가한다.

## 요구사항

- `REQ-WS-060`

## 범위

- 포함:
  - agent orchestration registry
  - agent spec/blueprint/pattern/control/lifecycle gate 검증 로직
  - CLI 명령 `check-agent-orchestration`
  - `agent-orchestrator-agent` spec
  - workflow/prompt/navigation/memory/requirements/history 연결
- 제외:
  - LangGraph, AutoGen, CrewAI, OpenAI Agents SDK 설치
  - 실제 multi-agent runtime scheduler
  - UI 기반 agent graph editor

## 성공 기준

- registry가 자기 설명형 설정 계약을 통과한다.
- `check-agent-orchestration`이 필수 blueprint, pattern, controls, gates, validation commands 누락을 탐지한다.
- 새 에이전트 생성/오케스트레이션 작업의 진입점이 `_ops` navigation에 연결된다.
- 메모리 부트스트랩이 registry anchor를 확인한다.
