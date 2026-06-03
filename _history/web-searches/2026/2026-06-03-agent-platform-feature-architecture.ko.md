# 2026-06-03 에이전트 플랫폼 기능 아키텍처 웹 검색 기록

## 요청 요약

설치형 데스크톱 앱을 더 이상 웹형 모니터링 UI나 PoC 후보처럼 두지 않고, 에이전트 오케스트레이션, 작업환경, 개발환경, 손쉬운 에이전트 생성, 자동 생성과 학습/성능 개선 플랫폼으로 재구성한다.

## 검색어

- `LangGraph multi agent orchestration official docs agent orchestration platform`
- `Microsoft AutoGen multi agent orchestration official documentation agent framework`
- `OpenAI Agents SDK tracing evaluations official docs agents platform`
- `CrewAI multi agent orchestration official docs`

## 확인한 출처

- OpenAI Agents SDK 공식 문서: agents, tools, guardrails, handoffs, sessions, tracing를 에이전트 앱 구성요소로 확인했다. 제품 기능 레이어에 orchestration, sessions/work environment, tracing/evaluation support를 반영했다.
  <https://openai.github.io/openai-agents-python/>
- OpenAI Agents SDK tracing 공식 문서: tracing은 실행 이해, 디버깅, 평가/튜닝을 위한 관측 계층으로 해석했다. 따라서 monitoring은 primary product가 아니라 learning/evaluation을 지원하는 observability로 배치했다.
  <https://openai.github.io/openai-agents-python/tracing/>
- Microsoft AutoGen 공식 문서: event-driven multi-agent systems, no-code prototyping, runtime/framework 방향을 확인했다. 제품 레이어에서 orchestration과 agent creation surface를 primary로 올리는 근거로 사용했다.
  <https://microsoft.github.io/autogen/stable/>
- LangGraph 공식 multi-agent 자료: subagents, handoffs, skills, routers, custom workflows, context management, parallel execution trade-off를 확인했다. task pipe, process graph, decision inbox, merge gate 구조를 primary orchestration feature로 유지했다.
  <https://langchain-ai.github.io/langgraph/tutorials/multi_agent/multi-agent-collaboration/>
- CrewAI 공식 문서: crews, flows, knowledge, task 중심 구조를 확인했다. agent factory와 work environment의 기능 명명 참고로만 사용했다.
  <https://docs.crewai.com/>

## 약한 출처 또는 제외한 출처

- 블로그/커뮤니티 adoption 신호는 이번 구현 판단의 핵심 근거로 쓰지 않았다.
- 특정 오픈소스 앱 소스코드는 직접 복사하지 않았다. 현재 제품은 이미 Tauri + project-owned renderer + runtime contract 경계를 갖고 있어, 이번 변경은 레지스트리/스냅샷/UI 구조를 기능 중심으로 바꾸는 데 집중했다.

## 계획 반영

- `product-feature-registry.json`를 추가해 primary feature와 supporting observability 역할을 고정한다.
- Workspace snapshot에 product feature architecture를 넣고 customer snapshot에서는 내부 source path와 validation detail을 제거한다.
- Overview 첫 화면에 product feature architecture panel을 추가해 Agent Orchestration, Agent Work Environment, Agent Development Environment, Agent Factory, Learning & Evaluation Loop를 먼저 보여준다.
- readiness/test가 monitoring을 primary로 되돌리는 회귀를 잡게 한다.

## 불확실성

- 각 프레임워크의 구체 API는 계속 바뀔 수 있으므로 이번 작업에서는 특정 framework dependency를 설치하지 않고, 공식 문서의 공통 제품 구조만 반영했다.
