# Plan: Workspace Monitor Static Asset Path Bugfix

## Scope

- `workspace-monitor` static build output path safety
- `SnapshotLoader` public JSON fetch URL
- Regression checks in the performance-budget script

## Steps

1. Use web-first intake for Next.js static export/assetPrefix, Fetch URL handling, and Tauri asset context.
2. Reproduce the absolute path bug with build output and Playwright smoke.
3. Change Next static asset paths and snapshot fetching to relative URLs.
4. Add an absolute `/_next` regression check to `perf:budget`.
5. Run type check, unit tests, build, budget, and subpath Playwright smoke.
6. Update requirements, specs, history, and evaluation records.

## Decisions

- No new dependency installation is needed.
- Missing Rust/Tauri toolchain does not block this web static bugfix verification.
- Regular browser `file://` fetch failure remains a separate Tauri asset protocol validation task.
