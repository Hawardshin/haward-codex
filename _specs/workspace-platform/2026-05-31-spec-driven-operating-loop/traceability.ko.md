# Traceability: Spec-Driven 운영 루프

| 계층 | ID/경로 | 설명 |
| --- | --- | --- |
| 사용자 요청 | `UR-2026-05-31-037` | spec-driven과 유사한 구조를 요구 |
| 요구사항 | `REQ-WS-013` | 의미 있는 작업은 스펙 산출물을 거쳐 구현/평가해야 함 |
| 스펙 | `SPEC-WS-SDD-001` | spec-driven 운영 루프 |
| Acceptance Criteria | `AC-SDD-001` - `AC-SDD-005` | 스펙 산출물, 평가 target, 프로젝트 경계 |
| 작업 | `T001` - `T011` | 정책, 템플릿, 에이전트, 평가, 히스토리, 검증 |
| 주요 파일 | `_specs/`, `_docs/spec-driven-development-policy.ko.md`, `_ops/workflows/36-spec-driven-development.md` | 운영 구조 |
| 평가 | `_history/evaluations/2026/2026-05-31-spec-driven-development.ko.md` | 종료 평가 |
| 커밋 | 이번 변경 커밋 | push 후 갱신 |

## Coverage

- `AC-SDD-001`: `_ops/workflows/00-start-here.md`, `_ops/workflows/36-spec-driven-development.md`
- `AC-SDD-002`: `_specs/README.ko.md`, `_templates/spec-driven/`
- `AC-SDD-003`: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `AC-SDD-004`: `_requirements/changes/2026-05-31-spec-driven-development.ko.md`
- `AC-SDD-005`: `README.md`, `AGENTS.md`, `_docs/workspace-rules.md`
