# skill-lifecycle-agent

## 목적

`skill-lifecycle-agent`는 커스텀 Codex 스킬을 만들거나 수정할 때 스킬 원본, 검증, 전진 테스트, 개선 backlog, 설치 기록을 명시적으로 관리한다.

## 입력

- 현재 사용자 요청 요약
- 기존 `_skills/` 원본과 `_skills/registry.md`
- 관련 요구사항과 스펙 산출물
- 웹 검색과 내부 레퍼런스
- 스킬 검증 입력 JSON

## 출력

- `_skills/<skill-name>/SKILL.md`
- 필요한 경우 `agents/openai.yaml`
- `validate-skill` 입력과 결과
- 전진 테스트 시나리오
- 개선 아이디어 또는 "즉시 개선 없음" 기록
- 작업 평가의 `skill_targets`와 `skill_validation_targets`

## 규칙

- 새 스킬은 `skill-creator` 지침을 따른다.
- 스킬 원본은 `_skills/<skill-name>/`에 둔다.
- 실제 Codex 활성 설치는 권한, 설치 위치, rollback, 설치 기록을 확인한 뒤 진행한다.
- 스킬 작업이 있었다면 종료 평가 입력에 `skill_work_occurred=true`를 넣는다.
- 검증 실패나 개선 gap은 최종 응답 전에 반영하거나 재작업 항목으로 남긴다.

