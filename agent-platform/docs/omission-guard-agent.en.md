# Omission Guard Agent

## Purpose

`omission-guard-agent` checks whether required work items were missed before close-out. It lists the user's instructions, requirements, plan items, required artifacts, and acceptance checks, then records whether each item is `covered`, `deferred`, `not_applicable`, or `missing` with evidence.

This is a close-out gate, not just a memory aid. Non-`quick` work must include `omission_check_targets` in the evaluation input.

## Input

Use `agent-platform/configs/evaluation/omission-guard-template.json` as the shape.

- `task`: work being checked
- `work_mode`: selected work mode
- `expected_items`: instructions, requirements, plan items, or acceptance criteria that must not be missed
- `artifact_checks`: files or folders that must exist
- `acceptance_checks`: tests, audits, or manual checks that define completion
- `known_omission_risks`: remaining omission risks to keep visible

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-omissions configs/evaluation/omission-guard-template.json
```

For real work, do not close out with the template itself. Save a task-specific JSON file under `_history/evaluations/YYYY/` or the owning project's history area.

## Result

- `coverage_ready`: no blocking omission gap exists.
- `rework_required`: a required item is missing, a covered item lacks evidence, or a deferred/not-applicable item lacks rationale.

`work-evaluator-agent` blocks close-out when the selected mode requires `omission_check_targets` and the target is missing.
