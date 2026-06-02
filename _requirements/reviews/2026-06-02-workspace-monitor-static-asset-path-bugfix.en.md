# Requirements Review: Workspace Monitor Static Asset Path Bugfix

## Review Target

- `REQ-WM-017`

## Decision

- Status: approved
- Reason: The previous static export worked from an HTTP root but could break in desktop shell and repository subpath serving contexts because `_next` and snapshot JSON were requested from root-relative URLs. The requirement is a reproducible and verifiable functional stability condition.

## Evidence

- Before fix `file://` smoke: `_next` assets were requested from `file:///_next/...` and failed with `ERR_FILE_NOT_FOUND`.
- After fix `out/index.html`: `_next` asset paths are generated as `./_next/...`.
- After fix repository-root static smoke: `/workspace-monitor/out/index.html` rendered the `Desktop` UI with no `_next` or snapshot request failures.
- Verification: `npm run check`, `npm test`, `npm run build`, `npm run perf:budget`, and Playwright subpath smoke.

## Remaining Follow-Up

- Regular Chromium `file://` blocks local JSON fetch, so real packaged desktop runtime still needs a separate Tauri WebView asset protocol smoke.
- Snapshot JSON sharding/compression remains a separate performance task.
