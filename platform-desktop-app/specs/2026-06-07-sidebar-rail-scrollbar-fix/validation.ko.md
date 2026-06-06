# Validation: Sidebar Rail Scrollbar Fix

날짜: 2026-06-07

## 실행 결과

- 통과: `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`.
- 통과: `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test` (`90` tests).
- 통과: `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`.
- 통과: `corepack pnpm -w run desktop:renderer:build`.
- 통과: `corepack pnpm --dir platform-desktop-app run check`. 기존 public release signing/notarization/updater/clean-machine smoke gate는 public 배포 gate로 남았다.

## Browser Smoke

- 기본 1280x720: 수정 전 `navClientWidth=48`, `navScrollWidth=58`, 수정 후 `navClientWidth=59`, `navScrollWidth=59`.
- 짧은 1280x520: `navClientWidth=48`, `navScrollWidth=48`, `navScrollHeight=376`, `navClientHeight=328`.
- 기본/짧은 viewport 모두 문서 전체 가로 scrollWidth가 viewport width를 넘지 않았다.
- 브라우저 탭을 닫고 dev server 포트 `3231` no-listener를 확인했다.

## 남은 위험

- 매우 작은 모바일 폭에서의 전체 정보구조 재배치는 이번 slice 범위 밖이다.
