# 2026-06-06 source improvement 범위 분해

## 원 요청

소스개선.

## 선택 slice

직전 작업에서 `EvaluationReportPanel.tsx` 안에 runtime telemetry score, byte formatting, row construction 로직이 커졌다. 이 로직은 UI 렌더링보다 data/model 책임에 가까우므로 별도 pure TypeScript module로 분리한다.

## 제외

- `MonitorShell.tsx` 전체 분해는 파일 규모가 크고 blast radius가 커서 이번 slice에서 제외한다.
- 새 dependency 설치는 필요하지 않다.
- `_private/`는 읽지 않는다.

## Touch paths

- `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/features/evaluationRuntimeTelemetry.ts`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-comprehensive-improvement-contract.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/src/generated/*`
- `platform-desktop-app/renderer/workspace-monitor/public/*snapshot*.json`

## Merge gate

- TypeScript check 통과.
- workspace-monitor tests 통과.
- desktop app check/test 통과.
- renderer build 통과.
- internal package 통과.
- Browser smoke에서 EVAL cockpit 유지 확인.
