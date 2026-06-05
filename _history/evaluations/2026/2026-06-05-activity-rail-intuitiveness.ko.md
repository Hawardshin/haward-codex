# 평가: Activity Rail Intuitiveness

## 결과

- 통과.
- 기본 activity rail을 아이콘-only에서 아이콘+짧은 라벨 목적지 버튼으로 바꿨다.
- 모바일 상단 rail에서도 라벨이 숨겨지지 않게 유지하고, utility icon button에는 명시적 `aria-label`을 추가했다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 41개
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- in-app Browser smoke: desktop rail labels visible, active current state, utility aria-labels, overflow 0
- Playwright smoke: 1280x820/390x720 label spans visible, mobile rail height 64px, overflow 0

## 잔여 리스크

- 390px 모바일에서는 모든 destination을 한 번에 다 보여주지 않고 가로 스크롤로 접근한다.
- 이번 변경은 primary navigation recognition 개선이며, 각 작업면 내부의 깊은 흐름 직관성은 별도 개선 대상이다.
