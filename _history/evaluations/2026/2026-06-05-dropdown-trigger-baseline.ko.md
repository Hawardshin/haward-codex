# 평가: Dropdown Trigger Baseline

## 결과

- 통과.
- Tool Studio 기본 드롭다운 버튼이 현재 세부 기능과 상위 흐름을 함께 보여준다.
- trigger에 `aria-haspopup="menu"`를 명시하고 Radix `data-state` open 상태에 caret 회전을 연결했다.
- desktop/mobile에서 44px 이상 타깃과 root overflow 0을 확인했다.

## 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 41개
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
- in-app Browser smoke: `aria-haspopup="menu"`, `aria-expanded=false -> true`, `data-state=closed -> open`, menu visible, overflow 0
- Playwright smoke: desktop 190x44, mobile 304x48, caret rotated, overflow 0
- `git diff --check`: 통과

## 잔여 리스크

- 이번 변경은 Tool Studio 주 드롭다운에 한정된다. 다른 드롭다운형 컨트롤은 별도 UI normalization slice에서 같은 기준으로 감사할 수 있다.
