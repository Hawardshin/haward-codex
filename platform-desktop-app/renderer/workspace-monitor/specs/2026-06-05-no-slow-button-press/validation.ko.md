# 검증: 버튼 클릭 무지연 계약

## 수행 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 38 tests
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 723490 bytes
- `corepack pnpm --filter workspace-monitor run perf:buttons -- http://127.0.0.1:3348/#section-overview`: 통과
- in-app Browser button smoke: `overview/agents/desktop/source/tools` 실제 버튼 클릭 active/ready true, horizontal overflow false

## 버튼 응답 측정

- 기준: 정적 export, viewport 1280x820, CPU throttle 6
- synthetic representative samples: 67
- synthetic feedback 평균: 0.4ms
- synthetic feedback p95: 1.4ms
- synthetic painted marker p95: 53.1ms
- real nav click feedback 평균: 14.1ms
- real nav click feedback p95: 30.0ms
- failed feedback count: 0
- 실제 nav click:
  - `agents`: 9.2ms
  - `desktop`: 9.6ms
  - `source`: 9.0ms
  - `tools`: 12.7ms
  - `overview`: 30.0ms

## 추가 발견 및 수정

- audit 중 이미 열린 섹션 nav 버튼을 다시 누르면 pre-activation이 `data-section-content-ready=false`로 만든 뒤 React section 값이 변하지 않아 ready 상태가 복구되지 않는 회귀를 발견했다.
- `primeSectionActivation`에서 이미 target section이 ready 상태이면 content-ready 값을 유지하도록 고쳤고 정적 테스트를 추가했다.

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-no-slow-button-press-desktop.png`

## 합격 기준

- 정적 테스트가 `installInstantButtonFeedback`, pointerdown/keydown capture, CSS pressed state, `perf:buttons` script를 확인한다: 통과.
- 67개 representative button press sample이 모두 `data-instant-button-feedback="active"`를 받는다: 통과.
- CPU throttle 6에서 synthetic feedback p95와 real nav click feedback p95가 60ms 이하이다: 각각 1.4ms, 30.0ms로 통과.
- 주요 버튼 smoke에서 active/pressed 피드백과 화면 readiness가 같이 유지된다: 통과.
