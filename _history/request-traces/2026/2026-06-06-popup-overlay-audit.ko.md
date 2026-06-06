# Request Trace: Popup Overlay Audit

날짜: 2026-06-06

## 요청
- 팝업 같은 UI를 전부 검토하고 고친다.

## 산출물
- 요구사항 업데이트: `platform-desktop-app/docs/requirements/2026-06-06-popup-scroll-clipping.ko.md`
- 스펙 업데이트: `platform-desktop-app/specs/2026-06-06-popup-scroll-clipping/`
- 구현:
  - `platform-desktop-app/renderer/workspace-monitor/components/ui/useOverlayFocus.ts`
  - `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/features/OperatorCenterDialog.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/workbench/RuntimeTerminalDrawer.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- 평가: `_history/evaluations/2026/2026-06-06-popup-overlay-audit.ko.md`

## 검증 결과
- workspace-monitor test/check 통과.
- Browser smoke에서 설정, 명령 팔레트, 터미널 드로어, 운영 센터 viewport containment 확인.
- renderer customer build와 customer bundle audit 통과.
- internal Tauri package, codesign verify, hdiutil verify 통과.
- internal app open 성공.

## 커밋
- 예정: `fix(desktop): stabilize overlay portals`
