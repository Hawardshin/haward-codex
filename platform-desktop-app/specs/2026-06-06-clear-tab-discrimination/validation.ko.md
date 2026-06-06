# Validation: Clear Tab Discrimination

## 실행 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 82 tests.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- Browser computed-style check: 통과. Visible active tool-studio tab에서 `::before` opacity `1`, height `4px`, inactive opacity `0`, selected shadow와 inactive shadow 차이를 확인했다.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 27 tests.
- `corepack pnpm --filter platform-desktop-app run check`: 통과. 기존 public release 경고는 signing/notarization/updater/clean-machine smoke test.
- `corepack pnpm --dir platform-desktop-app run package:internal`: 통과.
- `git diff --check`: 통과.

## 패키지 산출물

- macOS app: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 최종 상태

- 내부 build/package와 repository diff 검사가 모두 통과했다.
