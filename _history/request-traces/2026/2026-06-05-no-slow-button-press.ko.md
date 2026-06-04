# 요청-결과 추적: 버튼 클릭 무지연

## 요청

- 버튼을 눌렀을 때 절대 느려지는 현상이 없도록 개선한다.

## 결과

- `MonitorShell`에 capture-phase instant button feedback layer를 추가했다.
- 모든 `button`, `[role='button']`, `summary`, `a[href]` 대상은 pointerdown/Enter/Space 단계에서 즉시 `data-instant-button-feedback="active"`를 받는다.
- CSS 눌림 피드백을 추가해 실제 React click handler나 heavy action 이전에 사용자가 누름 상태를 볼 수 있게 했다.
- `scripts/audit-button-response.mjs`와 `perf:buttons`를 추가해 CPU throttle 6 기준 버튼 응답 p95를 반복 측정한다.
- audit 중 같은 섹션 nav 재클릭이 `data-section-content-ready=false`로 남는 회귀를 찾아 수정했다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/scripts/audit-button-response.mjs`
- `platform-desktop-app/renderer/workspace-monitor/package.json`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-no-slow-button-press/`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-no-slow-button-press-desktop.png`

## 검증

- `corepack pnpm --filter workspace-monitor test`: 38 tests 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 723490 bytes
- `corepack pnpm --filter workspace-monitor run perf:buttons -- http://127.0.0.1:3348/#section-overview`: 통과
- CPU throttle 6 button audit: 67 samples, synthetic feedback p95 1.4ms, painted marker p95 53.1ms, real nav click p95 30.0ms, failed feedback 0
- in-app Browser smoke: `overview/agents/desktop/source/tools` 실제 버튼 클릭 active/ready true, horizontal overflow false

## 커밋

- pending
