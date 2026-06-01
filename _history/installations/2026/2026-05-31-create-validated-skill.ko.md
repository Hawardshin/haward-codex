# 2026-05-31 설치 기록: create-validated-skill

## 상태

- 상태: installed
- 설치 대상: `create-validated-skill`
- 소유 프로젝트/도구: workspace custom skill
- 설치 범위: skill
- 환경 경로: `/Users/shinjoungeun/.codex/skills/create-validated-skill`

## 설치 이유

- 스킬 생성/검증/개선 lifecycle을 다음 Codex 세션에서도 실제 스킬로 발견할 수 있게 하기 위해 설치했다.
- 원본은 `_skills/create-validated-skill/`에 두고 git으로 추적한다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| `skill-creator` 시스템 스킬 | 2026-05-31 | 스킬 구조, frontmatter, 검증 기준 |
| `_docs/policies/skill-lifecycle-policy.ko.md` | 2026-05-31 | 설치 전 원본/검증/rollback 규칙 |

## 설치 계획

- 정확한 설치 명령: `cp -R _skills/create-validated-skill /Users/shinjoungeun/.codex/skills/`
- dependency 기록 파일: 해당 없음
- lock/SBOM 상태: 해당 없음
- 예상 변경 파일: `/Users/shinjoungeun/.codex/skills/create-validated-skill/`
- 권한 승인 필요 여부: workspace 외부 경로 쓰기 권한 필요

## 보안/라이선스 검토

- 보안 검토: 외부 패키지 설치 없음. 저장소 원본 스킬 파일만 복사.
- 라이선스 검토: 내부 개인 workspace 산출물. 외부 코드 포함 없음.
- 유지보수/커뮤니티 신호: 내부 운영 스킬이므로 `_skills/registry.md`와 평가 보고서로 유지.
- 알려진 위험: 설치된 사본이 원본과 drift될 수 있음. 원본을 source of truth로 두고 업데이트 시 재복사한다.

## 설치 후 실제 결과

- 실행한 명령: `cp -R _skills/create-validated-skill /Users/shinjoungeun/.codex/skills/`
- 설치된 버전: `bb30d5a`의 `_skills/create-validated-skill/`
- 변경된 파일: `/Users/shinjoungeun/.codex/skills/create-validated-skill/`
- 생성/갱신된 lock 파일: 없음
- 검증 명령과 결과:
  - `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/create-validated-skill`: `Skill is valid!`
  - `PYTHONPATH=src python3 -m agent_platform.cli validate-skill /private/tmp/create-validated-skill-validation.json`: `skill_ready`

## Rollback

- 제거 명령: `rm -rf /Users/shinjoungeun/.codex/skills/create-validated-skill`
- 되돌릴 파일: 설치 경로의 복사본만 제거. 저장소 원본은 유지.
- 복구 검증: `test ! -e /Users/shinjoungeun/.codex/skills/create-validated-skill`

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-skill-lifecycle.ko.md`
- 커밋: `bb30d5a`
