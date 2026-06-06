# 작업 요약: CLI 설정 안내 개선

- 날짜: 2026-06-06
- 소유 프로젝트: `platform-desktop-app`
- 커밋 전 상태: 구현 및 검증 완료

## 변경

- CLI 어댑터 가이드에 설치, 로그인/키, 검증, 첫 실행, 기대 결과 필드를 추가했다.
- 설정 모달의 `기본 CLI 어댑터` 섹션을 단계형 setup guide로 바꿨다.
- Agent CLI Cockpit 각 카드에 설치/계정/검증/첫 실행 ladder와 명령 복사 버튼을 추가했다.
- 복사 버튼은 실제 CLI 실행과 분리했다.
- 정적 테스트에 CLI setup guidance 계약을 추가했다.

## 검증

- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- Playwright smoke: `setupSteps=24`, `copyButtons=24`, `cockpitLadders=5`
- `corepack pnpm run desktop:package:internal`

## 산출물

- 내부 `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 제한

- 자동 CLI 설치는 추가하지 않았다.
- 공개 notarization은 Apple credentials가 없어 수행하지 않았다.
