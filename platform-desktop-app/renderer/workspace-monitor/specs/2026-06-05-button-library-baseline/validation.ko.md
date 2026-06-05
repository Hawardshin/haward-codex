# 검증: Button Library Baseline

## 계획된 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor audit --prod=false`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- 정적 export Button Browser smoke
- `git diff --check`

## 현재 상태

- 상태: `passed`

## 결과

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor audit --prod=false`: 통과, no known vulnerabilities
- `corepack pnpm --filter workspace-monitor test`: 통과, 42개
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734386 bytes, budget 1000000 bytes
- in-app Browser smoke: titlebar terminal, command palette icon, Tool Studio primary/secondary 대표 버튼 5개가 `data-ui-button`으로 렌더링되고 root overflow 0
- Playwright desktop smoke: 1280x900, uiButtonCount 5, minHeight 44, icon 44x44, root overflow 0
- Playwright mobile smoke: 390x760, uiButtonCount 5, minHeight 48, icon 48x48, root overflow 0
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과, self_documenting
- `git diff --check`: 통과

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-button-library-baseline-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-button-library-baseline-mobile.png`
