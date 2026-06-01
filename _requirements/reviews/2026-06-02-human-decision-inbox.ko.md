# Human Decision Inbox 요구사항 검토

## 검토 대상

- 요구사항: `REQ-WS-048`
- 변경 기록: `_requirements/changes/2026-06-02-human-decision-inbox.ko.md`

## 검토 결과

채택한다.

## 판단

사용자 요청은 `REQ-WS-047`의 다음 단계다. 단순히 “답변 대기 중에도 다른 일을 한다”는 규칙만 있으면, 실제 질문과 재개 조건이 채팅 안에 흩어져 나중에 찾기 어렵다. 따라서 사람에게 필요한 결정을 중앙 인박스에 모으고, 답변 후 어떤 작업을 언제 다시 진행할지 명시하는 상태 기계가 필요하다.

이 요구사항은 다음 경계를 둔다.

- 질문은 채팅에만 남기지 않고 inbox record로 남긴다.
- 답변 없이는 못 하는 일과 지금 할 수 있는 일을 분리한다.
- 사람이 돌아와 답변하면 현재 작업을 먼저 checkpoint한다.
- 즉시 interrupt할지, 다음 안전 지점까지 기다릴지는 우선순위와 위험도로 정한다.
- 재개 후 inbox 상태와 `decision_history`를 갱신한다.

## 검증 기준

- 요구사항 기준선에 `REQ-WS-048`이 있어야 한다.
- 중앙 inbox JSON, workflow, prompt가 존재해야 한다.
- AI usage gap profile과 persistent instructions가 inbox 및 interrupt/resume 규칙을 참조해야 한다.
- notification config에 human decision 관련 이벤트가 있어야 한다.
- evaluation이 초기 요청과 결과의 차이를 확인해야 한다.
