# 네이티브 창 크롬 활용 스펙

## 목표

`platform-desktop-app`이 Tauri 기반 데스크톱 앱답게 운영체제 창 크롬을 활용하도록 main window 설정과 Workspace Monitor titlebar 드래그 영역을 명시한다.

## 변경 대상

- `platform-desktop-app/src-tauri/tauri.conf.json`
- `platform-desktop-app/src-tauri/capabilities/default.json`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`

## 구현 계약

- Tauri main window:
  - `hiddenTitle: true`
  - `titleBarStyle: "Transparent"`
  - `backgroundColor: "#0f1115"`
- Tauri capability:
  - `core:window:allow-start-dragging`
- Workspace Monitor:
  - `.desktop-titlebar`와 `.titlebar-section`은 `data-tauri-drag-region="deep"`을 가진다.
  - `.titlebar-actions`, `.titlebar-search`, `.titlebar-context-strip`은 `data-tauri-drag-region="false"`를 가진다.
  - CSS는 draggable chrome과 no-drag controls를 `-webkit-app-region`으로 분리한다.

## 수용 기준

- 정적 테스트가 Tauri native titlebar config, capability permission, renderer drag region, no-drag controls를 검증한다.
- readiness check가 native window chrome config와 drag region token 누락을 실패로 처리한다.
- browser 검증에서 titlebar drag region과 titlebar action/search no-drag computed style이 확인되어야 한다.
- internal package build가 `.app`와 `.dmg`를 생성해야 한다.
