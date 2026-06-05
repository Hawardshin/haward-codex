# IDE Action Navigation 검증

## 계획

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- static export Browser smoke: action menu, stage/mode context menu, keyboard shortcuts, desktop/mobile overflow
- `git diff --check`

## 기대 기준

- quick action menu는 `data-tool-action-menu-trigger`와 `data-tool-action-menu`로 확인된다.
- stage/mode rail에는 각각 right-click context menu가 있다.
- `Alt+Enter`, `Alt+1/2`, `Alt+←/→`가 실제 state를 바꾼다.
- mobile 390px에서 root horizontal overflow가 0이다.

## 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 43개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과, `scroll_contract_ok`, `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734,386 bytes / budget 1,000,000 bytes
- in-app Browser smoke: 통과, `data-tool-action-menu-trigger`, stage/mode buttons, overflowX 0 확인
- Playwright static export smoke: 통과, desktop 1440x1000과 mobile 390x844에서 `Alt+Enter`, `Alt+2`, `Alt+ArrowRight`, mode right-click context menu, overflowX 0 확인
- `git diff --check`: 통과

## 산출물

- `artifacts/screenshots/2026-06-05-ide-action-navigation-desktop.png`
- `artifacts/screenshots/2026-06-05-ide-action-navigation-mobile.png`
