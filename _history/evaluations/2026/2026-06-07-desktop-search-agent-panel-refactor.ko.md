# 2026-06-07 데스크톱 검색 에이전트 패널 분리 평가

## 평가

- 요구 충족: 통과. 검색 에이전트 패널 분리, readiness 복구, 최종 내부 package/run이 모두 통과했다.
- TypeScript 분리: 통과. 검색 에이전트 UI와 모델 라우팅 로직이 `SearchAgentWorkChatPanel.tsx`로 이동했다.
- Rust 확인: 통과. 현재 Rust 소스 추가 변경은 없고 이전 Rust 모듈 경계를 유지했으며 `cargo check`, `cargo test`, `cargo build`, Tauri release build가 통과했다.
- readiness 복구: 통과. `check-service-readiness.mjs --mode internal`과 `platform-desktop-app run check`가 통과했다.
- 패키징 복구: 통과. 내부 `.app`과 `.dmg`가 생성되고 검증됐으며 내부 앱 열기도 성공했다.

## 검증 명령

- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter platform-desktop-app test`
- `cargo check`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm run desktop:package:run:internal`

## 남은 리스크

- `MonitorShell.tsx`는 15,452줄로 여전히 크다. 다음 후보는 `DesktopRuntimePanel` 또는 workspace/support 진단 하위 UI다.
- 공개 배포는 Developer ID signing, notarization, updater, clean-machine smoke가 아직 gate로 남아 있다.
- 작업트리에 기존 변경과 생성물이 많아 커밋은 별도 스코프 정리가 필요하다.
