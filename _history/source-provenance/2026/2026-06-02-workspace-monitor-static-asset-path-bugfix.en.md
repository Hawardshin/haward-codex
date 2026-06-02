# Source Provenance: Workspace Monitor Static Asset Path Bugfix

## Local Sources

- `workspace-monitor/out/index.html`: reproduced pre-fix absolute `/_next` paths and confirmed post-fix `./_next` paths
- `workspace-monitor/next.config.mjs`: Next static export configuration
- `workspace-monitor/components/SnapshotLoader.tsx`: workspace snapshot fetch path
- `workspace-monitor/scripts/check-performance-budget.mjs`: performance/path regression check
- `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`: `REQ-WM-017`
- `workspace-monitor/specs/2026-06-02-performance-budget/`: existing performance spec linkage

## External Sources

- Official Next.js static export docs
- Official Next.js `assetPrefix` docs
- Official MDN `Window.fetch()` docs
- Official Tauri asset protocol docs

## Exclusions

- `_private/` was not read.
- Community posts were not used as direct factual evidence.
