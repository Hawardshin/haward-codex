# Runtime Data Feature Validation Plan

## Commands

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build:customer`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `cd platform-desktop-app/src-tauri && cargo test`
- `cd platform-desktop-app/src-tauri && cargo build`
- `npm --prefix platform-desktop-app run tauri:build`
- `codesign --verify --deep --strict platform-desktop-app/src-tauri/target/release/bundle/macos/Agent\ Workspace\ Platform.app`
- `hdiutil verify platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent\ Workspace\ Platform_0.1.0_aarch64.dmg`

## Acceptance Criteria

- Customer public `workspace-snapshot.json` has `sourceFiles=0` and `documents=0`.
- Rust build passes with app-data runtime roots, payload audit, and support bundle commands.
- Readiness checks cover the new commands, UI tokens, and customer snapshot token.

## Result

- `npm --prefix workspace-monitor test`: passed, 14 tests.
- `npm --prefix workspace-monitor run check`: passed.
- `npm --prefix workspace-monitor run build:customer`: passed.
- Customer public snapshot inspection: `sourceFiles=0`, `documents=0`, `historyDays=0`, `projects=0`, `defaultView=user`.
- `npm --prefix platform-desktop-app test`: passed, 9 tests.
- `npm --prefix platform-desktop-app run check`: passed.
- `cd platform-desktop-app/src-tauri && cargo test`: passed.
- `cd platform-desktop-app/src-tauri && cargo build`: passed.
- `npm --prefix platform-desktop-app run tauri:build`: passed.
- `codesign --verify --deep --strict`: passed.
- `hdiutil verify`: VALID.
- `git diff --check`: passed.
