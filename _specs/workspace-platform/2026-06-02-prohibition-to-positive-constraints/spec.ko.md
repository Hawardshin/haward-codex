# 금지형 지시 변환 스펙

## 목적

AI가 금지형 지시를 안정적인 행동 규칙으로 이해한다고 가정하지 않고, 금지형 지시를 긍정형 행동 계약과 검증 가능한 게이트로 바꾸는 공통 운영 구조를 만든다.

## 범위

- 철학 원칙 추가
- AI 사용 격차 profile의 금지형 지시 변환 계약 추가
- 지속 지시, workflow, reusable prompt 갱신
- 요구사항/히스토리/평가 기록 갱신

## 요구사항

- `REQ-WS-078`

## 수용 기준

- 금지형 지시는 `positive_target_behavior`, `allowed_actions`, `replacement_action`, `verification_or_enforcement`로 변환된다.
- 위험한 영역은 prompt prohibition만으로 처리하지 않고 구조적 통제를 요구한다.
- 철학 traceability가 새 원칙을 실행 대상과 검증 대상에 연결한다.
- config contract, philosophy trace, memory bootstrap, docs audit가 통과한다.
