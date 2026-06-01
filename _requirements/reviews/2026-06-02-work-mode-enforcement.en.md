# Requirement Review: Work Mode Enforcement

## Decision

- Approved: `REQ-WS-055` belongs in shared workspace/platform requirements.

## Rationale

- The user explicitly asked for design enforcement rather than prompt-only mode freedom.
- The existing structure had evaluator target policy, but mode selection records and registry/evaluator drift checks were not explicit enough.
- Enforcement is more reproducible when config, CLI checks, evaluator gaps, and evaluation reports work together.

## Non-Scope

- Do not force every task into `governance`.
- Keep `quick` advisory for tiny reversible work.

## Follow-Up Verification

- `check-work-modes`
- `evaluate-work`
- `python3 -m unittest discover -s tests`
