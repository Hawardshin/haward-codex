# 2026-05-31 Work Mode Routing Web Search Record

## Question

How should the workspace avoid running the full operating loop for every task while still allowing mode-based rigor and ship-first deferred improvement work?

## Queries

- `risk based software development process lightweight governance agile compliance mode workflow`
- `progressive delivery progressive assurance software development governance risk based review process`
- `GitHub flow lightweight branching small changes documentation review process official`
- `Google engineering practices code review small changes official`
- `Atlassian technical debt agile backlog official`
- `Thoughtworks evolutionary architecture fitness functions official`

## Checked Sources

| Source | Type | Checked | Evidence Used |
| --- | --- | --- | --- |
| Google Engineering Practices - Small CLs, https://google.github.io/eng-practices/review/developer/small-cls.html | official | 2026-05-31 | Smaller changes reduce review and quality-control overhead. |
| GitHub Docs - GitHub Flow, https://docs.github.com/en/get-started/using-github/github-flow | official | 2026-05-31 | Lightweight branch workflow, isolated complete commits, and commit/push feedback. |
| Atlassian - Technical Debt, https://www.atlassian.com/agile/technical-debt | official | 2026-05-31 | Fast choices create future cost and should be tracked as managed debt. |
| Thoughtworks - Microservices as an Evolutionary Architecture, https://www.thoughtworks.com/en-us/insights/blog/microservices-evolutionary-architecture | technology article | 2026-05-31 | Continuous feedback and fitness-function framing for evolving a structure over time. |

## Weak Sources Ignored

- Reddit discussions: useful as experience signals, not standalone policy evidence.
- Wikipedia entries: useful for concept lookup, weaker than official or expert sources for repository policy.
- Marketplace/product pages: too promotional for policy grounding.

## Plan Impact

- Google and GitHub references support splitting small work into `quick` mode with lighter checks.
- Atlassian technical debt guidance supports recording intentionally postponed `ship_first` improvements in `_ops/backlog/deferred-improvements.en.md`.
- Thoughtworks' fitness-function framing supports revisiting and tuning the work-mode criteria after real usage.

## Uncertainty

The repository has little real usage data for these modes yet. `quick` and `ship_first` criteria may need adjustment after several tasks.

## Public Decision Summary

The full loop should not be removed. It should be mode-gated: `standard` stays strict by default, while `quick`, `ship_first`, and `research` make only the relevant evidence and verification fields blocking.
