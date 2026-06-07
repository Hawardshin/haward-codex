# 2026-06-07 평가: 설정 동기화 단일 소비자

- 결과:
  - top-level settings/provider sync request가 화면 활성 상태와 무관하게 desktop runtime panel에서 실행된다.
  - source panel은 top-level request를 소비하지 않아 중복 실행을 피한다.
  - source 내부 저장/작업공간 변경 동기화는 그대로 local queue를 쓴다.
- 검증 완료:
  - `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
  - `node platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - `node platform-desktop-app/tests/readiness.test.mjs`
  - `corepack pnpm --filter workspace-monitor run check`
  - `corepack pnpm --filter workspace-monitor test`
  - `corepack pnpm --filter platform-desktop-app run check`
  - `corepack pnpm --filter platform-desktop-app test`
  - `corepack pnpm run desktop:package:run:internal`
- 내부 패키징 산출물:
  - `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `.dmg`: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
