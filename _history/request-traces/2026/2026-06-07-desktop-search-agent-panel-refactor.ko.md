# 2026-06-07 데스크톱 검색 에이전트 패널 분리 요청 추적

## 요청

- 구현 복구를 계속한다.
- 큰 TypeScript/Rust 소스를 안전하게 더 쪼갠다.
- TypeScript와 Rust를 모두 확인한다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/features/SearchAgentWorkChatPanel.tsx`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/tests/model-routing-controls.test.mjs`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/scripts/check-service-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`

## 검증 연결

- TypeScript: workspace monitor check 통과.
- UI 계약: workspace monitor test 통과.
- 데스크톱 구조/readiness: platform desktop app check 통과.
- Rust: `cargo check`, 패키징 중 `cargo test`, `cargo build`, Tauri release build 통과.
- 패키징: `corepack pnpm run desktop:package:run:internal` 통과.

## 결과

- 검색 에이전트 패널 분리 완료.
- internal readiness blocker였던 provider/model UI 검사 범위 불일치 수정 완료.
- 내부 `.app`과 `.dmg` 생성, 서명 검증, DMG 검증, 내부 앱 열기 완료.
- 공개 배포 gate는 기존처럼 signing, notarization, updater, clean-machine smoke로 남아 있다.
