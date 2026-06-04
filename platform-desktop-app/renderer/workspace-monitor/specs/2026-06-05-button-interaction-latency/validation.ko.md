# Validation: Button Interaction Latency

## Baseline

- 환경: static export, Chromium headless, viewport 1280x820, CPU throttle 6.
- 표본: 주요 섹션의 visible enabled `button`, `summary`, `a[href^="#"]` 67개.
- baseline worst case:
  - Agents → CLI rail button: `177.4ms`
  - long task: `122ms`
- 관찰: 느린 버튼은 개별 handler보다 Desktop Runtime/Source workbench 진입 마운트에 집중됐다.

## 최종 계측

- 환경: static export, Chromium headless, viewport 1280x820, CPU throttle 6.
- 표본: 67개.
- average click-to-paint: `27.9ms`
- p95 click-to-paint: `45.4ms`
- max click-to-paint: `47.8ms`
- long task count: `0`
- body horizontal overflow: 모든 표본 `0`.

## 자동 검증

- `corepack pnpm --filter workspace-monitor run check`: 통과.
- `corepack pnpm --filter workspace-monitor test`: 통과, 17 tests.
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과.
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과.
  - largest chunk: `0zjyaosh1i6cu.js`
  - bytes: `331633`
  - budget: `1000000`
- `corepack pnpm --filter platform-desktop-app run check`: 통과.
  - 기존 public release gate 경고는 유지: signing/notarization, updater, clean-machine smoke.

## Browser 검증

- in-app Browser target: `http://127.0.0.1:3225/`
- Agents → CLI button settled state:
  - hash: `#section-desktop`
  - workbench visible: `true`
  - staged shell removed: `true`
  - horizontal overflow: `0`

## 제한

- Playwright audit는 CI command로 고정하지 않고 이번 작업 검증 기록으로 보존한다.
- Tauri native command 내부 지연은 별도 native runtime profiling 범위다.
