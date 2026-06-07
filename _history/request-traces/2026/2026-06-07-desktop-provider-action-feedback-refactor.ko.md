# 2026-06-07 요청-결과 추적: provider/action feedback 분리

## 요청

- 누락된 구현을 이어서 보완하고, 큰 TypeScript/Rust 소스를 더 잘게 나눌 것.

## 산출물

- Rust provider feature module: `platform-desktop-app/src-tauri/src/features/providers.rs`
- Rust module export update: `platform-desktop-app/src-tauri/src/features/mod.rs`
- Tauri wrapper update: `platform-desktop-app/src-tauri/src/lib.rs`
- Service readiness source update: `platform-desktop-app/src-tauri/src/features/service_readiness.rs`
- React action feedback component: `platform-desktop-app/renderer/workspace-monitor/components/features/DesktopActionFeedbackCard.tsx`
- Shell import/call-site cleanup: `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- Test/readiness updates:
  - `platform-desktop-app/scripts/check-readiness.mjs`
  - `platform-desktop-app/scripts/check-service-readiness.mjs`
  - `platform-desktop-app/tests/readiness.test.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/tests/model-routing-controls.test.mjs`
  - `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`

## 검증 연결

- Rust: `cargo check`
- TypeScript/check contracts: `corepack pnpm --filter workspace-monitor run check`
- Renderer tests: `corepack pnpm --filter workspace-monitor test`
- Desktop app tests: `corepack pnpm --filter platform-desktop-app test`
- Product readiness: `corepack pnpm --filter platform-desktop-app run check`
- Final packaging gate: `corepack pnpm run desktop:package:run:internal`

## 결과 판정

- 기능 구현과 분리 작업은 통과.
- 공개 배포는 기존처럼 signing, notarization, updater, clean-machine smoke가 남아 있다.
