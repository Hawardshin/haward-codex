# Request Trace: Native OS Action Bridge

날짜: 2026-06-06

## 요청

운영체제 기능을 직접 조작하도록 도움.

## 산출물

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-06-native-os-action-bridge.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-06-native-os-action-bridge/`
- 구현: `platform-desktop-app/src-tauri/src/lib.rs`, `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- 계약/검증: `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`, `platform-desktop-app/scripts/check-runtime-contract.mjs`, `platform-desktop-app/scripts/check-readiness.mjs`, tests
- 웹 검색 기록: `_history/web-searches/2026/2026-06-06-native-os-action-bridge.ko.md`

## 결과

작업공간을 대상으로 한 bounded native OS action bridge와 Quick Start 버튼을 추가했다.
