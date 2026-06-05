# Validation: Native Select 교체

## 실행 결과

- `rg -n "<select\\b|\\.decision-answer-controls select|\\.learning-decision-controls select|\\.agent-provider-run-controls select|\\.agent-chat-composer select" ...`: source component에는 native select 없음. 테스트 파일의 재발 방지 assertion만 매칭.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test`: passed, 59 tests.
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`: passed.
- `corepack pnpm --dir platform-desktop-app test`: passed, 22 tests.
- `corepack pnpm --dir platform-desktop-app run check`: passed.
- `corepack pnpm --dir platform-desktop-app run package:internal`: passed.

## Browser Smoke

- Dev server: `http://127.0.0.1:3210/#history`
- In-app Browser DOM check: `document.querySelectorAll("select").length === 0`
- 제한: 화면은 `Loading workspace snapshot`에서 본문까지 진입하지 못했다. 따라서 실제 본문 visual smoke는 완료하지 못했고, 정적 DOM/타입/테스트/내부 패키징으로 보완했다.

## 산출물

- Internal app: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- Internal DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 남은 위험

- 공개 배포 readiness는 기존처럼 Developer ID signing, notarization, updater, clean-machine smoke가 필요하다.
