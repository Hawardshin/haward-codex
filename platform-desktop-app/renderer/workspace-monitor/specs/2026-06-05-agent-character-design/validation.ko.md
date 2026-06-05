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

## 귀여운 동물형 마스코트 후속 검증

- 사용자 후속 요구: 캐릭터가 너무 현실적이지 않고 귀여운 동물 느낌을 가져야 한다.
- 적용 요구사항: `REQ-WM-073`
- `corepack pnpm --filter workspace-monitor test`: 통과, 46개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
  - scroll contract: `scroll_contract_ok`
  - source control design: `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
  - largest initial chunk: `734386` bytes, budget `1000000` bytes
- In-app Browser: `http://127.0.0.1:3364/?section=agents#section-agents` 로드 확인
  - disclosure click 정밀 검증은 브라우저 런타임 timeout으로 Playwright static export smoke로 보강
- Playwright static export smoke: 통과
  - Agents desktop: `canvas[data-agent-collaboration-3d-ready="true"]`, canvas `1246x623`, overflowX `0`
  - Tool Studio desktop: `canvas[data-agent-3d-ready="true"]`, canvas `369x248`, overflowX `0`
  - Agents mobile: `canvas[data-agent-collaboration-3d-ready="true"]`, canvas `304x152`, overflowX `0`
  - Tool Studio mobile: `canvas[data-agent-3d-ready="true"]`, canvas `316x228`, overflowX `0`

## 귀여운 동물형 마스코트 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-cute-mascot-character-agents-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-cute-mascot-character-tools-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-cute-mascot-character-agents-mobile.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-cute-mascot-character-tools-mobile.png`

## 레퍼런스 기반 캐릭터 디자인 정제 검증

- 사용자 후속 요구: 캐릭터 디자인 자체를 더 좋게 개선하고, 인간이 귀여움을 느끼는 레퍼런스 캐릭터 방향을 반영한다.
- 적용 요구사항: `REQ-WM-073`
- 설계 근거:
  - baby schema 연구: 큰 머리와 둥근 얼굴 신호가 귀여움 인식에 영향을 준다는 기준을 반영
  - Miffy/Kirby/Baymax 레퍼런스: 단순한 실루엣, 작은 얼굴 요소, 둥근 덩어리감을 우선
- `corepack pnpm --filter workspace-monitor test`: 통과, 46개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
  - scroll contract: `scroll_contract_ok`
  - source control design: `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
  - largest initial chunk: `734386` bytes, budget `1000000` bytes
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- In-app Browser: `http://127.0.0.1:3365/?section=agents#section-agents` 로드 확인
- Playwright static export smoke: 통과
  - Agents desktop: `canvas[data-agent-collaboration-3d-ready="true"]`, canvas `1246x623`, overflowX `0`, unique sample `106`
  - Tool Studio mobile: `canvas[data-agent-3d-ready="true"]`, canvas `316x228`, overflowX `0`, unique sample `104`
  - Agents mobile: `canvas[data-agent-collaboration-3d-ready="true"]`, canvas `304x152`, overflowX `0`, unique sample `105`

## 캐릭터 디자인 정제 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-character-design-refinement-agents-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-character-design-refinement-tools-mobile.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-character-design-refinement-agents-mobile.png`

## 에이전트 식별 라벨 및 작은 크기 검증

- 사용자 후속 요구: 어떤 에이전트인지 쉽게 알 수 있게 하고, 캐릭터는 더 작은 크기로 조정한다.
- 적용 요구사항: `REQ-WM-074`
- 설계 근거:
  - avatar와 entity 표시는 avatar 단독보다 label/badge를 함께 두는 것이 빠른 식별에 유리하다.
  - recognition rather than recall 원칙에 맞춰 사용자가 캐릭터 모양을 외우지 않고 code/name label로 구분하게 한다.
- `corepack pnpm --filter workspace-monitor test`: 통과, 46개 테스트
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`: 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
  - scroll contract: `scroll_contract_ok`
  - source control design: `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과
  - largest initial chunk: `734386` bytes, budget `1000000` bytes, chunk count `13`
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- In-app Browser: `http://127.0.0.1:3366/?section=agents#section-agents` 로드 확인
  - text click 정밀 검증은 runtime timeout으로 Playwright static export smoke로 보강
- Playwright static export smoke: 통과
  - Agents desktop: canvas `1246x623`, label `8`, max label width `112`, overflowX `0`
  - Agents mobile: canvas `304x152`, code chip label `8`, max label width `28`, identity strip `8`, overflowX `0`
  - Tool Studio mobile: canvas `316x228`, legend `4`, overflowX `0`, `data-agent-3d-paused="false"`

## 에이전트 식별 라벨 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-identity-labels-agents-desktop.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-identity-labels-agents-mobile.png`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-agent-identity-labels-tools-mobile.png`
