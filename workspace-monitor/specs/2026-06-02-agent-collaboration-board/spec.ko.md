# 스펙: 에이전트 협업 작업판

## 목표

Workspace Monitor에서 에이전트들이 서로 어떤 작업 흐름 안에 있는지 UI로 볼 수 있게 한다.

## 범위

- `_ops/coordination/status.json`의 agents/tasks와 `agent-platform/configs/agents/`의 agent definitions를 합쳐 `collaborationBoard` snapshot을 만든다.
- Agents 탭에 작업 lane, agent-task-project flow, agent workload strip을 표시한다.
- 각 task는 status, priority, agent, project, timing, blocker, next action을 보여준다.
- 기존 정적 Next.js/Vercel export 구조와 dependency-free CSS 시각화를 유지한다.

## 비범위

- 실시간 websocket tracing
- 외부 observability backend 연동
- 에이전트 프로세스 제어
- 브라우저에서 task 상태 수정

## 설계 결정

- 데이터 모델: `collaborationBoard`를 snapshot에 추가한다.
- lane 분류: active, blocked, queued, completed, other로 정규화한다.
- 시각화: 새 chart library 없이 CSS grid 기반 lane/flow UI로 구현한다.
- 출처: coordination status와 agent config가 primary source다.

## 근거

- OpenAI Agents SDK tracing은 agent run에서 handoff, tool call, guardrail, custom event 같은 실행 이벤트를 남기는 방향을 제시한다.
- LangGraph/AutoGen 계열 자료는 multi-agent workflow를 노드/흐름으로 보는 접근을 보여준다.
- Temporal Web UI/Visibility 계열 자료는 workflow execution을 운영자가 보고 검색할 수 있어야 한다는 관측성 요구를 뒷받침한다.
