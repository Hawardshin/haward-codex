# 요구사항 변경: Human Arbitration Agent

## 변경

`REQ-WS-068`을 추가한다.

여러 옵션, 근거, 원칙, 에이전트 결과가 모두 방어 가능하고 남은 선택이 가치판단이나 책임 있는 human judgment에 달려 있으면, 플랫폼은 AI가 임의로 결론을 확정하지 않고 `human-arbitration-agent`로 중재 패킷을 만들어야 한다.

## 이유

사용자는 “도저히 둘 다 맞는 말을 하는 경우에는 사람이 판단하는 구조”가 필요하다고 했다. 기존 `human-decision-inbox`는 답변 대기와 재개 원장이고, `principle-guardian-agent`는 원칙 준수 감시다. 이번 요구는 사실 확인 후에도 남는 판단권을 사람에게 돌려주는 별도 구조가 필요하다는 뜻이다.

## 수용 기준

- 에이전트 설정과 문서가 존재한다.
- 요구사항 기준선과 영속 지시에 인간 중재 규칙이 남는다.
- 사실 불확실성과 가치판단 충돌을 분리한다.
- `_ops/coordination/human-decision-inbox.json`로 decision packet을 연결한다.
- 검증과 평가가 통과한다.
