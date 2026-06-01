# Spec: Profit Analyst Agent

## Background

The user asked for a money/profit-side expert. This is interpreted as a need for the platform to evaluate projects and work through money, profit, ROI, cost, pricing, and opportunity-cost lenses.

## Requirements

- Add `profit-analyst-agent` as a reusable domain agent in agent-platform.
- The agent must handle revenue drivers, cost drivers, ROI, NPV, payback, break-even, unit economics, pricing, opportunity cost, and scenario/sensitivity analysis.
- Numeric values must separate user-provided values, external-source values, estimates, and assumptions.
- Personal investment, lending, tax, legal, accounting, and regulated financial advice must be treated as professional-review or human-checkpoint items, not final advice.
- Money upside must not bypass safety, law, privacy, user trust, or quality verification.
- Korean/English docs, requirements, specs, history, and evaluation files must be preserved.

## Out Of Scope

- A standalone financial-modeling runtime, spreadsheet model, tax calculator, or investment recommendation engine is out of scope for this change.
- Actual accounting, tax, legal, or investment advisory work is out of scope.

## Acceptance Criteria

- `inspect-agent` passes.
- `list-agents` includes `profit-analyst-agent`.
- The orchestration check passes.
- Related docs and evaluation records are created.
