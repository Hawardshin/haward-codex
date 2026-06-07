---
name: create-validated-skill
description: Create, update, validate, activate, and improve repository-managed Codex skills. Use when Codex must turn a repeated workflow, domain rule, tool pattern, agent behavior, or skill trigger/auto-activation problem into a tracked skill source folder with validation, forward-test scenarios, sync checks, improvement notes, and optional installation planning.
---

# Create Validated Skill

## Workflow

1. Confirm the repeated capability is better as a skill than a prompt, workflow, template, or tool.
2. Check existing `_skills/`, `_ops/prompts/`, `_ops/workflows/`, and `_tools/` before creating a new skill.
3. Create or update the skill source under `_skills/<skill-name>/`.
4. Keep `SKILL.md` concise: frontmatter plus essential workflow only.
5. Put detailed domain references in `references/`, deterministic helpers in `scripts/`, and output assets in `assets/` only when they are needed.
6. Remove unresolved placeholder text and avoid extra docs such as `README.md`, `CHANGELOG.md`, or quick-reference files inside the skill folder.
7. Run the system skill validator when available:

```bash
# For Codex
python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/<skill-name>
# For Gemini
# (Gemini-specific validation command if applicable)
```

8. Run the repository validator with a skill validation input:

```bash
PYTHONPATH=agent-platform/src python3 -m agent_platform.cli validate-skill <input.json>
```

9. Record at least two trigger examples, one validation step, one forward-test scenario, and one improvement idea or explicit "no immediate improvement found" note.
10. If the skill should be active, plan installation into the agent's home directory (e.g., `$CODEX_HOME/skills` or `.gemini/skills/`) only after checking permissions and creating an installation audit record.
11. Link skill source and validation targets from the work evaluation input when skill work occurred.

## Quality Gate

Treat the skill as incomplete until:

- `SKILL.md` has clear `name` and `description` frontmatter.
- The description says when to use the skill.
- The folder name matches the frontmatter name.
- No unresolved placeholders remain.
- Validation and forward-test scenarios are recorded.
- Improvement ideas or follow-up observations are recorded.
- `_skills/registry.md` is updated.

## Improvement Loop

After each real use of the skill, compare the user's request, the triggered workflow, produced artifacts, validation result, and friction points. Update the skill only when the change will improve future runs, then validate it again.
