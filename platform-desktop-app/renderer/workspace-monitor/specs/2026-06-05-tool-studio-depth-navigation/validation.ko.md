# 검증: Tool Studio Depth Navigation

## 수행 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 41개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734386 bytes, chunk count 12
- in-app Browser: `http://127.0.0.1:3354/#section-tools`에서 초기 `modeDepth=create`, child modes `build/environment`, stage count 2, overflow 0 확인
- in-app Browser: `ship` stage 클릭 후 `modeDepth=ship`, child modes `deploy/registry`, active mode `deploy`, overflow 0 확인
- Playwright static export smoke: 1280x820, 390x720에서 `ship` stage child mode 2개, parent stage count 2, horizontal overflow 0 확인
- `git diff --check`: 통과

## 브라우저 관찰

- Desktop `ship` stage rail columns: `555px 555px`
- Mobile `ship` stage rail columns: `338px`
- Stage button height: 58px
- Screenshots:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-tool-studio-depth-navigation-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-tool-studio-depth-navigation-mobile.png`

## 통과 기준

- 정적 테스트가 parent-child depth 구조를 확인한다.
- `ship` stage 선택 후 세부 rail에는 deploy/registry만 보인다.
- `create` stage 선택 후 세부 rail에는 build/environment만 보인다.
- build/check/perf budget이 통과한다.
