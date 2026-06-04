# 요청-결과 추적: 탭 전환 무지연

## 요청

- 탭 간 이동이 절대 느려지지 않도록 개선한다.

## 결과

- `MonitorShell`에 tab pre-activation을 추가해 pointerdown 순간 active 탭, `data-active-section`, title label을 먼저 반영했다.
- React `section` state commit은 첫 paint 이후로 예약하고 stale 예약은 취소한다.
- heavy section body는 `readySection` staged mount로 첫 paint 이후에 붙인다.
- Source query는 Source body 준비 전에는 빈 문자열로 유지해 대량 source content scan을 막는다.
- 반복 가능한 `scripts/audit-tab-response.mjs` 성능 audit를 추가했다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/renderer/workspace-monitor/tests/tool-studio.test.mjs`
- `platform-desktop-app/renderer/workspace-monitor/scripts/audit-tab-response.mjs`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `platform-desktop-app/renderer/workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`
- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-05-no-slow-tab-switch/`
- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-no-slow-tab-switch-desktop.png`

## 검증

- `corepack pnpm --filter workspace-monitor test`: 37 tests 통과
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 723490 bytes
- CPU throttle 6 tab-response audit: active average 18.8ms, active p95 52.0ms, ready p95 240.3ms
- in-app Browser smoke: `overview/agents/desktop/source/tools` active/ready true, horizontal overflow false

## 커밋

- pending
