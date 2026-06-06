# Large-scope decomposition: EVAL report catalog structure

## 요청 해석

사용자의 “소스코드 개선”은 전체 repository에 걸친 광범위 요청이지만, 현재 문맥은 desktop app EVAL/성능/UI 구조 개선 반복이다. 즉시 검증 가능한 slice로 EVAL report source structure를 선택했다.

## source inventory

- `EvaluationReportPanel.tsx`: EVAL UI rendering.
- `evaluationReportModel.ts`: EVAL score/model assembly.
- `evaluationRuntimeTelemetry.ts`: runtime telemetry score helper.
- contract/tests: comprehensive improvement contract, workspace-monitor tests, desktop readiness tests.

## exclusions

- `_private/`는 검사하지 않는다.
- 전체 repository 일괄 refactor는 이번 slice에서 제외한다.
- 외부 EVAL runner 설치는 설치 감사가 필요하므로 제외한다.

## slice_ids

- `ercs-001`: static catalog extraction.
- `ercs-002`: panel/model/catalog contract update.
- `ercs-003`: validation/build/package close-out.

## touch_paths

- `platform-desktop-app/renderer/workspace-monitor/components/features/evaluationReportCatalog.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/features/evaluationReportModel.ts`
- `platform-desktop-app/renderer/workspace-monitor/components/features/EvaluationReportPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/scripts/check-comprehensive-improvement-contract.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- close-out records under `_history/`, `_research/`, `platform-desktop-app/docs/requirements/`, and `platform-desktop-app/specs/`

## dependencies

`evaluationReportModel.ts` depends on catalog and runtime telemetry model. `EvaluationReportPanel.tsx` depends on catalog for scenarios and model for calculated rows.

## verification

Run targeted contract/tests first, then collect/check/test/build/package and Browser smoke.

## context budget

Use targeted source reads and tests. Do not read every repository file.
