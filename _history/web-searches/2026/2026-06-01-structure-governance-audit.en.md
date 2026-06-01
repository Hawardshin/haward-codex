# Web Search Record: Structure Governance Audit

## Request Summary

- Improve contradictions or management friction in the current repository structure, including folder structure and operating rules when useful.

## Queries

- `monorepo folder structure best practices workspace tools docs projects boundaries`
- `docs as code repository structure documentation architecture decision records best practices`
- `GitLab Code Owners repository ownership path ownership docs`
- `Software Engineering at Google monorepo version control`

## Sources Checked

| Source | Type | Checked | Why Used |
| --- | --- | --- | --- |
| Software Engineering at Google, Version Control and Branch Management, `https://abseil.io/resources/swe-book/html/ch16.html` | book | 2026-06-01 | Background for monorepo tooling and ownership needs |
| GitLab Docs, Code Owners, `https://docs.gitlab.com/user/project/codeowners/` | official | 2026-06-01 | Reference for making path ownership and responsibility visible in the repository |
| GitLab Docs, Documentation Site Architecture, `https://docs.gitlab.com/development/documentation/site_architecture/` | official | 2026-06-01 | Reference for separating documentation source from generated documentation or site output |
| GitLab Handbook, Component Ownership Model, `https://handbook.gitlab.com/handbook/engineering/infrastructure-platforms/production/component-ownership-model/` | web source | 2026-06-01 | Reference for component ownership, clear boundaries, and continuous validation |
| Thoughtworks Technology Radar, `https://www.thoughtworks.com/en-us/radar` | web source | 2026-06-01 | Reference for periodically evaluating tools and practices through clear adoption categories |

## Weak Sources Ignored

- Reddit discussions can provide practitioner signals about monorepo ownership and boundaries, but this policy used official docs, a book, and an engineering handbook as primary evidence.
- General monorepo blog posts were treated only as secondary signals because they were less directly tied to this repository's existing policy.

## Plan Impact

- Avoid a large folder move; improve ownership and boundary clarity with deterministic checks.
- Split root folder classes into `registered_project`, `reserved_operational`, `local_only`, and `generated_output`.
- Mark `_private/` and `outputs/` as local-only and protect them through `.gitignore`.
- Separate generated output from durable artifacts.
- Make workspace monitor expose structure-rule documents.

## Uncertainty

- CODEOWNERS is not needed at the current scale, but it can be considered if project count or external collaboration grows.
- Root project migration should require a separate migration plan.

## Public Decision Summary

- The right improvement is not a broad folder move. The repository needs explicit root folder classes, local-only exceptions, generated artifact rules, and a deterministic structure audit.
