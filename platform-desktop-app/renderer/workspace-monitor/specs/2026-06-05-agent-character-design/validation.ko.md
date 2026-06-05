# Agent Character Design 검증

## 계획

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- Browser/Playwright canvas screenshot smoke
- `git diff --check`

## 현재 결과

- `corepack pnpm --filter workspace-monitor test`: 통과, 46개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
  - scroll contract: `scroll_contract_ok`, CSS contract 15개, focusable pane 3개, mobile override 2개, scoped scroll 1개 확인
  - source control design: `source_control_design_ok`, group 5개 확인
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
  - largest initial chunk: `734386` bytes, budget `1000000` bytes
- Playwright static export smoke: 통과
  - Agents developer snapshot: `canvas[data-agent-collaboration-3d-ready="true"]`, canvas `1246x623`, overflowX `0`
  - Tool Studio desktop: `canvas[data-agent-3d-ready="true"]`, canvas `369x248`, overflowX `0`
  - Tool Studio mobile: offscreen 상태에서는 `data-agent-3d-paused="true"`, 캔버스까지 스크롤 후 `data-agent-3d-ready="true"`, overflowX `0`
  - Customer snapshot: 공개용 협업 데이터가 없어 empty state가 정상 렌더링됨
- In-app Browser: `http://127.0.0.1:3363/?section=agents#section-agents` 및 `?section=tools#section-tools` 열기 확인, 정밀 DOM 검증은 Playwright로 보강

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-agents-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-tools-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-agents-mobile.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-character-design-tools-mobile.png`

## 참고

- Playwright 캡처 중 Chromium WebGL `ReadPixels` performance warning이 출력되었으나 screenshot readback 과정의 경고이며 앱 런타임 오류는 없었다.
- `public/workspace-snapshot.json` 및 `src/generated/*workspace-snapshot.json`은 빌드 과정에서 갱신되었지만 이번 캐릭터 디자인 변경 세트에는 포함하지 않는다.
