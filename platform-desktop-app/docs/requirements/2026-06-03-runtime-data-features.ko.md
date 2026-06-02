# Runtime Data Feature 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-041 | Desktop runtime은 OS별 app data/log/cache/config 위치를 계산하고 필요한 runtime data root를 생성해야 한다. | must | `list_runtime_data_roots`, Rust build |
| REQ-PDA-042 | CLI task-run record와 stdout/stderr 로그는 기본적으로 platform source tree가 아니라 app data runtime store에 저장해야 하며, 기존 repo 내부 task-run 기록은 읽기 호환으로 남겨야 한다. | must | `task_runs_base_path`, task-run UI, readiness test |
| REQ-PDA-043 | installer payload audit은 설치 번들 resource 안의 source tree, `_private/`, `outputs/`, source map, developer-only snapshot 흔적을 찾아 고위험 항목으로 보고해야 한다. | must | `run_installer_payload_audit`, payload audit report |
| REQ-PDA-044 | support diagnostic bundle은 runtime root, payload audit, task-run metadata summary만 포함하고 원본 stdout/stderr, source, private files는 포함하지 않아야 한다. | must | `create_support_diagnostic_bundle`, redacted manifest |
| REQ-PDA-045 | 고객용 Tauri build는 `workspace-monitor` 공개 snapshot에서 source file contents와 internal documents를 제거해야 한다. | must | `buildCustomerSnapshot`, `build:customer`, snapshot inspection |
