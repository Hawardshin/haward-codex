# Work Summary: Popup Overlay Audit

날짜: 2026-06-06

## 완료
- `useOverlayFocus`를 추가해 modal focus 이동, Tab 순환, Escape 닫기, focus restore를 공통화했다.
- command palette, settings dialog, operator center를 `.desktop-app-root` portal로 이동했다.
- terminal drawer를 root portal로 이동하고, 닫힌 상태 접근 차단과 열린 상태 위치 보정을 추가했다.
- overlay z-index token을 dialog/drawer/command/menu로 분리했다.
- popup/menu 회귀 테스트에 portal, focus, z-index, drawer open 위치 계약을 추가했다.

## 검증
- `corepack pnpm --filter workspace-monitor test`: 통과.
- `corepack pnpm --filter workspace-monitor check`: 통과.
- Browser smoke: settings, command palette, terminal drawer, operator center 모두 1280x720 뷰포트 안에 표시됨.
- `corepack pnpm run desktop:renderer:build`: 통과.
- `corepack pnpm run desktop:package:internal`: 통과.
- `corepack pnpm run desktop:run:internal`: `internal_app_opened`.
