# Plan: Intent Feature Map Source Structure Refactor

## Selected Work Mode

- `standard`

## Structure Options

| Option | Description | Decision |
| --- | --- | --- |
| Reorder functions inside the existing collector | Fast and low movement, but the collector keeps growing. | Rejected |
| Extract a feature-specific lib module | Keep intent-map parsing in an owned module while preserving the existing collector API. | Selected |

## Execution Order

1. Run web-first intake and memory bootstrap for refactoring criteria and hot anchors.
2. Move `intentFeatureMap` parsing and empty-state creation to `scripts/lib/intent-feature-map.mjs`.
3. Connect `collect-workspace.mjs` through import/re-export.
4. Update persistent instructions, requirements, specs, and history records.
5. Run collector, test, build, docs, and config validation.

## Risks and Controls

- API compatibility: keep `collectIntentFeatureMap` re-exported from `collect-workspace.mjs`.
- Snapshot regression: run developer/customer intent-map checks.
- Documentation structure regression: run docs audit after `_docs` changes.
