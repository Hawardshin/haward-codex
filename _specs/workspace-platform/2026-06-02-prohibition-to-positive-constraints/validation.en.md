# Prohibition-To-Positive Constraint Validation

## Validation Plan

- Check changed JSON files with `python3 -m json.tool`.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/governance/philosophy-traceability.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-philosophy-trace configs/governance/philosophy-traceability.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --json`
- `check-omissions`, `check-grounding`, `evaluate-work`

## Current Status

- Completed.

## Validation Results

| Check | Result |
| --- | --- |
| Changed JSON `json.tool` checks | Passed |
| `check-config-contract` for usage/profile/traceability/memory | `self_documenting` |
| `check-philosophy-trace` | `ready` |
| `check-memory-bootstrap` | `ready_to_bootstrap` |
| `workspace-index` regenerate/check | Passed |
| `task-board` regenerate/check | Passed |
| `docs-audit --check` | `docs_ready` |
| `work_timer check` | `ready`, with unmeasured phase-duration warnings |
| `check-omissions` | `coverage_ready` |
| `check-grounding` | `ready_to_publish` |
| `workspace-health --json` | `passed`, 25 checks, 0 failed |
| `evaluate-work` | `ready_to_close` |
| `git diff --check` | clean |

## Interpretation

- The rule for turning prohibition-heavy instructions into positive behavior contracts is reflected in requirements, config, philosophy, traceability, persistent instructions, memory bootstrap, workflow, prompt, and history.
- A new prompt linter is outside this change. It is recorded as an evaluation improvement candidate.
