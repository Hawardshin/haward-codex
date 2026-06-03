# Desktop Workspace Host Traceability

| Source | Requirement | Implementation |
| --- | --- | --- |
| UR-2026-06-03-033 | git clone 후 외부 폴더에서 작업하는 기능을 데스크톱 앱에 녹임 | Workspace Host panel, `clone_desktop_workspace`, `set_desktop_workspace_path` |
| PDA-REQ-033 | app-owned workspace import/clone/select/persistence | `DesktopWorkspaceStateReport`, `desktop-workspace-state.v1.json`, `workspace_root_for_app` |
| Service readiness | workspace onboarding is runtime-enforced | `check-service-readiness.mjs`, Rust `get_service_readiness_report` workspace check |
| Runtime contract | shell command surface owns workspace host | `workspace_host_commands` |
