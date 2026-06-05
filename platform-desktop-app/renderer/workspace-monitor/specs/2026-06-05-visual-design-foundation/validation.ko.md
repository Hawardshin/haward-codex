# Visual Design Foundation 검증

## 계획

- `corepack pnpm --filter workspace-monitor test`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 723,490 bytes / budget 1,000,000 bytes
- desktop static export visual smoke: 통과, focus/card/dock/primary 렌더링, old meta-copy 없음, overflowX 0
- mobile 390px static export visual smoke: 통과, focus/card/dock/primary 렌더링, old meta-copy 없음, primary action 48px, overflowX 0

## 기대 기준

- Overview에 이전 meta-copy `한 화면은 하나의 결정을 크게 보여줍니다`가 남지 않는다.
- `home-focus-command`, `home-focus-card`, `home-navigation-dock`이 렌더링된다.
- desktop/mobile body horizontal overflow가 0이다.
- primary action은 48px 이상 클릭 높이를 유지한다.

## 산출물

- `artifacts/screenshots/2026-06-05-visual-design-foundation-desktop.png`
- `artifacts/screenshots/2026-06-05-visual-design-foundation-mobile.png`

## 2026-06-05 Premium Apple Design System 추가 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 46개 테스트
- `corepack pnpm --filter workspace-monitor run check`: 통과, `scroll_contract_ok`, `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734,386 bytes / 1,000,000 bytes
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- 개발 snapshot 복구용 `corepack pnpm --filter workspace-monitor run build`: 통과
- Playwright static export smoke: desktop home, desktop Agents 3D, mobile Tool Studio 모두 `overflowX 0`
- primary action height: home desktop 48px, Agents 3D desktop 44px, Tool Studio mobile 48px
- 3D canvas nonblank QA: Agents 3D `canvasDataUrlLength 195910`, Tool Studio mobile `canvasDataUrlLength 10034`

## 2026-06-05 Premium 산출물

- `artifacts/screenshots/2026-06-05-premium-design-home-desktop.png`
- `artifacts/screenshots/2026-06-05-premium-design-agents-3d-desktop.png`
- `artifacts/screenshots/2026-06-05-premium-design-tool-studio-mobile.png`
