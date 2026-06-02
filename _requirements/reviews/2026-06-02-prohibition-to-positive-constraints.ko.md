# 금지형 지시 변환 요구사항 검토

## 검토 결과

- 상태: 승인
- 요구사항: `REQ-WS-078`
- 작업 모드: `governance`

## 검토 메모

- “AI는 금지를 이해하지 못한다”는 사용자 표현은 운영상 강한 경고로 반영한다.
- 문서에는 절대적 사실 주장으로만 두지 않고, 근거에 맞게 “금지형 지시는 취약하므로 긍정형 행동 계약과 검증 게이트로 변환한다”로 정리했다.
- 금지 자체를 삭제하지 않는다. 긍정형 목표가 먼저이고, 금지는 경계 메모로 둔다.

## 수용 기준

- `ai-usage-gap-profile`에 금지형 지시 변환 계약이 있다.
- 철학 원칙과 traceability mapping이 있다.
- workflow/prompt가 다음 실행에서 해당 원칙을 사용할 수 있다.
- config contract, philosophy trace, memory bootstrap, docs audit를 통과한다.
