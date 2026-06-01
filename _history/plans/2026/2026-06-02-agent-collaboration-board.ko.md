# 계획: Agent Collaboration Board

## 요청 요약

Workspace Monitor에서 에이전트들이 서로 작업하고 있는 상황이 UI로 보여야 한다.

## 작업 모드

- `governance`

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-02-agent-collaboration-board.ko.md`
- 조사 메모: `_research/topics/workspace-monitor/2026-06-02-agent-collaboration-board.ko.md`
- 기존 스펙: `workspace-monitor/specs/2026-06-02-agent-history-visualization/`
- 신규 스펙: `workspace-monitor/specs/2026-06-02-agent-collaboration-board/`

## 계획

1. `status.json` agents/tasks와 agent config를 합친 협업 snapshot을 만든다.
2. Agents 탭에 work lane, agent-task-project flow, workload strip을 추가한다.
3. blocker와 next action이 UI에 드러나게 한다.
4. snapshot 타입과 collector 테스트를 갱신한다.
5. 요구사항, 히스토리, 평가를 갱신하고 build로 검증한다.

## 결정

- 지금은 정적 snapshot 기반 UI로 구현한다.
- 실시간 trace는 후속 과제로 둔다.
