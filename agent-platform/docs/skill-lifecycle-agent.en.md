# skill-lifecycle-agent

## Purpose

`skill-lifecycle-agent` manages custom Codex skill creation and updates explicitly: source files, validation, forward tests, improvement backlog, and installation records.

## Inputs

- Current user request summary
- Existing `_skills/` source and `_skills/registry.md`
- Related requirements and spec artifacts
- Web search and internal references
- Skill validation input JSON

## Outputs

- `_skills/<skill-name>/SKILL.md`
- `agents/openai.yaml` when useful
- `validate-skill` input and result
- Forward-test scenarios
- Improvement ideas or an explicit "no immediate improvement" note
- `skill_targets` and `skill_validation_targets` for work evaluation

## Rules

- Follow `skill-creator` guidance for new skills.
- Keep skill source under `_skills/<skill-name>/`.
- Install an active Codex skill only after checking permissions, install location, rollback, and installation records.
- Set `skill_work_occurred=true` in close-out evaluation input when skill work occurred.
- Resolve validation failures or improvement gaps before the final response, or record them as follow-up rework.

