# Validation: Workspace Monitor Static Asset Path Bugfix

## Command Validation

- `npm --prefix workspace-monitor run check`: passed
- `npm --prefix workspace-monitor test`: 10 tests passed
- `npm --prefix workspace-monitor run build`: passed
- `npm --prefix workspace-monitor run perf:budget`: passed
  - `staticAssetPaths`: `relative`
  - largest chunk: `227,537 bytes`
  - budget: `1,000,000 bytes`

## Browser Smoke

- Reproduction: `file:///.../workspace-monitor/out/index.html`
  - Before fix: `_next` asset requests went to `file:///_next/...` and failed with `ERR_FILE_NOT_FOUND`.
  - After fix: `_next` asset request failures disappeared, but regular Chromium still blocks local JSON `fetch(file://...)` and shows `Failed to fetch`.
- Passing gate: repository-root static server
  - server: `python3 -m http.server 3010 --bind 127.0.0.1 --directory <repo>`
  - URL: `http://127.0.0.1:3010/workspace-monitor/out/index.html`
  - Result: `hasDesktop=true`, `hasSnapshotUnavailable=false`, no `_next` or snapshot request failures
  - Server log: `_next` chunks and `workspace-snapshot.json` all returned `200` from `/workspace-monitor/out/...`
  - Cleanup: sent `Ctrl-C` to the tracked TTY server session and confirmed the port was free with `lsof -ti tcp:3010`

## Remaining Risk

- Real Tauri WebView asset protocol validation still needs a separate smoke test after the Rust/Tauri toolchain is available.
- Snapshot JSON size remains a follow-up sharding/compression task.
