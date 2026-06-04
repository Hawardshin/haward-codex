# 2026-06-05 Snapshot Loader Error State Plan

## Mode

- selected_mode: `standard`
- reason: frontend bug fix, test, browser verification, history 기록을 포함하는 의미 있는 구현 작업이다.

## Scope Decomposition

- selected_slice_id: `snapshot-loader-error-state`
- source_inventory:
  - `platform-desktop-app/renderer/workspace-monitor/components/SnapshotLoader.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/tests/`
  - workspace-monitor build/check/test scripts
- exclusions:
  - generated snapshot JSON files as commit targets
  - unrelated desktop runtime and Tauri source
  - `_private/`
- plan_evidence:
  - `SnapshotLoader` already had `state.status === "error"` render branch.
  - The fetch catch path only logged warning and did not set error state.
  - Timeout timer was only cleared on effect cleanup, not immediately after request completion.

## Bug

- Snapshot fetch failure or timeout left the UI in `"Loading workspace snapshot"` indefinitely.
- The existing `"Snapshot unavailable"` screen was effectively unreachable from fetch failure.

## Tasks

- [x] Set `SnapshotLoader` error state on fetch failure/timeout.
- [x] Clear snapshot timeout when the async request settles.
- [x] Preserve cleanup abort behavior on unmount.
- [x] Add regression test for source contract.
- [x] Run workspace-monitor tests/check/build/perf.
- [x] Run desktop tests/check/doctor/customer audit.
- [x] Verify static export error UI with Playwright.
