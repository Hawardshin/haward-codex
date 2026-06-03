# Traceability: Native-first renderer reduction

## Request

- `UR-2026-06-03-049`: native를 더 많이 건드리고 프론트 코드가 앱 책임을 과하게 들고 있는 부분을 덜어내는 방향을 고려하라고 지시했다.

## Requirements

- `PDA-REQ-049`: native app config preference storage
- `PDA-REQ-050`: renderer as thin client
- `PDA-REQ-051`: theme/language/rail/terminal/runtime defaults/pinned sections schema
- `PDA-REQ-052`: user-visible preference store status/path
- `PDA-REQ-053`: no-localStorage regression guard

## Implementation

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## Validation

- `platform-desktop-app/specs/2026-06-03-native-first-renderer-reduction/validation.ko.md`
- `_history/evaluations/2026/2026-06-03-native-first-renderer-reduction.ko.md`
