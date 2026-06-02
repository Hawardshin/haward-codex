# 요청 추적: Workspace Monitor 성능 예산

## 요청

- ID: `UR-2026-06-02-052`
- 요약: 코드를 전체적으로 분석해 속도를 개선하고 빠른 속도를 유지해 달라는 요청.

## 결과

- 대용량 snapshot static import를 제거했다.
- `/workspace-snapshot.json` fetch 기반 `SnapshotLoader`를 추가했다.
- `MonitorShell`을 dynamic import로 로드한다.
- 검색 입력은 `useDeferredValue`를 사용한다.
- Source 탭이 아닐 때 source content 검색을 건너뛴다.
- `npm run perf:budget` 회귀 검사를 추가했다.

## 요구사항

- `REQ-WM-016`

## 산출물

- `workspace-monitor/components/SnapshotLoader.tsx`
- `workspace-monitor/scripts/check-performance-budget.mjs`
- `workspace-monitor/specs/2026-06-02-performance-budget/`
- `_research/topics/workspace-monitor/2026-06-02-performance-budget.ko.md`

## 검증

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- 정적 Playwright smoke
