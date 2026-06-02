# Spec: Skill Auto-Activation Checks

## Goal

Detect and fix the gap where a custom skill exists in repository source but is not available as an auto-activation candidate in the Codex runtime.

## Design

- `agent-platform/configs/skills/skill-activation-registry.json`
  - Records source path, installed path, trigger examples, negative examples, and sync files for repository-managed skills.
  - Uses `auto_activation_expected=true` for skills that should be active in Codex.
- `agent-platform/src/agent_platform/evaluation/skill_activation.py`
  - Checks source `SKILL.md`, frontmatter name/description, trigger examples, installed copy, and sync file hashes.
- CLI
  - `check-skill-activation <registry.json>` prints both config contract and activation reports.
- Skill source
  - `create-validated-skill` now covers skill trigger and auto-activation problems.
  - `presentation-reference-curator` now makes presentation references, licensing, and conversion triggers explicit.
- Installation
  - Install `presentation-reference-curator` into `$CODEX_HOME/skills`.
  - Sync the installed `create-validated-skill` copy with source.

## Acceptance Criteria

- `check-skill-activation` returns `ready`.
- Both skills pass `quick_validate.py` and `validate-skill`.
- `unittest` covers ready, missing install, and drift cases for the activation checker.
- Installation audit and rollback records exist.
