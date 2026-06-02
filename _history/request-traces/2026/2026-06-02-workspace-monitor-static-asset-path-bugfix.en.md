# Request Trace: Workspace Monitor Static Asset Path Bugfix

## Request

- ID: `UR-2026-06-02-053`
- Summary: Find and fix bugs and functional issues.

## Result

- Reproduced a `workspace-monitor` static export issue where `_next` asset URLs were root-relative.
- Applied `assetPrefix: "./"` in `next.config.mjs` so `_next` asset paths are relative.
- Changed `SnapshotLoader` to fetch `workspace-snapshot.json` relative to the current document location.
- Added an absolute `/_next` asset path regression check to `perf:budget`.
- Passed Playwright smoke for `/workspace-monitor/out/index.html` from a repository-root static server.

## Requirement

- `REQ-WM-017`

## Artifacts

- `workspace-monitor/next.config.mjs`
- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/scripts/check-performance-budget.mjs`
- `workspace-monitor/specs/2026-06-02-static-asset-path-bugfix/`
- `_research/topics/workspace-monitor/2026-06-02-static-asset-path-bugfix.en.md`

## Verification

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- Repository-root static Playwright smoke
