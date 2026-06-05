# 네이티브 창 크롬 활용 추적

## 요구사항 연결

- REQ-NATIVE-CHROME-001 -> `src-tauri/tauri.conf.json`, `tests/readiness.test.mjs`, `scripts/check-readiness.mjs`
- REQ-NATIVE-CHROME-002 -> `src-tauri/tauri.conf.json`, `tests/readiness.test.mjs`, `scripts/check-readiness.mjs`
- REQ-NATIVE-CHROME-003 -> `components/MonitorShell.tsx`, `tests/tool-studio.test.mjs`
- REQ-NATIVE-CHROME-004 -> `components/MonitorShell.tsx`, `app/globals.css`, `tests/tool-studio.test.mjs`
- REQ-NATIVE-CHROME-005 -> `src-tauri/capabilities/default.json`, `tests/readiness.test.mjs`, `scripts/check-readiness.mjs`
- REQ-NATIVE-CHROME-006 -> `specs/2026-06-06-native-window-chrome/validation.ko.md`

## 근거

- Tauri config reference: `https://v2.tauri.app/reference/config/`
- Tauri window customization: `https://v2.tauri.app/learn/window-customization/`
- Tauri core permissions: `https://v2.tauri.app/reference/acl/core-permissions/`
- Apple Human Interface Guidelines: `https://developer.apple.com/design/human-interface-guidelines`
