# Web Search Record: Large Scope Decomposition

- Date: 2026-06-02
- Work mode: `governance`
- Related request: `UR-2026-06-02-033`
- Related requirement: `REQ-WS-073`

## Queries

- `large codebase AI coding agent chunking divide and conquer sourcegraph Cody context window best practices`
- `monorepo codebase understanding code search indexing dependency graph task decomposition best practices`
- `software engineering work breakdown structure large codebase change incremental delivery official guide`
- `LLM agents long context codebase retrieval chunking hierarchical planning paper`
- `Sourcegraph Cody context window codebase search context official docs`
- `Nx affected project graph official docs monorepo affected`
- `Bazel query language dependency graph official docs`
- `Google engineering practices small CLs official docs`

## Sources Checked

- Sourcegraph Cody Context: https://sourcegraph.com/docs/cody/core-concepts/context
- Nx Affected: https://nx.dev/ci/features/affected
- Bazel Query Guide: https://bazel.build/query/guide
- Google Engineering Practices, Small CLs: https://google.github.io/eng-practices/review/developer/small-cls.html

## Weak Sources Ignored

- Generic blog posts that only said "split large work" were not used as durable policy evidence.
- Product marketing posts for specific LLM agents were treated only as weak discovery signals because this workspace needs tool-agnostic rules.

## Plan Impact

- Sourcegraph context supports using search and relevant context assembly instead of dumping every file into a prompt.
- Nx affected and Bazel query support narrowing large codebase work through affected scope and dependency graph patterns.
- Google Small CLs supports keeping changes reviewable and small.
- Therefore the platform now adds `large-scope-decomposer-agent` before `parallel-work-planner-agent` when scope or file volume is too large.

## Uncertainty

- This repository does not yet have one dependency graph engine installed across every project. The policy starts with repository maps, `rg --files`, project registry, generated snapshots, and project-specific tools.
- Actual large refactors still need stack-specific official tool research.

## Public Decision Summary

This change does not replace the existing parallel work requirement. It adds a pre-gate that shrinks large scope first and records inventory, exclusions, sample limits, and verification plans when not every file is read.
