# Traceability: Spec-Driven Operating Loop

| Layer | ID/Path | Description |
| --- | --- | --- |
| User request | `UR-2026-05-31-037` | Requested a structure similar to spec-driven development |
| Requirement | `REQ-WS-013` | Meaningful work should pass through spec artifacts before implementation/evaluation |
| Spec | `SPEC-WS-SDD-001` | Spec-driven operating loop |
| Acceptance Criteria | `AC-SDD-001` - `AC-SDD-005` | Spec artifacts, evaluation target, project boundary |
| Tasks | `T001` - `T011` | Policy, templates, agent, evaluation, history, verification |
| Key files | `_specs/`, `_docs/spec-driven-development-policy.en.md`, `_ops/workflows/36-spec-driven-development.md` | Operating structure |
| Evaluation | `_history/evaluations/2026/2026-05-31-spec-driven-development.en.md` | Close-out evaluation |
| Commit | this change-set commit | Update after push |

## Coverage

- `AC-SDD-001`: `_ops/workflows/00-start-here.md`, `_ops/workflows/36-spec-driven-development.md`
- `AC-SDD-002`: `_specs/README.en.md`, `_templates/spec-driven/`
- `AC-SDD-003`: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `AC-SDD-004`: `_requirements/changes/2026-05-31-spec-driven-development.en.md`
- `AC-SDD-005`: `README.md`, `AGENTS.md`, `_docs/workspace-rules.md`
