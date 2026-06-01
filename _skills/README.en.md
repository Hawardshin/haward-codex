# Custom Skill Source

This folder stores git-tracked source for custom Codex skills.

## Rules

- Keep skill source under `_skills/<skill-name>/`.
- `SKILL.md` is required and includes `name` and `description` frontmatter.
- Follow `skill-creator` guidance and `_docs/policies/skill-lifecycle-policy.en.md` when creating or updating a skill.
- Validate skill work with `validate-skill`, and record forward-test scenarios plus improvement ideas.
- If active Codex installation is needed, copy the skill to `$CODEX_HOME/skills` or `~/.codex/skills` and record the installation.

## Current Skills

| Skill | Purpose | Status |
| --- | --- | --- |
| `create-validated-skill` | Turns repeated workflows into validated custom Codex skills | source ready |

