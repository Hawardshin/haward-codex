# Desktop Product Folder Restructure Plan

## Slices

| Slice | Work | Primary Paths | Verification |
| --- | --- | --- | --- |
| S1 | Move renderer source | `platform-desktop-app/renderer/workspace-monitor/` | `git diff --name-status`, structure audit |
| S2 | Reconnect runtime/build paths | `pnpm-workspace.yaml`, `platform-desktop-app/src-tauri/tauri.conf.json`, scripts | `pnpm install --lockfile-only`, app checks |
| S3 | Update operational boundaries | `_ops/projects/`, `_docs/`, product docs/configs | docs audit, config contract |
| S4 | Validate snapshot/build | renderer collector/build/test/perf | customer build, monitor tests, perf budget |
| S5 | Record trace/evaluation | specs, history, web search, evaluation | omission/evaluation files |

## Parallelization

- Build, test, and audit commands may run in parallel once they do not write shared files.
- Git state, generated maps, and customer snapshot generation stay serialized.
