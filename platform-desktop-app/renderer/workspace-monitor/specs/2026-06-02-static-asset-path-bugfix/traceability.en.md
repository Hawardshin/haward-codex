# Traceability: Workspace Monitor Static Asset Path Bugfix

## Request

- `UR-2026-06-02-053`: Find bugs and functional issues, then fix them.

## Requirement

- `REQ-WM-017`

## Source Changes

- `workspace-monitor/next.config.mjs`
- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/scripts/check-performance-budget.mjs`

## Validation

- `workspace-monitor/specs/2026-06-02-static-asset-path-bugfix/validation.en.md`
- `_history/evaluations/2026/2026-06-02-workspace-monitor-static-asset-path-bugfix-evaluation-result.json`

## External Grounding

- Official Next.js static export and `assetPrefix` documentation
- Official MDN `window.fetch()` URL parameter documentation
- Official Tauri asset protocol documentation
