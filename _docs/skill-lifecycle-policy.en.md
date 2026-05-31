# Skill Lifecycle Policy

## Purpose

Manage custom Codex skills explicitly beyond initial creation: creation criteria, validation, forward tests, improvement backlog, installation status, and evaluation linkage.

## Principles

- Create a skill only when it reduces repeated judgment, procedure, domain rules, or tool-use patterns.
- Keep skill source under `_skills/<skill-name>/`.
- Follow `skill-creator` guidance for new skills and skill updates.
- Keep `SKILL.md` concise and clear, with frontmatter description that states when to use the skill.
- Skill work records at least two trigger examples, validation steps, forward-test scenarios, and improvement ideas.
- Active Codex installation happens only after checking `$CODEX_HOME/skills`, permissions, rollback, and installation records.
- If skill work occurred, close-out evaluation input includes `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets`.

## Required Validation

- System validation:

```bash
python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/<skill-name>
```

- Repository validation:

```bash
PYTHONPATH=src python3 -m agent_platform.cli validate-skill configs/evaluation/skill-validation-template.json
```

## Improvement Loop

1. Inspect the real usage request and result.
2. Check whether the skill triggered in the right situations.
3. Identify where the output differed from expectations.
4. Update only the needed `SKILL.md`, `references/`, `scripts/`, or `assets/` content.
5. Run validation and forward-test scenarios again.
6. Record improvements and remaining ideas in the evaluation report or work summary.

## Related Files

- [_skills/registry.md](../_skills/registry.md)
- [_skills/create-validated-skill/SKILL.md](../_skills/create-validated-skill/SKILL.md)
- [_ops/workflows/37-skill-lifecycle.md](../_ops/workflows/37-skill-lifecycle.md)
- [_ops/prompts/37-manage-skill.md](../_ops/prompts/37-manage-skill.md)
- [agent-platform/docs/skill-lifecycle-agent.en.md](../agent-platform/docs/skill-lifecycle-agent.en.md)

