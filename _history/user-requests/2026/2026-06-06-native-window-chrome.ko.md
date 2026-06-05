# 사용자 요청 요약: 네이티브 방식 활용

## 요약

사용자는 현재 플랫폼 데스크톱 앱이 웹 렌더링 수준에 머물지 말고 네이티브 데스크톱 방식을 활용하라고 지시했다.

## 해석

이번 구현 slice에서는 창 자체의 native chrome과 drag region을 우선 적용한다. 이미 Rust resource warmup, PTY, native git, OS telemetry가 존재하므로 이번 변경은 창/크롬 레벨의 네이티브 통합을 보강한다.

## 결과 대상

- `platform-desktop-app/src-tauri/tauri.conf.json`
- `platform-desktop-app/src-tauri/capabilities/default.json`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- related tests, specs, validation, evaluation
