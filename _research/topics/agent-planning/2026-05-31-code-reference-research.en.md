# Code Reference Research

## Purpose

Record the rationale for requiring source-code-writing agents to inspect relevant open-source structure, reference implementations, well-written code, and tests before implementation.

## Access Date

- 2026-05-31

## Sources Checked

| Source | Type | Key Point | Application |
| --- | --- | --- | --- |
| Public Code Repository Best Practices: https://ospo.library.jhu.edu/learn-grow/public-code-repository-best-practices/ | Official/institutional doc | Public code repositories should carry quality signals such as license, README, contribution docs, versions, and identifiers. | Check repository quality and maintenance signals before treating code as a reference. |
| CodeHow, Microsoft Research: https://www.microsoft.com/en-us/research/publication/codehow-effective-code-search-based-on-api-understanding-and-extended-boolean-model/ | Paper/research | Combines API understanding and code search to find relevant implementation examples. | Make code search and repository search explicit coding research channels. |
| AWS Architecture Blog, ADR best practices: https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/ | Technical blog/official engineering | Describes recording architecture decisions and related design context before implementation. | Record what to adapt or reject from code references in `code_reference_notes`. |
| Architecture Decision Record examples: https://github.com/architecture-decision-record/architecture-decision-record | Open-source/documentation example | Maintains architecture decision records and examples in a repository. | Keep code structure choices tied to documented rationale. |

## Insights

- A coding agent needs real implementation structure, tests, error handling, and module boundaries, not only API docs.
- Open-source repositories are references for structure and trade-offs, not material to copy blindly.
- If referenced code is not recorded, future review cannot trace the implementation intent or quality standard.
- Requiring `code_reference_sources` and `code_reference_notes` makes pre-implementation research testable.

## Applied Result

- Added `code_reference_sources` and `code_reference_notes` to `coding-research-agent` input.
- Strengthened `complete-coding-research` to require code/repository/search channels and concrete code references.
- Added the `reference_implementation` source type.
- Added code-reference rules and reference links to `coding-research-profile.json`.
