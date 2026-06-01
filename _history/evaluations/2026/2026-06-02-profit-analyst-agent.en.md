# Work Evaluation: Profit Analyst Agent

## Result

- Status: `ready_to_close`
- Work mode: `governance`
- Blocking gaps: none

## Request Alignment

The user asked for a money/profit-side expert. This work added that role as `profit-analyst-agent`, a reusable domain agent.

Profit Analyst does not merely say whether something makes money. It evaluates revenue/cost drivers, ROI, NPV, payback, break-even, unit economics, pricing, opportunity cost, scenario/sensitivity, and source provenance, while separating numeric sources from assumptions.

Personal investment, lending, tax, legal, accounting, and regulated finance are routed to professional review or human checkpoints instead of final advice. The policy also prevents money upside from bypassing safety, law, privacy, user trust, or quality verification.

## Main Artifacts

- `agent-platform/configs/agents/profit-analyst-agent.json`
- `agent-platform/docs/profit-analyst-agent.ko.md`
- `agent-platform/docs/profit-analyst-agent.en.md`
- `REQ-WS-066` in `_requirements/baselines/2026-05-31-workspace-platform.en.md`
- `_specs/workspace-platform/2026-06-02-profit-analyst-agent/`
- `_research/topics/profit-analysis/2026-06-02-profit-analyst-agent.en.md`
- `_history/web-searches/2026/2026-06-02-profit-analyst-agent.en.md`
- `_history/work-timings/2026/2026-06-02-profit-analyst-agent.json`

## Verification

- `inspect-agent`: passed
- `list-agents`: includes `profit-analyst-agent`
- `check-agent-orchestration`: `ready`
- `work-timer check`: `ready`
- `agent-platform` unit tests: 150 tests OK
- `check-memory-bootstrap`: `ready_to_bootstrap`
- `check-config-contract`: `self_documenting`
- `docs-audit`: `docs_ready`
- `workspace-index`, `task-board`: updated
- `naming-audit`: `clean`
- `structure-audit`: `clean`; existing generated-output warnings in `presentation-agent` are unrelated to this work
- `workspace-health`: 18 checks passed
- `workspace-monitor`: collect/test/check/build passed
- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`

## References Checked

- OMB Circular A-94: https://www.whitehouse.gov/wp-content/uploads/2023/11/CircularA-94.pdf
- DOT OMB A-94 page: https://www.transportation.gov/regulations/omb-circular-94
- U.S. SBA break-even point guidance: https://www.sba.gov/business-guide/plan-your-business/calculate-your-startup-costs/break-even-point
- HBS value-based strategy: https://online.hbs.edu/blog/post/value-based-strategy
- HBS pricing/shared value record: https://www.hbs.edu/faculty/Pages/item.aspx?num=42546
- KPMG SaaS performance guide: https://assets.kpmg.com/content/dam/kpmg/pdf/2016/07/transforming-your-SAAS-business-a-strategic-guide-for-optimizing-business-performance.pdf
- ICAEW financial modelling code: https://www.icaew.com/-/media/corporate/files/technical/technology/excel/2019-webinars/305---1911358-financial-modelling-code.ashx
- FCA scenario analysis guide: https://www.fca.org.uk/publication/corporate/cfrf-guide-2022-scenario-analysis-banking-guide.pdf

## Improvement Candidates

- Create a reusable profit decision brief template with formulas after at least two real uses reveal stable fields.
- Consider a spreadsheet or HTML calculator artifact when a real project needs repeatable numeric modelling.
