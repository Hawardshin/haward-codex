# Validation: Real Service Readiness Surface

## Validation Results

- `python3 -m json.tool platform-desktop-app/configs/service-readiness-registry.json`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/service-readiness-registry.json`: passed, `self_documenting`
- `npm --prefix platform-desktop-app run service:readiness`: passed, `service_internal_ready_public_blocked`, 0 internal blockers, 4 public blockers
- `npm --prefix platform-desktop-app run service:readiness:public:report`: passed report-only, 4 public blockers
- `npm --prefix platform-desktop-app test`: passed, 13 tests
- `npm --prefix platform-desktop-app run check`: passed
- `npm --prefix workspace-monitor run check`: passed
- `cargo test`: passed
- `cargo build`: passed
- `npm --prefix workspace-monitor test`: passed, 14 tests
- `npm --prefix workspace-monitor run build`: passed after rerun; an earlier overlapping build attempt failed on the Next build lock and was not treated as final validation
- `npm --prefix platform-desktop-app run monitor:build`: passed after sequential rerun, customer bundle ready
- `npm --prefix workspace-monitor run perf:budget`: passed, largest initial chunk 227537 bytes
- `node platform-desktop-app/scripts/check-customer-bundle.mjs`: passed, customer bundle ready
- customer bundle source leak keyword check: passed, no matches for internal source/spec/evaluation path tokens in `workspace-monitor/out` or customer snapshot
- Playwright static smoke on `http://127.0.0.1:4176/`: passed desktop 1440x1100 and mobile 390x900; confirmed `Service Readiness`, `서비스 출시 준비도`, `Public blockers`, `Signed Distribution`, `Update & Recovery`
- `npm --prefix platform-desktop-app run tauri:build`: passed, `.app` and DMG generated
- `codesign --verify --deep --strict`: passed
- `codesign -dv --verbose=4`: `Signature=adhoc`, `Runtime Version=14.4.0`
- `hdiutil verify`: passed, DMG checksum valid
- app open/quit smoke: passed, no remaining `agent-workspace-platform-desktop` process

## Remaining Public Service Blockers

- Developer ID signing/notarization credentials
- signed updater channel and endpoint
- clean-machine install/open/update smoke
- runtime-enforced workspace chooser persistence
