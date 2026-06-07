# 2026-06-07 작업 요약: 설정 동기화 공통 훅

- 추가:
  - `platform-desktop-app/renderer/workspace-monitor/components/features/useSettingsRuntimeSync.ts`
- 변경:
  - `MonitorShell.tsx`의 설정 동기화 in-flight ref, queued options ref, timer ref, reason label, 실행 pass를 공통 훅으로 이동.
  - provider/settings request 생성은 `createSettingsRuntimeSyncRequest()`로 통일.
  - First Run, Quick Start, Command Palette의 수동 설정 동기화는 `runManualSettingsSync()`를 호출.
  - readiness와 workspace-monitor 문자열 테스트가 새 훅 파일을 읽도록 갱신.
- 검증:
  - `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
  - `node platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
  - `corepack pnpm --filter workspace-monitor run check`
  - `corepack pnpm --filter workspace-monitor test`
  - `corepack pnpm --filter platform-desktop-app run check`
  - `corepack pnpm --filter platform-desktop-app test`
  - `corepack pnpm run desktop:package:run:internal`
- 내부 산출물:
  - `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
  - `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`
