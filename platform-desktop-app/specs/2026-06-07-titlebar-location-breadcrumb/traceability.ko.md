# Traceability: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 요청 연결

- 사용자 요청: "사용자 헷갈리지 않게 직관성 개선"
- 선택한 slice: titlebar 현재 위치 breadcrumb

## 요구사항 연결

- 요구사항: `platform-desktop-app/docs/requirements/2026-06-07-titlebar-location-breadcrumb.ko.md`
- 스펙: `platform-desktop-app/specs/2026-06-07-titlebar-location-breadcrumb/spec.ko.md`
- 계획: `platform-desktop-app/specs/2026-06-07-titlebar-location-breadcrumb/plan.ko.md`
- 작업: `platform-desktop-app/specs/2026-06-07-titlebar-location-breadcrumb/tasks.ko.md`
- 검증: `platform-desktop-app/specs/2026-06-07-titlebar-location-breadcrumb/validation.ko.md`

## 구현 연결

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증 연결

- renderer check/test 통과.
- collect, production renderer build, platform check 통과.
- Browser smoke 통과.
- omission/resource/evaluation 기록 완료.
