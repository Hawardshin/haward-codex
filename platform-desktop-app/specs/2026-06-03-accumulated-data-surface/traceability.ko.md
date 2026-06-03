# Accumulated Data Surface 추적

| 요구사항/요청 | 구현 | 검증 |
| --- | --- | --- |
| UR-2026-06-03-031 | 사용자 입장에서 축적 데이터를 쉽게 볼 수 있어야 함 | Accumulated Data panel, metric, command palette |
| PDA-REQ-031 | Dedicated Accumulated Data surface | `get_accumulated_data_overview`, `AccumulatedDataOverviewReport`, readiness/test token |
| Runtime data boundary | runtime data is not source | bounded store reports, symlink skip, app-data runtime store path |
| Installer shell runtime contract | shell command surface and accumulation targets | `accumulated_data_index`, `accumulated_data_command`, `check-runtime-contract.mjs` |

## 변경 파일

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.ko.md`
- `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.en.md`
