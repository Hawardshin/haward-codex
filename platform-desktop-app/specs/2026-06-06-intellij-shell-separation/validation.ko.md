# Validation: IntelliJ Shell Separation

## 실행 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 81 tests.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- Browser computed-style check: 통과. `data-layout-model=intellij-tool-window-editor`, rail width 76px, viewport/titlebar left 76px, full-bleed titlebar, rail/editor background and separator shadow 확인.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 27 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. 기존 public release 경고는 signing/notarization/updater/clean-machine smoke test.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.

## 패키지 산출물

- macOS app: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 최종 예정

- `git diff --check`
