# Validation: 데스크톱 전용 UI 경계

## 실행 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 60 tests
- `corepack pnpm --filter workspace-monitor check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과, 24 tests
- `corepack pnpm --filter platform-desktop-app check`: 통과
- `corepack pnpm run desktop:package:internal`: 통과
- Static Playwright surface audit on `http://127.0.0.1:4182/#section-overview`: 통과, viewport `1280x800`, surfaces 11, failures 0

## Acceptance

- Tauri main window는 `width=1440`, `height=900`, `minWidth=1280`, `minHeight=800`이다.
- CSS에는 `@media (max-width: 720px)`, `@media (max-width: 420px)`, `@media (pointer: coarse)` 모바일 UI 계약이 없다.
- surface audit는 390px mobile page를 만들지 않는다.
- scroll contract는 desktop-only minimum canvas token을 확인한다.

## Build Artifacts

- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
