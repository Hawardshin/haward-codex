# Scroll Scope Color Speed 검증

## 계획

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- static export Browser smoke: Tools 화면의 scroll scope computed style, root/body overflow, 3D paused attribute 확인
- screenshot smoke: desktop/mobile 캡처
- `git diff --check`

## 기대 기준

- scroll scope selector가 주요 스크롤 범위에 `overscroll-behavior: contain`, stable gutter, scrollbar color를 적용한다.
- 리스트/터미널/소스/Tool Studio 내부 scroll pane은 containment를 가져 repaint 범위를 줄인다.
- Tool Studio 3D canvas는 화면 밖 또는 reduced-motion에서 `data-agent-3d-paused` 상태로 전환될 수 있다.
- desktop 1440x1000과 mobile 390x844에서 root/body horizontal overflow가 0이다.

## 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 46개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과, `scroll_contract_ok`, `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest initial chunk `0.p_a393duhe_.js`, 734386 bytes / 1000000 bytes
- in-app Browser smoke: Tools 화면에서 root horizontal overflow 0, `.desktop-viewport`, `.activity-rail nav`, `.tool-card-scroll`, `.tool-detail-scroll`, `.tool-env-scroll`의 scoped scroll style 확인
- Playwright smoke: desktop 1440x920에서 root horizontal overflow 0, scroll panes `overscroll-behavior: contain`, stable gutter, Tool Studio pane containment 확인
- Playwright smoke: Tool Studio 3D canvas가 viewport 밖으로 이동한 뒤 `data-agent-3d-paused="true"`로 전환됨을 확인
- Playwright smoke: mobile 390x844에서 root horizontal overflow 0, `.tool-studio-workbench` overflow hidden, single-column workbench 확인

## 산출물

- `artifacts/screenshots/2026-06-05-scroll-scope-color-speed-desktop.png`
- `artifacts/screenshots/2026-06-05-scroll-scope-color-speed-mobile.png`
