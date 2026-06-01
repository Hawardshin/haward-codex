# Traceability: Skill Lifecycle Governance

| Layer | ID/Path | Description |
| --- | --- | --- |
| User request | `UR-2026-05-31-038` | Make skill creation, validation, and improvement explicit |
| Requirement | `REQ-WS-014` | Skill source, validation, forward tests, improvement backlog, evaluation targets |
| Spec | `SPEC-WS-SKILL-001` | Skill lifecycle governance |
| Acceptance Criteria | `AC-SKILL-001` - `AC-SKILL-005` | Skill source, validation, evaluation, improvement, installation records |
| Tasks | `T001` - `T010` | Policy, skill, CLI, evaluation, history, verification |
| Key files | `_skills/`, `_docs/policies/skill-lifecycle-policy.en.md`, `_ops/workflows/37-skill-lifecycle.md` | Operating structure |
| Evaluation | `_history/evaluations/2026/2026-05-31-skill-lifecycle.en.md` | Close-out evaluation |
| Commit | `bb30d5a` | Implementation change commit |

## Coverage

- `AC-SKILL-001`: `_skills/registry.md`, `_skills/create-validated-skill/SKILL.md`
- `AC-SKILL-002`: `agent-platform/src/agent_platform/evaluation/skill_validator.py`
- `AC-SKILL-003`: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `AC-SKILL-004`: `_docs/policies/skill-lifecycle-policy.en.md`, `_ops/workflows/37-skill-lifecycle.md`
- `AC-SKILL-005`: `_ops/installations/registry.json`, `_history/installations/`
