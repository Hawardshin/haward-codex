# Work Mode Enforcement Research Note

## Summary

If a mode only lives in prompts, agents may follow or forget it. Enforceable operation needs:

- Source of truth: self-documenting config
- Machine check: CLI validator or schema/policy check
- Execution record: mode selection record with reason and overrides
- Close-out gate: evaluator returns missing targets as blocking gaps
- Auditability: evaluation reports and history

## Evidence

- OPA provides a policy-as-code model for delegating policy decisions to software.
- JSON Schema separates structure and validation so data can be checked against a contract.
- Akka Guardrails and Azure Prompt Shields show why prompt text should be backed by input/output or runtime boundary checks.

## Platform Application

- Added `agent-platform/src/agent_platform/work_modes.py` to validate the work mode registry.
- `check-work-modes` returns `rework_required` when registry and evaluator target policy drift.
- The evaluator blocks non-`quick` modes that omit `mode_selection_record_targets`.

## Cautions

- Installing an external guardrail or policy engine would be too much for this step.
- A Python validator is the smallest useful enforcement mechanism now.
- If policy complexity grows, revisit OPA/Rego, JSON Schema, or a project-specific policy engine.
