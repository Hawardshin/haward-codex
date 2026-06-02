# Traceability: Real Service Readiness Surface

## Request

- User request: `UR-2026-06-03-012`
- Requirements: `REQ-PDA-048` - `REQ-PDA-052`

## Artifacts

| Item | Path |
| --- | --- |
| Registry | `platform-desktop-app/configs/service-readiness-registry.json` |
| CLI check | `platform-desktop-app/scripts/check-service-readiness.mjs` |
| Package scripts | `platform-desktop-app/package.json` |
| Rust command | `platform-desktop-app/src-tauri/src/lib.rs` |
| Desktop UI | `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css` |
| Tests | `platform-desktop-app/tests/readiness.test.mjs`, `platform-desktop-app/scripts/check-readiness.mjs` |

## Validation Links

- `npm --prefix platform-desktop-app run service:readiness`
- `npm --prefix platform-desktop-app run service:readiness:public:report`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`
- `npm --prefix workspace-monitor run check`
- `cargo test`
- `cargo build`
