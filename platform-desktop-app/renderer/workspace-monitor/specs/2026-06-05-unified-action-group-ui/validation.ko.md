# Unified Action Group UI 검증

## 계획

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- static export Browser smoke: 대표 `data-ui-action-group`, titlebar/task handoff/Tool Studio 액션 묶음, desktop/mobile overflow 확인
- screenshot smoke: desktop/mobile 캡처
- `git diff --check`

## 기대 기준

- ActionGroup primitive가 align/density/direction/wrap variant와 role 기본값을 제공한다.
- titlebar, task handoff, command palette, Tool Studio 대표 액션은 Button/ActionGroup primitive를 사용한다.
- 720px/860px 이하에서 액션 묶음은 부모 폭을 채우고 horizontal overflow가 0이다.

## 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 43개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과, `scroll_contract_ok`, `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734,386 bytes / budget 1,000,000 bytes
- in-app Browser smoke: 통과, Tools 화면에서 titlebar/Tool Studio `data-ui-action-group`, min button height 44px, overflowX 0
- Playwright static export smoke: 통과, desktop 1440x1000과 mobile 390x844에서 titlebar/Tool Studio/task handoff action group, command palette primitive button, overflowX 0 확인
- `git diff --check`: 통과

## 산출물

- `artifacts/screenshots/2026-06-05-unified-action-group-ui-desktop.png`
- `artifacts/screenshots/2026-06-05-unified-action-group-ui-mobile.png`
