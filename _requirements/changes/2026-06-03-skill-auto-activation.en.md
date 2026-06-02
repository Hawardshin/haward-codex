# Requirements Change: Skill Auto-Activation Checks

## Request

- The user reported that custom skills did not appear to auto-apply reliably.

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-SKILL-ACT-001 | Track repository skill source separately from the installed Codex copy. | must | `skill-activation-registry.json` records `source_path` and `installed_path`. |
| REQ-SKILL-ACT-002 | Skills expected to auto-apply must fail checks when the installed copy is missing or drifted from source. | must | `check-skill-activation` reports missing installs and drift with `requires_rework=true`. |
| REQ-SKILL-ACT-003 | Skill descriptions must make the activation scope clear. | must | The checker validates `Use when`/`Use for`, description length, and trigger examples. |
| REQ-SKILL-ACT-004 | Skill installation or sync must leave an installation audit record and rollback path. | must | `_ops/installations/registry.json` and `_history/installations/2026/` contain the record. |
| REQ-SKILL-ACT-005 | Skill updates must keep validation input, forward-test scenarios, and improvement ideas. | must | `validate-skill` returns `skill_ready` for both skills. |

## Scope

- Included: `agent-platform` CLI checker, activation registry, `_skills` descriptions/status, Codex skill install sync, validation/history records.
- Excluded: Codex internal auto-selection algorithm changes, system skill changes, plugin installation.
