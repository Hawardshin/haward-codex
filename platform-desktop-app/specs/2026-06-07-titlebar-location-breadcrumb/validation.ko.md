# Validation: Titlebar Location Breadcrumb

날짜: 2026-06-07

## 계획

- 구조 테스트로 `data-current-location-trail`, breadcrumb home/group/section, `aria-current="page"` 계약을 확인한다.
- renderer check/test로 TypeScript와 회귀 테스트를 확인한다.
- collect/build/platform check로 생성 snapshot과 production renderer 경로를 확인한다.
- Browser smoke로 실제 titlebar breadcrumb, 홈 클릭, 모바일 overflow를 확인한다.

## 결과

- 통과: `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`.
- 통과: `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor test` - 90 tests.
- 통과: `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run collect -- --best-effort`.
- 통과: `corepack pnpm -w run desktop:renderer:build`.
- 통과: `corepack pnpm --dir platform-desktop-app run check`. 기존 public release signing/notarization/updater/clean-machine smoke gate는 public 배포 gate로 남았다.
- 통과: Browser smoke.
  - 초기 상태: `홈`, `핵심 기능`, `핵심 홈`, `aria-current="page"` 확인.
  - 섹션 이동: activity rail의 `tools` 클릭 후 `홈`, `핵심 기능`, `툴 스튜디오`로 trail 갱신.
  - 홈 클릭: breadcrumb home 클릭 후 `overview`로 복귀.
  - 모바일 390x844: root/shell/titlebar/breadcrumb/titlebar-actions overflow 없음.
- 통과: dev server cleanup - TCP 3227 listener 없음.
