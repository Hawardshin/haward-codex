# 추적: 실제 서비스 준비도 표면

## 요청

- 사용자 요청: `UR-2026-06-03-012`
- 요구사항: `REQ-PDA-048` - `REQ-PDA-052`

## 산출물

| 항목 | 경로 |
| --- | --- |
| Registry | `platform-desktop-app/configs/service-readiness-registry.json` |
| CLI 검사 | `platform-desktop-app/scripts/check-service-readiness.mjs` |
| Package scripts | `platform-desktop-app/package.json` |
| Rust command | `platform-desktop-app/src-tauri/src/lib.rs` |
| Desktop UI | `workspace-monitor/components/MonitorShell.tsx`, `workspace-monitor/app/globals.css` |
| Tests | `platform-desktop-app/tests/readiness.test.mjs`, `platform-desktop-app/scripts/check-readiness.mjs` |

## 검증 연결

- `npm --prefix platform-desktop-app run service:readiness`
- `npm --prefix platform-desktop-app run service:readiness:public:report`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`
- `npm --prefix workspace-monitor run check`
- `cargo test`
- `cargo build`
