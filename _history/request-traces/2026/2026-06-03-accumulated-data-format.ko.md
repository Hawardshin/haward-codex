# Request Trace: Accumulated Data Format

## 요청

- 사용자 요청 요약 ID: `UR-2026-06-03-032`
- 요지: 필요하다면 데이터 저장형식을 바꿔야 한다.

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/specs/2026-06-03-accumulated-data-surface/`
- `_history/web-searches/2026/2026-06-03-accumulated-data-format.ko.md`

## 결과

- `get_accumulated_data_overview`가 report 반환 전 `app_data/runtime-data/indexes/accumulated-data-overview.v1.json`을 저장하게 했다.
- `AccumulatedDataOverviewReport`에 `schemaVersion`, `storageFormatVersion`, `indexPath`, `formatMigrationStatus`를 추가했다.
- Workspace Monitor Accumulated Data 패널이 manifest schema, storage format, migration status, index path를 보여준다.
- Runtime contract의 `accumulated_data_index` target을 `runtime_data_index_manifest`와 `app_data/runtime-data/indexes`로 바꿨다.

## 검증

- 검증은 최종 close-out 시 `validation.ko.md`와 evaluation record에 갱신한다.
