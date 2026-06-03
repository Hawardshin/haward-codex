# 검증: Native-first renderer reduction

## 결과

- 상태: `passed`

## 명령

- `cargo fmt`: passed
- `cargo test`: passed
- `cargo build`: passed
- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: 17 tests passed
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter platform-desktop-app test`: 17 tests passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- Browser smoke on `http://127.0.0.1:3240/`: settings dialog opened, `데이터/운영` tab showed `앱 설정 저장소`, console error count `0`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`: passed
- `git diff --check`: passed

## 정적 검증

- `MonitorShell.tsx`에 `localStorage` reference가 남아 있지 않다.
- `check-readiness.mjs`는 `localStorage`가 다시 등장하면 실패한다.
- `readiness.test.mjs`는 `get_desktop_preferences`, `save_desktop_preferences`, `DesktopPreferencesReport`, `desktop-preferences.v1.json`, `native-preferences-pane`을 검증한다.
- runtime contract는 `preferences_commands`를 포함한다.
- 정적 customer build에서 설정 저장소 UI가 렌더링되며, Tauri가 없는 미리보기에서는 `browser_fallback`으로 명시된다.

## 잔여 위험

- Tauri packaged app 재실행 후 persistence smoke는 다음 packaging slice에서 추가로 확인해야 한다.
- Rust native code는 아직 `lib.rs`에 모여 있으므로 다음 slice에서 module split이 필요하다.
