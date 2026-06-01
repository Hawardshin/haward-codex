# Traceability: 스킬 생명주기 거버넌스

| 계층 | ID/경로 | 설명 |
| --- | --- | --- |
| 사용자 요청 | `UR-2026-05-31-038` | 스킬 생성/검증/개선 구조 명시화 |
| 요구사항 | `REQ-WS-014` | 스킬 원본, 검증, 전진 테스트, 개선 backlog, 평가 target |
| 스펙 | `SPEC-WS-SKILL-001` | 스킬 생명주기 거버넌스 |
| Acceptance Criteria | `AC-SKILL-001` - `AC-SKILL-005` | 스킬 원본, 검증, 평가, 개선, 설치 기록 |
| 작업 | `T001` - `T010` | 정책, 스킬, CLI, 평가, 히스토리, 검증 |
| 주요 파일 | `_skills/`, `_docs/policies/skill-lifecycle-policy.ko.md`, `_ops/workflows/37-skill-lifecycle.md` | 운영 구조 |
| 평가 | `_history/evaluations/2026/2026-05-31-skill-lifecycle.ko.md` | 종료 평가 |
| 커밋 | `bb30d5a` | 구현 변경 커밋 |

## Coverage

- `AC-SKILL-001`: `_skills/registry.md`, `_skills/create-validated-skill/SKILL.md`
- `AC-SKILL-002`: `agent-platform/src/agent_platform/evaluation/skill_validator.py`
- `AC-SKILL-003`: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `AC-SKILL-004`: `_docs/policies/skill-lifecycle-policy.ko.md`, `_ops/workflows/37-skill-lifecycle.md`
- `AC-SKILL-005`: `_ops/installations/registry.json`, `_history/installations/`
