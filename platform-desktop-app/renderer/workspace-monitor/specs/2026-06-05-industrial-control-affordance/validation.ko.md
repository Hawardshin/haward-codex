# Industrial Control Affordance 검증

## 계획

- `corepack pnpm --filter workspace-monitor test`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 723,490 bytes
- desktop static export visual smoke: 통과, button 6개, action cue 6개, icon 6개, 첫 버튼 88px, overflowX 0
- mobile 390px static export visual smoke: 통과, button 6개, action cue 6개, icon DOM 6개/display none, 첫 버튼 약 109px, overflowX 0

## 기대 기준

- `task-intent-icon`과 `task-intent-action-cue`가 각 목표 버튼에 존재한다.
- 작업 dock 버튼은 desktop에서 88px 이상 높이를 가진다.
- 모바일 390px에서 body horizontal overflow가 0이다.
- action cue 개수는 목표 버튼 개수와 같다.

## 산출물

- `artifacts/screenshots/2026-06-05-industrial-control-affordance-desktop.png`
- `artifacts/screenshots/2026-06-05-industrial-control-affordance-mobile.png`
