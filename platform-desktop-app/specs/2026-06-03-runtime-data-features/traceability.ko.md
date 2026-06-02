# Runtime Data Feature Traceability

| 요구사항 | 구현 대상 | 검증 |
| --- | --- | --- |
| REQ-PDA-041 | `platform-desktop-app/src-tauri/src/lib.rs` runtime root helpers and `list_runtime_data_roots` | Rust build, readiness |
| REQ-PDA-042 | `task_runs_base_path`, task-run read/write commands, Desktop task-run panel | task-run tests/readiness |
| REQ-PDA-043 | `run_installer_payload_audit`, payload audit file writer | Tauri build payload audit |
| REQ-PDA-044 | `create_support_diagnostic_bundle`, redaction helpers | support bundle manifest inspection |
| REQ-PDA-045 | `workspace-monitor/scripts/collect-workspace.mjs`, `build:customer`, Tauri build script | snapshot inspection, static build |
| REQ-PDA-046 | `platform-desktop-app/scripts/check-customer-bundle.mjs`, `monitor:build` audit chain | `customer-bundle:audit`, `tauri:build` |
| REQ-PDA-047 | `platform-desktop-app/scripts/check-release-readiness.mjs`, Tauri `hardenedRuntime` config | `release:preflight`, `release:preflight:public:report` |
