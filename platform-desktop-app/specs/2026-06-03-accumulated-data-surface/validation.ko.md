# Accumulated Data Surface 검증

## 현재 통과

- `cargo fmt`: 통과.
- `cargo check` from `platform-desktop-app/src-tauri/`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 14 tests.
- `corepack pnpm --filter platform-desktop-app run runtime:contract`: 통과, 9 accumulation targets.
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 16 tests.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: `within_budget`, largest initial chunk 227542 bytes.
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/runtime-data-boundary-registry.json`: 통과.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: 통과.
- Browser smoke: Runtime 화면에서 `축적 데이터 인덱스` 패널, command button, store grid 렌더링 확인. body/doc width 1280/1280, horizontal overflow false.
- Browser smoke: Accumulated Data panel에서 `format`, `manifest-pending`, `Refresh Index`, `.accumulated-store-grid`, `.accumulated-data-panel` 확인. body/doc width 1280/1280, horizontal overflow false.
- Storage format smoke: readiness/runtime contract checks가 `runtime_data_index_manifest`, `accumulated-data-overview.v1.json`, `schemaVersion`, `storageFormatVersion`, `indexPath`, `formatMigrationStatus`를 검증.
- `git diff --check`: 통과.
