# Human Decision Inbox

- 원본: `_ops/coordination/human-decision-inbox.json`
- 목적: 사람 답변, 승인, 선호 결정, `clarification_needed`, `blocked_decision`을 한 곳에 모아두고 답변이 오면 안전하게 interrupt/resume 하기 위한 운영 inbox.
- 마지막 검토: 2026-06-02

## 현재 열린 결정

- 없음

## 사용 규칙

- 질문은 채팅에 흩어두지 말고 inbox에 안정적인 ID로 등록한다.
- 각 항목은 질문, 선택지, 답변 형식, 영향, 막힌 작업, 계속 가능한 작업, `resume_action`을 포함한다.
- 답변이 오면 현재 작업을 먼저 checkpoint하고, 우선순위와 위험도에 따라 즉시 interrupt 하거나 다음 안전 지점에 resume을 예약한다.
- resume 후 상태를 `resumed`, `deferred`, `superseded`, `cancelled` 중 하나로 갱신한다.

## 답변 형식 예시

```text
HDI-2026-06-02-001=A
reason=프로젝트 범위를 먼저 고정하고 싶음
resume=immediate
```
