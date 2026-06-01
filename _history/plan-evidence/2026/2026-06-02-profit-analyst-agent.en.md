# Plan Evidence: Profit Analyst Agent

## Request Interpretation

The user asked for a money/profit-side expert. This was interpreted as a reusable domain agent that evaluates projects, features, products, and decisions through a financial-benefit lens.

## Decision

- agent name: `profit-analyst-agent`
- boundary: shared `agent-platform` agent
- work mode: `governance`
- output: profit decision brief

## Evidence-Based Design

- OMB A-94 -> cost-benefit, NPV, present value, uncertainty
- SBA break-even -> fixed/variable cost, contribution margin, break-even
- HBS value-based strategy -> customer value and value capture
- SaaS performance guide -> CAC, LTV, churn, gross margin, payback
- ICAEW/FCA -> financial model review, scenario/sensitivity, model credibility

## Alternatives

- `money-expert-agent`: close to the user's wording but too informal and broad.
- `financial-advisor-agent`: rejected because it could be confused with personal investment, tax, or regulated financial advice.
- `profit-analyst-agent`: selected because it covers profitability, cost-benefit, unit economics, and pricing while staying distinct from regulated advice.

## Expected Verification

- The agent spec should pass `inspect-agent`.
- The agent should appear in `list-agents`.
- The orchestration registry check should remain green.
- Docs, requirements, specs, history, and evaluation should be connected.
