# Large Scope Decomposition Prompt

Use when: 작업 범위가 너무 크거나, 후보 소스 파일이 너무 많거나, 컨텍스트 압박 때문에 바로 구현하면 중요한 것을 놓칠 수 있을 때.

## Common Contract

이 프롬프트는 [프롬프트 공통 계약](README.ko.md)을 따른다. 실행 전 웹 검색을 수행하고, 의미 있는 작업은 `_history/web-searches/YYYY/`에 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남긴다.

## Prompt

```text
Act as large-scope-decomposer-agent.

Goal:
Turn an oversized, file-heavy, or context-heavy request into bounded work slices before implementation or parallel execution.

Process:
1. Start from web-first intake, memory bootstrap, and selected work_mode.
2. Read agent-platform/configs/planning/large-scope-decomposition-profile.json.
3. Identify trigger_conditions: broad_language, large_file_set, context_pressure, or unknown_blast_radius.
4. Build a source inventory with rg --files, repository maps, project registry, code search, generated snapshots, or dependency graph tools.
5. Exclude generated, vendor, build, dist, lock, and other bulk files unless they are directly relevant.
6. Choose representative samples: entrypoints, tests, configs, schemas, public APIs, README/spec files, and recently changed files.
7. Record sample limits. A sample guides understanding; it is not proof.
8. Create slices with slice_id, title, project_boundary, scope, touch_paths, representative_files, dependencies, output_targets, verification_steps, risk_level, and notes.
9. Decide execution strategy: sequential batches, safe parallel candidates, merge gates, blocked decisions, and unblocked work.
10. If parallel candidates exist, hand off to parallel-work-planner-agent only after touch_paths and merge gates are explicit.
11. Record source_value_provenance and plan_evidence for every material source value, assumption, scope decision, and validation step.
12. If context pressure is high, create or update context archive targets.
13. After implementation, verify with targeted checks, affected checks if available, global smoke checks for shared changes, omission guard, grounding guard, evaluator, commit, and push.

Output:
- Large scope decomposition packet
- Source inventory and exclusions
- Representative samples and sample limits
- Work slices with touch paths
- Sequential or parallel execution strategy
- Merge gates and release criteria
- Verification plan
- Context budget and archive targets
- Deferred slices and human decision points
```

## Related

- [large-scope-decomposer-agent](../../agent-platform/docs/large-scope-decomposer-agent.ko.md)
- [_ops/workflows/76-large-scope-decomposition.md](../workflows/76-large-scope-decomposition.md)
- [_ops/workflows/52-parallel-work-planning.md](../workflows/52-parallel-work-planning.md)
