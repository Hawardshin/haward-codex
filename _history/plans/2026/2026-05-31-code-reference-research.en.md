# Plan History: Code Reference Research

## Initial Request

- "When building a source-code-writing agent, it should obviously research and reference open-source structure and well-written code."

## Plan Purpose

- Require coding agents to inspect real open-source structure, reference implementations, well-written code, and tests before implementation.
- Record which code was referenced and what was learned from it.

## Search Questions

- How should agents inspect open-source repositories and reference implementations before writing code?
- What role do code search and repository search play in coding research?
- How should referenced code structure and decision rationale be recorded?

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Public Code Repository Best Practices | https://ospo.library.jhu.edu/learn-grow/public-code-repository-best-practices/ | public repository quality signals |
| CodeHow, Microsoft Research | https://www.microsoft.com/en-us/research/publication/codehow-effective-code-search-based-on-api-understanding-and-extended-boolean-model/ | API-aware code search |
| AWS ADR best practices | https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/ | decision records before implementation |
| ADR examples repository | https://github.com/architecture-decision-record/architecture-decision-record | code-structure decision documentation examples |
| Existing coding research checker | `agent-platform/src/agent_platform/planning/coding_research.py` | existing readiness rules |

## Plan Steps

- Add `code_reference_sources` and `code_reference_notes` to `coding-research-agent` input.
- Require code/repository/source channels and code reference records in `complete-coding-research`.
- Add the `reference_implementation` source type.
- Update coding research template, docs, prompt, workflow, report template, and source collection policy.
- Add durable rules to persistent instructions and AGENTS.
- Create research notes, plan history, and evaluation reports.
- Run tests, config contract, memory bootstrap, map checks, then commit and push.

## Deferred Options

- Automatic GitHub API scoring for repository quality is deferred.
- Start with fields and readiness checks; promote to a code-reference collector tool if the work repeats.

## Verification Method

- `agent-platform` unit tests
- `complete-coding-research`
- `check-config-contract`
- `check-memory-bootstrap`
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- workspace index/task board check
- `git diff --check`
