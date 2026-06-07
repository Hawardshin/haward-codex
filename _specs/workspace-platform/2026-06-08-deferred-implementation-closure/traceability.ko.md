# Traceability: 미뤄둔 구현 큐 폐쇄

| 요구 | 구현 | 검증 |
| --- | --- | --- |
| 새 Git workspace 생성 | `create_desktop_workspace`, `create_desktop_workspace_report`, `WorkspaceHostPanel` | `platform-desktop-app test`, `tool-studio.test.mjs`, `cargo check` |
| 프로젝트 관리 중심 UI | projects topology snapshot, release unit rendering, workspace action wiring | `smoke:projects-topology`, renderer build |
| 기존 history 호환 | `workspace-history-ledger/tools/build_compat_index.py`, `project-index/`, `legacy-shadow/` | `py_compile`, migration log |
| agent/tool 기능 분리 | `agent-tool-desktop-app` Electron shell | `npm test`, `npm audit`, product boundary config check |
| 설치 audit | installation record, `_ops/installations/registry.json` | `check-config-contract` |
| deferred queue 폐쇄 | deferred improvement JSON updates | omission/resource/evaluation records |
| public release gate 분리 | deferred item `blocked_external_gate`, validation notes | public readiness 미주장 |
