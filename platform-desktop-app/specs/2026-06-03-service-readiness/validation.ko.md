# 검증: 실제 서비스 준비도 표면

## 검증 결과

- `python3 -m json.tool platform-desktop-app/configs/service-readiness-registry.json`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`: passed, `self_documenting`
- `npm --prefix platform-desktop-app run service:readiness`: passed, `service_internal_ready_public_blocked`, internal blocker 0, public blocker 4
- `npm --prefix platform-desktop-app run service:readiness:public:report`: passed report-only, public blocker 4
- `npm --prefix platform-desktop-app test`: passed, 13 tests
- `npm --prefix platform-desktop-app run check`: passed
- `npm --prefix workspace-monitor run check`: passed
- `cargo test`: passed
- `cargo build`: passed
- `npm --prefix workspace-monitor test`: passed, 14 tests
- `npm --prefix workspace-monitor run build`: passed after rerun; an earlier overlapping build attempt failed on Next build lock and was not treated as final validation
- `npm --prefix platform-desktop-app run monitor:build`: passed after sequential rerun, customer bundle ready
- `npm --prefix workspace-monitor run perf:budget`: passed, largest initial chunk 227537 bytes
- `node platform-desktop-app/scripts/check-customer-bundle.mjs`: passed, customer bundle ready
- customer bundle source leak keyword check: passed, no matches for internal source/spec/evaluation path tokens in `workspace-monitor/out` or customer snapshot
- Playwright static smoke on `http://127.0.0.1:4176/`: passed desktop 1440x1100 and mobile 390x900; `Service Readiness`, `서비스 출시 준비도`, `Public blockers`, `Signed Distribution`, `Update & Recovery` 확인
- `npm --prefix platform-desktop-app run tauri:build`: passed, `.app` and DMG generated
- `codesign --verify --deep --strict`: passed
- `codesign -dv --verbose=4`: `Signature=adhoc`, `Runtime Version=14.4.0`
- `hdiutil verify`: passed, DMG checksum valid
- app open/quit smoke: passed, no remaining `agent-workspace-platform-desktop` process

## 남은 공개 서비스 blocker

- Developer ID signing/notarization credentials
- signed updater channel and endpoint
- clean-machine install/open/update smoke

## 2026-06-03 Desktop Workspace Host 갱신 검증

- `corepack pnpm --filter platform-desktop-app run service:readiness`: passed, `service_internal_ready_public_blocked`, score 94, workspace onboarding passed, public blockers 3
- `corepack pnpm --filter platform-desktop-app run service:readiness:public:report`: passed report-only, public blockers 3
- Workspace onboarding은 app-owned `get_desktop_workspace_state`, `set_desktop_workspace_path`, `clone_desktop_workspace` command와 Workspace Host UI로 구현되었다.

## 현재 남은 공개 서비스 blocker

- Developer ID signing/notarization credentials
- signed updater channel and endpoint
- clean-machine install/open/update smoke
