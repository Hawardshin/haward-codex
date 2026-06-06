# 추적성

날짜: 2026-06-06

| 요구사항 | 구현 | 검증 |
| --- | --- | --- |
| REQ-RFS-001 | `src-tauri/src/features/*.rs` | readiness test, check-readiness |
| REQ-RFS-002 | `get_rust_runtime_feature_map` | cargo test, runtime contract |
| REQ-RFS-003 | 기존 command 유지, read-only report 추가 | cargo check/test, platform test/check |
| REQ-RFS-004 | `Rust 모듈`, `Rust 명령` metrics | workspace-monitor test/check |
| REQ-RFS-005 | specs/traceability/migration notes | spec/tasks/evaluation |

## 주요 파일

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/src-tauri/src/features/mod.rs`
- `platform-desktop-app/src-tauri/src/features/*.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/scripts/check-runtime-contract.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
