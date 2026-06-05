# 평가: Button Library Baseline

## 결과

- 통과.
- `@radix-ui/react-slot@1.2.4`와 `class-variance-authority@0.7.1`를 project-local exact dependency로 설치했다.
- `components/ui/Button.tsx`에 `primary`, `secondary`, `outline`, `ghost`, `danger` variant와 `sm`, `md`, `lg`, `icon` size를 제공하는 Button primitive를 추가했다.
- titlebar, task handoff, Tool Studio 대표 액션을 Button primitive로 migration했다.

## 검증

- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor audit --prod=false`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 42개
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- in-app Browser smoke: `data-ui-button` 대표 버튼 5개, root overflow 0
- Playwright smoke: desktop minHeight 44, mobile minHeight 48, root overflow 0
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: 통과
- `git diff --check`: 통과

## 잔여 리스크

- 모든 `<button>` 전면 치환은 하지 않았다. Source editor, terminal, settings, activity rail 같은 특수 control은 후속 slice로 migration해야 한다.
