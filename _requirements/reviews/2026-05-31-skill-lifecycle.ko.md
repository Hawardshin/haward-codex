# 요구사항 검토: 스킬 생명주기

## 검토 대상

- `REQ-WS-014`

## 검토 결과

- 상태: reviewed
- 결론: 요구사항은 공통 workspace/platform 범위에 속한다.

## 충돌/중복

- `REQ-WS-006`의 히스토리, `REQ-WS-007`의 평가, `REQ-WS-013`의 스펙 구조와 연결된다.
- 기존 capability governance는 스킬 생성 조건만 정의했고 검증/개선 loop가 약했으므로 별도 요구사항이 필요하다.

## 검증 가능성

- `_skills/<skill-name>/SKILL.md` 존재
- `quick_validate.py` 결과
- `validate-skill` 결과
- `skill_targets`와 `skill_validation_targets` 평가 입력

## 결정

- 기준선에 반영한다.

