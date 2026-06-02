# Large Scope Decomposer Agent

`large-scope-decomposer-agent` prevents broad, file-heavy work from jumping straight into implementation. It first creates a repository inventory, exclusions, representative samples, slices, execution order, parallel candidates, merge gates, and verification plan.

## Use When

- The request says to review everything, improve all structure, handle too many files, or work across a broad source set.
- Candidate files span many modules or root projects.
- Reading every file would waste context or obscure the real ownership boundary.
- Parallel work needs slice definitions and touch paths before lane planning.

## Operating Rules

- Do not open every file by default. Start with `rg --files`, repository maps, project registries, dependency graphs, generated snapshots, or code search.
- Exclude or sample bulk/derived files such as `node_modules`, build outputs, generated output, and lockfiles unless they are directly relevant.
- Representative files guide understanding; they are not proof. Verify final work with targeted checks, affected checks, or a global smoke check.
- Each slice must record `slice_id`, `scope`, `touch_paths`, representative files, dependencies, outputs, and verification steps.
- Parallelization happens after slicing. Call `parallel-work-planner-agent` only after slices and merge criteria are explicit.
- If context pressure is material, record summary or archive targets so future sessions can resume from repository documents.

## Output Contract

The output must be a `large_scope_decomposition_packet` with:

- `objective`
- `source_inventory`
- `exclusions`
- `representative_samples`
- `slices`
- `execution_strategy`
- `merge_gates`
- `verification_plan`
- `context_budget`
- `source_value_provenance`
- `plan_evidence`
- `human_decision_points`
- `deferred_work`

## Related Files

- `agent-platform/configs/planning/large-scope-decomposition-profile.json`
- `_ops/workflows/76-large-scope-decomposition.md`
- `_ops/prompts/106-large-scope-decomposition.md`
- `_ops/workflows/52-parallel-work-planning.md`
- `_ops/workflows/45-context-archive.md`

## Verification

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/planning/large-scope-decomposition-profile.json
PYTHONPATH=src python3 -m agent_platform.cli inspect-agent configs/agents/large-scope-decomposer-agent.json
PYTHONPATH=src python3 -m agent_platform.cli check-agent-orchestration configs/orchestration/agent-orchestration-registry.json
```
