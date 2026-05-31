# 스펙: 스킬 생명주기 거버넌스

## 메타데이터

- 스펙 ID: `SPEC-WS-SKILL-001`
- 출처 요청: `UR-2026-05-31-038`
- 요구사항: `REQ-WS-014`
- 상태: implemented
- 날짜: 2026-05-31

## 문제

스킬 원본 위치는 있었지만, 스킬을 언제 만들고 어떻게 검증하며 사용 후 어떻게 개선할지 닫힌 루프가 부족했다.

## 목표

커스텀 Codex 스킬 생성/수정을 명시적인 lifecycle로 관리한다. 모든 스킬 작업은 원본, trigger 예시, 검증, 전진 테스트, 개선 아이디어, 평가 target을 남겨야 한다.

## 범위

- `_skills/` 원본 스킬 관리
- `create-validated-skill` 스킬 원본
- `skill-lifecycle-agent`
- `validate-skill` CLI와 테스트
- 평가 입력의 `skill_work_occurred`, `skill_targets`, `skill_validation_targets`
- 스킬 lifecycle 정책/프롬프트/워크플로/템플릿

## 제외

- 외부 스킬 마켓플레이스 구축
- 모든 기존 시스템 스킬 재검증
- 사용자 승인 없는 전역 skill 설치

## Acceptance Criteria

| ID | 기준 |
| --- | --- |
| AC-SKILL-001 | WHEN 스킬을 생성/수정한다 THEN `_skills/<skill-name>/` 원본과 `_skills/registry.md`를 갱신해야 한다. |
| AC-SKILL-002 | WHEN 스킬 작업을 닫는다 THEN `quick_validate.py`와 `validate-skill` 검증 결과를 남겨야 한다. |
| AC-SKILL-003 | WHEN 스킬 작업이 있었다 THEN 평가 입력에 `skill_work_occurred=true`, `skill_targets`, `skill_validation_targets`가 있어야 한다. |
| AC-SKILL-004 | WHEN 스킬이 실제로 쓰인 뒤 마찰이나 실패가 보인다 THEN 개선 아이디어를 남기고 필요한 경우 스킬을 수정/재검증해야 한다. |
| AC-SKILL-005 | WHEN 스킬을 Codex 활성 경로에 설치한다 THEN 설치 기록과 rollback 경로를 남겨야 한다. |

## 성공 신호

- 새 스킬 생성 과정이 `_ops/prompts/37-manage-skill.md`에서 찾을 수 있다.
- 스킬 검증은 `agent-platform validate-skill`로 자동 확인된다.
- 종료 평가가 skill target 누락을 blocking gap으로 잡는다.

