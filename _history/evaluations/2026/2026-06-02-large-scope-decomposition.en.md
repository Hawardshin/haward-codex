# 2026-06-02 Large-Scope Decomposition Evaluation

## Result

- Status: `ready_to_close`
- Work mode: `governance`
- Rework required: no
- User request: make the platform handle oversized, file-heavy, or context-heavy work by splitting it into manageable units.

## Changes

- Added `REQ-WS-073` so broad, file-heavy, or context-heavy work must be decomposed before implementation or parallel execution.
- Added `large-scope-decomposer-agent` and `large-scope-decomposition-profile.json`.
- The new profile defines source inventory, exclusions, representative samples, task slices, touch paths, merge gates, validation plans, and context budgets.
- Connected the rule to `AGENTS.md`, persistent instructions, start workflow, parallel workflow, prompt router, and memory bootstrap.
- Recorded requirements, specs, plan, validation, traceability, web search, request trace, work summary, and timing artifacts.

## Verification

- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`
- `check-config-contract`: passed for the new profile and core shared settings
- `inspect-agent`, `list-agents`: confirmed the new agent
- `check-memory-bootstrap`: passed
- `check-agent-orchestration`: passed
- `docs-audit`, `naming-audit`: passed
- `workspace-index`, `workspace-monitor collect/build`: passed
- `work-timer check`: partial timing record accepted

## References

- Sourcegraph Cody Context: codebase context selection and search-backed understanding
- Nx Affected: affected-scope calculation
- Bazel Query Guide: dependency graph and query-based exploration
- Google Engineering Practices Small CLs: practical guidance for splitting large changes

## Remaining Improvements

- Add deterministic dependency graph collectors per project stack if large source-tree work becomes frequent.
- Generate a visual decomposition board after the first real large refactor uses this gate.
