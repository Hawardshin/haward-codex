# Plan: Work Mode Enforcement

## Selected Mode

- `governance`
- Reason: this changes durable platform behavior across work mode policy, evaluator behavior, memory anchors, and repository rules.
- Mode selection record: this file
- Enforcement checks: `check-work-modes`, `evaluate-work`, tests, config contract, and memory bootstrap

## Evidence

- OPA and policy-as-code documentation support separating policy from execution and evaluating it at enforcement points.
- JSON Schema is a standard approach for machine-checking structural contracts.
- AI guardrail documentation supports backing prompt guidance with boundary/runtime checks.
- The existing repository had evaluator policy, but mode selection records and registry/evaluator drift checks were not enforced by a dedicated CLI.

## Steps

1. Add enforcement layers and mode-level required fields to the work mode registry.
2. Add the Python work mode checker and CLI commands.
3. Add `mode_selection_record_targets` to evaluator inputs and target policy.
4. Reflect the rule in docs, policy, requirements, workflows, and memory bootstrap.
5. Run tests, config checks, evaluator checks, and history/evaluation close-out.
