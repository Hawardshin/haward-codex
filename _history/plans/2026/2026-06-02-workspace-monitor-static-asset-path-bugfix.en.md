# Plan: Workspace Monitor Static Asset Path Bugfix

## Purpose

Fix the Workspace Monitor static export path issue reproduced during bug/functional issue checks, and prevent the same failure from returning in desktop/subpath contexts.

## Scope

- Included: `workspace-monitor` Next static asset path, snapshot JSON fetch URL, `perf:budget` regression check, Playwright subpath smoke
- Excluded: Rust/Tauri toolchain installation, packaged `.app` smoke, snapshot JSON sharding/compression

## Execution Order

1. Web-first intake and memory bootstrap
2. Check existing check/test/build/perf baseline
3. Reproduce `_next` root-relative asset path failure with `file://` smoke
4. Apply relative `assetPrefix` and document-relative snapshot fetch
5. Add absolute `/_next` regression check to `perf:budget`
6. Verify check/test/build/perf and repository-root subpath Playwright smoke
7. Update requirements, specs, history, and evaluation records

## Risk Management

- Do not treat regular Chromium `file://` local JSON fetch failure as final Tauri asset protocol failure.
- Stop the temporary HTTP server after smoke by checking and terminating its PID.
