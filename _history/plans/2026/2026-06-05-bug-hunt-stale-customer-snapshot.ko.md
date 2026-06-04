# 2026-06-05 Bug Hunt Stale Customer Snapshot Plan

## Mode

- selected_mode: `standard`
- reason: broad bug hunt에서 실제 source/test/package script를 변경하는 의미 있는 수정 작업이다.

## Scope Decomposition

- source_inventory:
  - `platform-desktop-app/scripts/*`
  - `platform-desktop-app/tests/*`
  - `platform-desktop-app/renderer/workspace-monitor/scripts/*`
  - `platform-desktop-app/renderer/workspace-monitor/package.json`
  - root and desktop package scripts
- exclusions:
  - `_private/`
  - unrelated project source outside current desktop/workspace-monitor path
  - generated snapshot files as commit targets
- selected_slice_id: `customer-snapshot-stale-audit`
- touch_paths:
  - `platform-desktop-app/scripts/check-customer-bundle.mjs`
  - `platform-desktop-app/scripts/desktop-doctor.mjs`
  - `platform-desktop-app/package.json`
  - `platform-desktop-app/tests/customer-bundle.test.mjs`
- merge_gate:
  - strict customer audit must still fail stale public/out snapshots.
  - pre-build/readiness/doctor checks must pass with warning when generated customer fallback is clean.
  - customer build must restore strict audit to no warnings/failures.

## Finding

- `corepack pnpm --filter workspace-monitor build` writes developer snapshot content to `public/workspace-snapshot.json` and static `out/workspace-snapshot.json`.
- After that, `platform-desktop-app check` and `desktop-doctor` treated the stale generated output as a hard failure even though `src/generated/customer-workspace-snapshot.json` was clean and `desktop:renderer:build` would regenerate the strict customer payload before packaging.
- Strict packaging audit behavior was correct and should not be weakened.

## Tasks

- [x] Run existing desktop/workspace-monitor tests and checks.
- [x] Reproduce stale public/out generated snapshot failure after normal monitor build.
- [x] Add fallback-aware audit helper for pre-build/readiness contexts.
- [x] Keep strict `customer-bundle:audit` behavior unchanged.
- [x] Use fallback-aware mode from `platform-desktop-app check` and `desktop-doctor`.
- [x] Add unit regression test.
- [x] Restore customer-safe generated output with `build:customer`.
- [x] Run final verification.
