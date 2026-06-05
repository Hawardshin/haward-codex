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
