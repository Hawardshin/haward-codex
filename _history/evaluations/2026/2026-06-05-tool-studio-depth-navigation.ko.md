# 평가: Tool Studio Depth Navigation

## 결과

- 통과.
- Tool Studio에 `제작 준비`와 `출시 관리` parent stage를 추가했다.
- 세부 mode rail은 현재 parent stage의 child mode만 렌더링한다.
- 단축키, dropdown, external requested mode, 카드 선택이 세부 mode로 들어갈 때 parent stage도 함께 동기화된다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 41개
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- in-app Browser smoke: create parent에서 build/environment, ship parent에서 deploy/registry만 렌더링됨
- Playwright smoke: 1280x820/390x720 모두 child mode count 2, overflow 0

## 잔여 리스크

- Tool Studio 내부 폼의 각 입력 단계는 아직 한 화면 안의 카드/패널 구조다.
- 모바일에서는 parent stage가 먼저 보이고 child mode rail은 화면 높이에 따라 아래로 밀릴 수 있다.
