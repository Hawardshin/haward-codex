# 검증: 구조/메모리/성능 마이그레이션

## 현재 검증

- developer snapshot size: 약 3,595,724 bytes에서 2,768,645 bytes로 감소.
- `sourceFiles[].content` count: 0.
- source preview bytes: 135,688 bytes.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: 55 tests 통과.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: 통과.
- `corepack pnpm --dir platform-desktop-app test`: 22 tests 통과.
- `corepack pnpm --dir platform-desktop-app run check`: 통과.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과. renderer customer build/audit, intent-map checks, desktop tests/check, Rust tests/build, Tauri app/DMG build, codesign verify, hdiutil verify 포함.

## 산물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 예정 검증

- package 후 developer snapshot 재수집.
- `git diff --check`.
