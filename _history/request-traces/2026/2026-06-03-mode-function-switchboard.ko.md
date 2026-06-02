# 요청 추적: 모드와 기능 선택 위치 스위치보드

## 요청

- 기능과 모드가 다양하므로 명시적으로 선택하는 모드와 위치를 찾아 반영한다.

## 해석

- 기존 view/language/work/install/desktop session/task pipe/CLI adapter/section 선택지를 한 곳에 모아야 한다.
- 직접 선택 가능한 항목과 task/setup 절차에 속한 항목을 분리해 표시해야 한다.

## 산출물

- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `workspace-monitor/tests/collector.test.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `workspace-monitor/specs/2026-06-03-mode-function-switchboard/`

## 검증

- 최종 검증 결과는 evaluation input/result에 기록한다.
