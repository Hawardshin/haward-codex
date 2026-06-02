# Plan Evidence: Workspace Monitor Static Asset Path Bugfix

## Decomposition Decision

- The user request was broad, but the immediately reproduced functional bug from repository validation was the `workspace-monitor` static export root-relative asset path.
- `workspace-monitor`, `platform-desktop-app`, `agent-platform`, naming audit, and structure audit had already passed baseline checks, so this slice focused on the reproduced static asset path issue.

## Selected Fix

- Make Next build output `_next` asset paths relative through `assetPrefix: "./"`.
- Fetch the public snapshot JSON relative to the current document URL so root and subpath contexts both work.
- Put regression prevention in `perf:budget` so performance budget and static packaging safety are checked together.

## Validation Plan

- `workspace-monitor` check/test/build/perf
- Subpath URL smoke from a repository-root static server
- Use `file://` smoke only as an asset-path regression signal; record local JSON fetch failure as a separate Tauri validation risk
