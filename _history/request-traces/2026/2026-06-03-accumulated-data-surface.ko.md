# Request Trace: Accumulated Data Surface

## 요청

- 사용자 요청 요약 ID: `UR-2026-06-03-031`
- 요지: 사용자 입장에서 축적되는 데이터를 쉽게 볼 수 있어야 한다.

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/specs/2026-06-03-accumulated-data-surface/`
- `_history/web-searches/2026/2026-06-03-accumulated-data-surface.ko.md`

## 결과

- `get_accumulated_data_overview` command를 추가했다.
- Desktop Runtime에 `Accumulated Data` metric, command action, `축적 데이터 인덱스` 전용 패널을 추가했다.
- 각 data store의 record count, size, latest update, path, visibility, action label을 볼 수 있게 했다.
- Runtime contract와 readiness/test가 새 command와 UI surface를 검증하게 했다.

## 검증

- `cargo fmt`: 통과.
- `cargo check`: 통과.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 14 tests.
- `corepack pnpm --filter platform-desktop-app run runtime:contract`: 통과.
