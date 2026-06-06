# 2026-06-06 EVAL runtime telemetry source refactor 요구사항

## 배경

EVAL 종합 개선 cockpit에 runtime telemetry score를 연결하면서 `EvaluationReportPanel.tsx` 안의 계산 책임이 커졌다. 소스 개선 요청에 따라 UI component와 runtime scoring model을 분리해 유지보수성을 올린다.

## 요구사항

- REQ-ERTSR-001: runtime telemetry type과 score/row 생성 로직은 UI component 밖의 TypeScript module로 분리한다.
- REQ-ERTSR-002: `EvaluationReportPanel`은 새 helper를 import해 native runtime score와 telemetry rows를 얻어야 한다.
- REQ-ERTSR-003: OpenTelemetry semantic process metric token은 helper module에 유지해야 한다.
- REQ-ERTSR-004: static contract check와 tests는 새 source boundary를 확인해야 한다.
- REQ-ERTSR-005: 구현 후 check, test, build, package, Browser smoke를 실행한다.
- REQ-ERTSR-006: macOS internal/package pipeline은 이전 실패가 남긴 Tauri `rw.*.dmg` 임시 산출물이 다음 DMG 생성 입력에 섞이지 않도록 Tauri build 직전에 정리해야 한다.

## 비요구사항

- 이번 slice에서 `MonitorShell.tsx` 전체를 분해하지 않는다.
- 새 dependency를 설치하지 않는다.
- EVAL runner를 새로 붙이지 않는다.

## 수용 기준

- `evaluationRuntimeTelemetry.ts`가 존재하고 `buildRuntimeTelemetryModel`을 export한다.
- `EvaluationReportPanel.tsx`는 runtime score 계산을 inline으로 들고 있지 않고 helper를 사용한다.
- `check:comprehensive-improvement`, renderer tests, desktop readiness test가 새 boundary를 확인한다.
- `package:internal`은 stale DMG intermediate cleanup step을 거친 뒤 `.app`와 `.dmg`를 생성하고 검증한다.
- internal package와 Browser smoke가 통과한다.
