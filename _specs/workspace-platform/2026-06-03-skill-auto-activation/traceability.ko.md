# 추적성: 스킬 자동 적용 점검

| Requirement | 구현/산출물 | 검증 |
| --- | --- | --- |
| REQ-SKILL-ACT-001 | `agent-platform/configs/skills/skill-activation-registry.json` | `check-config-contract`, `check-skill-activation` |
| REQ-SKILL-ACT-002 | `skill_activation.py`, `check-skill-activation` | `tests/test_skill_activation.py` |
| REQ-SKILL-ACT-003 | `_skills/create-validated-skill/SKILL.md`, `_skills/presentation-reference-curator/SKILL.md` | `quick_validate.py`, `validate-skill` |
| REQ-SKILL-ACT-004 | `_history/installations/2026/2026-06-03-skill-activation-sync.ko.md`, `_ops/installations/registry.json` | `check-config-contract` |
| REQ-SKILL-ACT-005 | `_history/skill-validations/2026/2026-06-03-*.json` | `validate-skill` |
