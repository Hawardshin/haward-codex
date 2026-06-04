# Validation: Terminal Open Source UI

## 자동 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과
  - TypeScript 통과
  - `scroll_contract_ok`
  - `source_control_design_ok`
- `corepack pnpm --filter workspace-monitor test`: 통과, 17개 테스트.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과.
  - largest chunk: `13hno~t5sp9b..js`
  - bytes: `328833`
  - budget: `1000000`
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
  - 기존 public release gate 경고는 유지: public signing/notarization, updater, clean-machine smoke.

## Browser 검증

- in-app Browser target: `http://127.0.0.1:3224/`
- 시작 화면: 핵심 홈.
- titlebar `터미널` 버튼 count: `1`.
- 클릭 후 hash: `#section-desktop`.
- drawer class: `panel wide cli-session-panel terminal-drawer open`.
- terminal chrome visible: `true`.
- terminal tab count: `4`.
- tab texts: `시작막힘`, `세션0`, `출력대기`, `이벤트0`.
- computed background:
  - drawer: `rgb(13, 17, 23)`
  - chrome: `rgb(13, 17, 23)`
  - main: `rgb(13, 17, 23)`
- body horizontal overflow: `0`.

## 정적 export viewport 검증

기존 `presentation-agent`의 Playwright dependency를 설치 변경 없이 사용했다.

| Viewport | hash | drawer | chrome | tabs | body overflow | drawer overflow |
| --- | --- | --- | --- | --- | --- | --- |
| 1280x820 | `#section-desktop` | open | visible | 4 | 0 | 0 |
| 900x720 | `#section-desktop` | open | visible | 4 | 0 | 0 |
| 390x720 | `#section-desktop` | open | visible | 4 | 0 | 0 |

## 알려진 제한

- 이번 작업은 terminal UI surface의 구조와 스타일 개선이다.
- true PTY/xterm.js runtime, shell escape sequence, clipboard/scrollback fidelity는 별도 제품 slice다.
