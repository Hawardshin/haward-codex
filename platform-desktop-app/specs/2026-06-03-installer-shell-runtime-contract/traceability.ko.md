# 추적: Installer Shell Runtime Contract

| 항목 | 연결 |
| --- | --- |
| 사용자 요청 | `UR-2026-06-03-030` |
| 요구사항 | `PDA-REQ-030` |
| 구현 | `platform-desktop-app/runtime-contracts/`, `platform-desktop-app/scripts/check-runtime-contract.mjs`, `platform-desktop-app/src-tauri/src/lib.rs`, `platform-desktop-app/src-tauri/tauri.conf.json` |
| 문서 | `platform-desktop-app/docs/architecture/installer-shell-runtime-contract.ko.md`, `platform-desktop-app/README.md` |
| 검증 | `platform-desktop-app/specs/2026-06-03-installer-shell-runtime-contract/validation.ko.md` |
| 평가 | `_history/evaluations/2026/2026-06-03-installer-shell-runtime-contract-evaluation-result.json` |
| 웹 검색 | `_history/web-searches/2026/2026-06-03-installer-shell-runtime-contract.ko.md` |

## 매핑

- `PDA-REQ-030` -> bundled runtime contract, `get_installer_shell_runtime_contract`, `check-runtime-contract.mjs`, data accumulation targets.
