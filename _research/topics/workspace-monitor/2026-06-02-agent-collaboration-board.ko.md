# 조사 메모: 에이전트 협업 UI

## 요약

멀티 에이전트 작업을 UI로 보여줄 때 핵심은 에이전트 목록만 보여주는 것이 아니라 `agent -> task -> project` 관계, 작업 lane, blocker, next action을 함께 보여주는 것이다.

## 참고한 패턴

- OpenAI Agents SDK tracing: 실행 이벤트, handoff, tool call, guardrail, custom event를 trace로 기록한다.
- OpenAI Agent Builder: multi-step workflow를 visual canvas로 다루는 방향을 제시한다.
- LangGraph/AutoGen: multi-agent workflow를 노드와 연결로 사고한다.
- Temporal visibility/Web UI: workflow execution을 운영자가 볼 수 있어야 한다.

## Workspace Monitor 적용

- 실시간 event store가 없으므로 `_ops/coordination/status.json`을 primary state로 사용한다.
- `collaborationBoard`를 생성해 active, blocked, queued, completed, other lane으로 task를 나눈다.
- UI는 Agents 탭에서 lane board와 agent-task-project flow를 보여준다.

## 불확실성

- 현재 실제 병렬 에이전트 runtime은 하나만 등록되어 있다. 여러 에이전트가 활성화되면 동일 UI가 더 풍부하게 보일 것이다.
- 실시간 trace가 필요하면 별도 backend 또는 local event log가 필요하다.
