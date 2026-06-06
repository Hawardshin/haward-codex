# 검증: desktop dev/run fix

## 현재 통과

- 실패 재현: 기존 `corepack pnpm --filter platform-desktop-app run tauri:dev`가 `../renderer/workspace-monitor` ENOENT로 실패.
- 1차 수정 후 재현: 경로는 해결됐지만 updater plugin panic 발생.
- `corepack pnpm run desktop:dev`: 통과. Next dev server ready, Rust dev build finished, app request `GET / 200`.
- Dev process cleanup: Next dev server와 Tauri debug process 종료 확인.
- `corepack pnpm run desktop:run:internal -- --dry-run`: 통과. `.app`/DMG artifact path 확인.
- `corepack pnpm run desktop:doctor`: 통과. public release gates만 warning.
- `cargo check` from `platform-desktop-app/src-tauri`: 통과.
- `corepack pnpm --filter platform-desktop-app test`: 통과. tests 24개.
- `corepack pnpm --filter workspace-monitor run collect`: 통과. developer/customer snapshot 갱신.
- `corepack pnpm --filter workspace-monitor run check`: 통과. lazy boundary, scroll, source control design, comprehensive improvement, history payload contract 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과. tests 70개.
- `corepack pnpm --filter workspace-monitor run build`: 통과. Next static build completed.
- `corepack pnpm run desktop:package:internal`: 통과. `.app`와 DMG 생성, codesign verify, hdiutil verify 완료.
- post-package `corepack pnpm run desktop:run:internal -- --dry-run`: 통과. 내부 `.app`/DMG 경로와 open command 확인.
- post-package `corepack pnpm run desktop:run:internal`: 통과. 패키지 앱 프로세스가 실제 기동됨.
- post-package cleanup: app PIDs `85397`, `87155` 종료 후 `pgrep`과 port 3000 listener 없음 확인.

## 산출물

- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- `/Users/shinjoungeun/Desktop/Obsidian/brain/codex/platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 남은 공개 배포 게이트

공개 배포는 Developer ID signing, Apple notarization, Tauri updater signing/public key/endpoints, clean-machine smoke가 없어서 아직 readiness warning 상태다. 이 경고는 local/internal build/run을 막지 않는다.
