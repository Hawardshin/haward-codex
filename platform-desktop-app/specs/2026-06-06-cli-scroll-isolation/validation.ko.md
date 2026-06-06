# 검증: CLI 스크롤 겹침 제거

## 예정 명령

- `git diff --check`
- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- Playwright smoke against local dev server
- `corepack pnpm run desktop:package:internal`

## UI 계약

- `.settings-dialog-backdrop`은 `overflow: hidden`을 사용한다.
- `.settings-tab-panel`은 `overflow-y: auto`와 `overflow-x: hidden`을 사용한다.
- CLI setup guide와 command stack은 nested scroll container가 아니다.
- CLI command controls는 grid wrapping으로 배치된다.

## 결과

- `git diff --check`: passed
- `corepack pnpm --filter workspace-monitor run collect`: passed, 650 inline documents and 2616 admin history records
- `corepack pnpm --filter workspace-monitor run check`: passed, scroll contract 18 CSS contracts
- `corepack pnpm --filter workspace-monitor test`: passed, 78 tests
- `corepack pnpm --filter workspace-monitor run build`: passed
- Playwright smoke: passed, `settings-dialog-backdrop` hidden, `settings-tab-panel` auto, CLI guide/stepper/copy row no overflow
- `corepack pnpm run desktop:package:internal`: passed
- `codesign --verify --deep --strict`: passed
- `hdiutil verify`: passed

## 생성물

- Visual smoke screenshot: `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-06-cli-scroll-isolation-settings.png`
- 내부 앱: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 제한

- 공개 notarization은 Apple credentials가 없어 수행하지 않았다.
