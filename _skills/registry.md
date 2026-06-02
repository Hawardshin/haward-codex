# Skill Registry

This file tracks custom skill source folders managed by this repository.

## Rules

- Keep each skill source under `_skills/<skill-name>/`.
- Use the `skill-creator` guidance when creating or updating skills.
- Keep `SKILL.md` concise and focused on agent behavior.
- Run `quick_validate.py` and `agent-platform validate-skill` after creating or updating a skill.
- Record trigger examples, forward-test scenarios, and improvement ideas before close-out.
- Do not add extra documentation inside an actual skill folder unless the skill instructions require it.
- If a skill is installed into `$CODEX_HOME/skills`, keep this registry updated.
- Run the activation check when a skill should auto-apply:

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-skill-activation configs/skills/skill-activation-registry.json
```

## Skills

| Skill | Source | Status | Validation |
| --- | --- | --- | --- |
| `create-validated-skill` | `_skills/create-validated-skill/` | installed and synced | `_history/skill-validations/2026/2026-06-03-create-validated-skill-activation.json` |
| `presentation-reference-curator` | `_skills/presentation-reference-curator/` | installed and synced | `_history/skill-validations/2026/2026-06-03-presentation-reference-curator-activation.json` |
