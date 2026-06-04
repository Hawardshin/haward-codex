# 2026-06-05 Safe Section Location Plan

## Mode

- selected_mode: `standard`
- reason: frontend bug fix, test, browser smoke, history 기록을 포함하는 의미 있는 구현 작업이다.

## Scope

- selected_slice_id: `safe-section-location`
- touch_paths:
  - `platform-desktop-app/renderer/workspace-monitor/components/SnapshotLoader.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/lib/section-location.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/lib/section-location.d.mts`
  - `platform-desktop-app/renderer/workspace-monitor/tests/section-location.test.mjs`
- exclusions:
  - generated snapshot JSON files as commit targets
  - unrelated desktop/Tauri code
  - `_private/`

## Bug

- `readInitialSectionFromLocation` called `decodeURIComponent(hash)` directly.
- A malformed hash such as `#section-%` can throw `URIError: malformed URI sequence` during location synchronization.
- The UI should ignore malformed decoding and keep rendering.

## Tasks

- [x] Extract section normalization into testable `section-location.mjs`.
- [x] Add safe `decodeURIComponent` wrapper.
- [x] Normalize both query and hash section values.
- [x] Add `.d.mts` declaration for TypeScript import.
- [x] Add malformed hash regression test.
- [x] Run tests/check/build/audit/doctor/browser smoke.
