# 검증: Smooth Redesign Maintenance

## 명령 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 49 tests.
- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor run build`: 통과.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734386 bytes / 1000000 bytes.
- `corepack pnpm --filter workspace-monitor run perf:buttons -- http://127.0.0.1:4181/#section-overview`: 통과, synthetic feedback p95 1.6ms, real click feedback p95 51.9ms.
- `corepack pnpm --filter workspace-monitor exec node scripts/audit-tab-response.mjs http://127.0.0.1:4181/#section-overview`: 통과, 반복 측정 active p95 49.5ms, ready p95 235ms, 모든 target에서 transition shell 감지.

## Playwright Smoke

- Desktop 1440x920에서 `overview`, `agents`, `tools`, `desktop`, `source`, `intent` 탭을 열어 horizontal overflow 0, undersized buttons 0, clipped controls 0을 확인했다.
- Tool Studio action menu는 `workspace-menu-enter` animation을 사용하고 오른쪽 overflow 0이었다.
- Operator Center dialog는 한국어 aria label `운영 센터`로 열리고 overflow 0이었다.
- Mobile 390x844에서 Tools 탭 horizontal overflow 0, undersized buttons 0, clipped controls 0을 확인했다.

## 발견 및 수정

- Tools 탭의 `소스 열기`, `계정 설정` 아이콘 버튼이 29px 너비로 측정되어 `tool-pane-heading` 버튼 최소 너비를 `var(--control-target-size)`로 보정했다.
- 첫 Playwright smoke에서 screenshot path가 package CWD 기준으로 잘못 생성되어 임시 출력 폴더를 삭제했다.
