# Spec: Skill Lifecycle Governance

## Metadata

- Spec ID: `SPEC-WS-SKILL-001`
- Source request: `UR-2026-05-31-038`
- Requirement: `REQ-WS-014`
- Status: implemented
- Date: 2026-05-31

## Problem

The repository had a source location for skills, but the loop for deciding when to create skills, how to validate them, and how to improve them after usage was not explicit enough.

## Goal

Manage custom Codex skill creation and updates as an explicit lifecycle. Every skill work item must leave source, trigger examples, validation, forward tests, improvement ideas, and evaluation targets.

## Scope

- `_skills/` source skill management
- `create-validated-skill` skill source
- `skill-lifecycle-agent`
- `validate-skill` CLI and tests
- `skill_work_occurred`, `skill_targets`, and `skill_validation_targets` in evaluation input
- Skill lifecycle policy, prompt, workflow, and templates

## Out Of Scope

- External skill marketplace
- Revalidating every existing system skill
- Global skill installation without user-approved permission

## Acceptance Criteria

| ID | Criteria |
| --- | --- |
| AC-SKILL-001 | WHEN a skill is created or updated THEN `_skills/<skill-name>/` source and `_skills/registry.md` SHALL be updated. |
| AC-SKILL-002 | WHEN skill work closes THEN `quick_validate.py` and `validate-skill` results SHALL be recorded. |
| AC-SKILL-003 | WHEN skill work occurred THEN evaluation input SHALL include `skill_work_occurred=true`, `skill_targets`, and `skill_validation_targets`. |
| AC-SKILL-004 | WHEN friction or failure appears after real skill use THEN improvement ideas SHALL be recorded and the skill SHALL be updated/revalidated when needed. |
| AC-SKILL-005 | WHEN a skill is installed into an active Codex path THEN installation records and rollback path SHALL be recorded. |

## Success Signals

- New skill creation is discoverable from `_ops/prompts/37-manage-skill.md`.
- Skill validation is automated with `agent-platform validate-skill`.
- Close-out evaluation catches missing skill targets as blocking gaps.

