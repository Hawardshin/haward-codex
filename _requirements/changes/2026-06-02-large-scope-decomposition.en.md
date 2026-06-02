# Requirement Change: Large Scope Decomposition

## Change ID

- `REQ-CHANGE-2026-06-02-033`

## Change Summary

The user asked for a smarter way to handle cases where the scope is too large or there are too many source files. This is added as shared requirement `REQ-WS-073`.

## Added Requirement

- `REQ-WS-073`: Broad, file-heavy, multi-project, or context-heavy work must be decomposed before implementation or parallelization through source inventory, exclusions, representative samples, slices, `touch_paths`, merge gates, and verification planning.

## Evidence

- User request: `UR-2026-06-02-033`
- External references: Sourcegraph Cody context, Nx affected, Bazel query, and Google Engineering Practices small CLs.
- Internal reference: the existing `parallel-work-planner-agent` covers safe lanes, but the platform lacked a separate gate for shrinking oversized scope before lane planning.

## Impact

- `agent-platform/configs/planning/large-scope-decomposition-profile.json`
- `agent-platform/configs/agents/large-scope-decomposer-agent.json`
- `_docs/policies/large-scope-decomposition-policy.en.md`
- `_ops/workflows/76-large-scope-decomposition.md`
- `_ops/prompts/106-large-scope-decomposition.md`
- `AGENTS.md`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## Verification

- `check-config-contract`
- `inspect-agent`
- `check-agent-orchestration`
- `check-memory-bootstrap`
- `docs-audit`
- `naming-audit`
- `check-omissions`
- `check-grounding`
- `evaluate-work`
