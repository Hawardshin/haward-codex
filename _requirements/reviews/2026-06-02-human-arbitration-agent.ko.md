# 요구사항 리뷰: Human Arbitration Agent

## 리뷰 결과

- 상태: accepted
- 요구사항: `REQ-WS-068`

## 확인한 점

- 기존 `human-decision-inbox`는 질문을 모으고 재개하는 저장소이므로, “둘 다 맞는 경우”의 판단 기준 자체를 설명하지 않는다.
- 기존 `principle-guardian-agent`는 원칙 위반과 충돌을 감시하지만, 최종 가치판단 권한은 사용자에게 남아야 한다.
- 따라서 `human-arbitration-agent`는 중복이 아니라 facts-checked 상태에서 남는 판단 문제를 작은 decision packet으로 만드는 역할이다.

## 승인 조건

- 사실 불확실성은 먼저 조사, grounding, knowledge skepticism으로 돌린다.
- 사실이 충분히 확인됐지만 판단이 남으면 사람에게 넘긴다.
- 전체 작업이 아니라 영향받는 branch만 멈추고 안전한 비의존 작업은 계속한다.
- 선택지, 근거, trade-off, 추천 기본값, blocked/unblocked work, resume action을 기록한다.
