# 요구사항 변경: 스킬 생명주기 명시화

## 변경 요약

- `REQ-WS-014`를 추가했다.
- 커스텀 스킬 생성/수정은 원본, trigger 예시, 검증, 전진 테스트, 개선 backlog, 평가 target을 남겨야 한다.

## 출처 요청

- `UR-2026-05-31-038`: 스킬 생성이 명시적이지 않고, 만든 스킬도 계속 검증하고 개선점을 찾도록 요청.

## 영향

- `_skills/` 원본 관리
- `skill-lifecycle-agent`
- `validate-skill` CLI
- `work-evaluator-agent`의 skill target 확인
- 스킬 생성/수정 작업의 close-out 절차

## 검증

- `validate-skill` 테스트와 실제 `create-validated-skill` 검증으로 확인한다.

