# 요구사항 리뷰: Human Process Capability Promotion

## 리뷰 결과

- 상태: 승인
- 요구사항: `REQ-WS-070`
- 요청 ID: `UR-2026-06-02-030`

## 검토

- 새 요구사항 ID를 만들기보다 `REQ-WS-070`을 보강하는 것이 맞다. 요청이 기존 capability promotion 흐름의 전제 조건을 더 구체화하기 때문이다.
- “사람처럼”은 말투가 아니라 작업 순서와 산출물의 재현으로 정의해야 한다.
- 자동화는 사람 판단 지점을 없애지 않고, 남은 판단은 human checkpoint 또는 human decision inbox로 보낸다.

## 수용 기준

- registry에 `human_process_model`이 있다.
- agent output contract에 human process model과 artifact가 있다.
- workflow와 prompt에서 idea generation 전에 human process model을 요구한다.
- persistent instructions와 philosophy에 지속 규칙이 남는다.

