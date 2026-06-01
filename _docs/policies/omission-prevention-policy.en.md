# Omission Prevention Policy

## Purpose

Agents can miss items when instructions are long, artifacts are numerous, or research, implementation, and evaluation are mixed. This policy treats omission as a normal operational risk and catches it with an explicit coverage check before close-out.

## Principles

- Do not rely on memory or prompts alone. Items that must not be missed should be listed in a file.
- Non-`quick` work must leave `omission_check_targets`.
- Each item is classified as `covered`, `deferred`, `not_applicable`, or `missing`.
- Required `covered` items need evidence.
- `deferred` and `not_applicable` items need rationale.
- Required `missing` items must be reworked before close-out.

## Scope

Omission checks are especially important for:

- durable rule, requirement, spec, evaluator, workflow, or settings changes
- work that combines several user instructions
- work that merges parallel lanes
- work that combines installation, deployment, validation, and history updates
- work with enough artifacts that humans need a file-based coverage view

## Procedure

1. Convert user instructions, requirements, plan items, and acceptance criteria into `expected_items`.
2. Put required files or folders into `artifact_checks`.
3. Put tests, audits, and manual reviews into `acceptance_checks`.
4. Run `check-omissions` from `agent-platform`.
5. If the result is `rework_required`, resolve the gaps and run it again.
6. Link the result JSON or report from `omission_check_targets` in the `work-evaluator-agent` input.

## Command

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/YYYY/YYYY-MM-DD-slug-omission-check.json
```

## Evidence Role

Checklists reduce missed steps in repeatable work where human memory is not enough. Requirements traceability helps find missing links between requirements, implementation, and verification. This policy turns those ideas into a platform close-out gate.
