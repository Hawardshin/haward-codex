# 작업 요약: CLI 스크롤 겹침 제거

- 날짜: 2026-06-06
- 소유 프로젝트: `platform-desktop-app`
- 커밋 전 상태: 구현 및 검증 완료

## 변경

- 설정 모달 바깥 backdrop의 스크롤을 제거하고, 설정 본문 panel만 세로 스크롤을 갖도록 정리했다.
- subsection rail은 가로 방향만 스크롤되게 했다.
- CLI 설정 카드와 명령 복사 버튼은 별도 scroll container 대신 접히는 grid로 바꿨다.
- 긴 CLI 명령은 카드 안에서 줄바꿈되도록 처리했다.
- scroll contract checker와 정적 테스트에 회귀 방지 계약을 추가했다.

## 검증

- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`
- Playwright smoke: `badVertical=[]`, `badHorizontal=[]`, `subsectionRailYHidden=true`
- `corepack pnpm run desktop:package:internal`

## 산출물

- 스크린샷: `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-06-cli-scroll-isolation-settings.png`
- 내부 `.app`: `platform-desktop-app/src-tauri/target/release/bundle/macos/Agent Workspace Platform.app`
- 내부 DMG: `platform-desktop-app/src-tauri/target/release/bundle/dmg/Agent Workspace Platform_0.1.0_aarch64.dmg`

## 제한

- 공개 notarization은 Apple credentials가 없어 수행하지 않았다.
