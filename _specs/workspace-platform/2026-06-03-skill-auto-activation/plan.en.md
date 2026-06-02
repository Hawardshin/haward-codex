# Plan: Skill Auto-Activation Checks

## Work Mode

- `governance`: this changes skill lifecycle, installation state, validators, and operating records.

## Slices

| Slice | Work | touch paths |
| --- | --- | --- |
| SKA-001 | Web search and local installed skill diagnosis | `_history/web-searches/`, `/Users/shinjoungeun/.codex/skills/` |
| SKA-002 | Activation registry and CLI checker | `agent-platform/configs/skills/`, `agent-platform/src/agent_platform/` |
| SKA-003 | Skill descriptions and installed copy sync | `_skills/`, `/Users/shinjoungeun/.codex/skills/` |
| SKA-004 | Validation, installation, and history records | `_history/`, `_ops/installations/registry.json` |
| SKA-005 | Tests and close-out validation | `agent-platform/tests/`, `_history/evaluations/` |

## Decisions

- Codex's internal auto-selection algorithm is not changed; the repository now verifies the controllable source/install/trigger/drift state.
- Skills are installed as repository-managed source copies, not external packages.
- `_private/` is not inspected.
