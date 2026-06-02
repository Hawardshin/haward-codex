# Runtime Data Feature Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-041 | The desktop runtime must resolve OS-specific app data, log, cache, and config locations and create required runtime data roots. | must | `list_runtime_data_roots`, Rust build |
| REQ-PDA-042 | CLI task-run records and stdout/stderr logs must default to the app-data runtime store rather than the platform source tree, while legacy repo task-run records remain readable. | must | `task_runs_base_path`, task-run UI, readiness test |
| REQ-PDA-043 | Installer payload audit must detect source trees, `_private/`, `outputs/`, source maps, and developer-only snapshot traces in bundled resources. | must | `run_installer_payload_audit`, payload audit report |
| REQ-PDA-044 | Support diagnostic bundles must include runtime roots, payload audit, and task-run metadata summaries only, excluding raw stdout/stderr, source, and private files. | must | `create_support_diagnostic_bundle`, redacted manifest |
| REQ-PDA-045 | Customer Tauri builds must strip source file contents and internal documents from the public `workspace-monitor` snapshot. | must | `buildCustomerSnapshot`, `build:customer`, snapshot inspection |
| REQ-PDA-046 | Because Tauri `frontendDist` may be embedded separately from resource directory scans, customer static output must pass a dedicated audit gate before Tauri build. | must | `check-customer-bundle.mjs`, `customer-bundle:audit`, `monitor:build` |
| REQ-PDA-047 | Release readiness must distinguish internal/local builds from public distribution and mechanically report Developer ID signing, hardened runtime, and notarization credential blockers. | must | `check-release-readiness.mjs`, `release:preflight:*` |
