# 검증: Dropdown Trigger Baseline

## 계획된 검증

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- 정적 export에서 Tool Studio dropdown trigger Browser smoke
- `git diff --check`

## 현재 상태

- 상태: `passed`

## 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 41개
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734386 bytes, budget 1000000 bytes
- in-app Browser smoke: `aria-haspopup="menu"`, `aria-expanded=false -> true`, `data-state=closed -> open`, menu visible, root overflow 0
- Playwright desktop smoke: 1280x900, trigger 190x44, caret transform matrix(-1, 0, 0, -1, 0, 0), root overflow 0
- Playwright mobile smoke: 390x760, trigger 304x48, caret transform matrix(-1, 0, 0, -1, 0, 0), root overflow 0
- `git diff --check`: 통과

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-dropdown-trigger-baseline-desktop-open.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-dropdown-trigger-baseline-mobile-open.png`
