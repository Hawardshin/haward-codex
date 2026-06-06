# 2026-06-06 large-scope decomposition: 구조개선

## 원 요청

구조개선.

## 범위 판단

요청은 전체 source architecture까지 넓게 해석될 수 있지만, 한 커밋에서 안전하게 끝낼 수 있는 slice가 필요하다. 직전 작업에서 `evaluationRuntimeTelemetry.ts`를 분리했으므로, 다음 구조 병목은 `EvaluationReportPanel.tsx` 안에 남아 있는 EVAL report score model이다.

## 선택 slice

- ID: `eval-report-model-structure`
- touch paths:
  - `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
  - `platform-desktop-app/renderer/workspace-monitor/components/features/evaluationReportModel.ts`
  - EVAL contract tests and readiness tests
- dependency:
  - `evaluationRuntimeTelemetry.ts`

## 의도적 제외

- `MonitorShell.tsx` 전체 분해
- desktop runtime Rust command 재구조화
- 새 EVAL runner 설치
- UI visual redesign

## merge gates

- TypeScript check
- comprehensive improvement contract
- workspace-monitor tests
- desktop app tests/check
- renderer build
- `package:internal`
- Browser smoke on static EVAL surface
