# 검증: 탭 전환 무지연 계약

## 수행 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 37 tests
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 723490 bytes
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor exec node scripts/audit-tab-response.mjs http://127.0.0.1:3347/#section-overview`: 통과
- in-app Browser smoke: `overview/agents/desktop/source/tools` active/ready true, horizontal overflow false

## 탭 응답 측정

- 기준: 정적 export, viewport 1280x820, CPU throttle 6, pointerdown부터 측정
- active-response 평균: 18.8ms
- active-response p95: 52.0ms
- body-ready 평균: 139.4ms
- body-ready p95: 240.3ms
- 섹션별 결과:
  - `agents`: active 52.0ms, ready 240.3ms, transition shell true
  - `desktop`: active 7.6ms, ready 149.1ms, transition shell true
  - `source`: active 6.9ms, ready 82.6ms, transition shell true
  - `tools`: active 13.7ms, ready 116.5ms, transition shell true
  - `overview`: active 13.6ms, ready 108.5ms, transition shell true

## 스크린샷

- `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-no-slow-tab-switch-desktop.png`

## 합격 기준

- active 탭과 `data-active-section`은 heavy section body mount 이전에 갱신된다: 통과.
- 전환 중 `data-section-transition-shell`이 먼저 렌더링된다: 통과.
- heavy section body는 `data-section-content-ready="true"` 이후에만 mount된다: 통과.
- Source 검색 query는 Source section body 준비 전 빈 문자열로 유지된다: 정적 테스트 통과.
- CPU throttle 6에서 대표 탭 active-response p95가 60ms 이하이다: 52.0ms로 통과.
