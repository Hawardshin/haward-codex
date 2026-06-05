# 평가: IDE Action Navigation

## 결과

- REQ-WM-068 충족: Tool Studio에 primary dropdown, `Alt+Enter` quick action menu, stage/mode 우클릭 context menu, `Alt+1/2`, `Alt+←/→`, 기존 mode shortcut 동기화를 추가했다.
- 기존 shortcut은 이제 mode만 바꾸지 않고 parent stage와 selected tool까지 `selectMode` 경로로 맞춘다.
- 새 설치 없음. 기존 Radix DropdownMenu/ContextMenu와 Button/ActionGroup primitive를 사용했다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk 734,386 bytes
- in-app Browser smoke와 Playwright desktop/mobile keyboard/context smoke: 통과
- `git diff --check`: 통과

## 잔여 리스크

- 이번 slice는 Tool Studio에 집중했다. Source/Agents 등 다른 섹션의 우클릭 action menu는 별도 slice로 확장해야 한다.
