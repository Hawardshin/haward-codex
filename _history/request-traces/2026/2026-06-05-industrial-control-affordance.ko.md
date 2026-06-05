# 요청-결과 추적: Industrial Control Affordance

## 요청

- 사용자는 산업 디자이너 수준의 UI 개선을 요구했다.

## 결과

- REQ-WM-059를 추가했다.
- Overview 작업 dock 목표 버튼에 번호, 아이콘, 설명, badge, action cue를 분리 적용했다.
- tactile hover/focus/active 상태와 모바일 reflow를 추가했다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-industrial-control-affordance/`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-industrial-control-affordance-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-industrial-control-affordance-mobile.png`

## 검증

- `test`, `check`, `build:customer`, `perf:budget`, desktop/mobile visual smoke 통과
