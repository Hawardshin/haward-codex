# Work Summary: Desktop-only UI Boundary

## 완료한 변경

- Tauri main window 기본 크기를 1440x900, 최소 크기를 1280x800으로 올렸다.
- renderer CSS에 데스크톱 최소 canvas token을 추가했다.
- 720px/420px 모바일 UI media block과 coarse pointer token override를 제거했다.
- surface audit를 desktop minimum viewport 한 개만 검사하도록 바꿨다.
- scroll/test/readiness 계약을 desktop-only 기준으로 바꿨다.
- 요구사항과 spec/history 기록을 갱신했다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과
- `corepack pnpm --filter workspace-monitor check`: 통과
- `corepack pnpm --filter platform-desktop-app test`: 통과
- `corepack pnpm --filter platform-desktop-app check`: 통과
- static Playwright surface audit: 1280x800, 11 surfaces, failures 0
- `corepack pnpm run desktop:package:internal`: 통과

## 산출물

- `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
