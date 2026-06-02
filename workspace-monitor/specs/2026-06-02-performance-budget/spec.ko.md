# 스펙: Workspace Monitor 성능 예산

## 목표

Workspace Monitor의 초기 로드가 대용량 repository snapshot 때문에 느려지지 않도록, snapshot 데이터와 client UI 코드를 분리하고 build 후 JavaScript chunk 예산을 검증한다.

## 요구사항

- `REQ-WM-016`

## 동작

- `app/page.tsx`는 대용량 snapshot을 정적으로 import하지 않고 `SnapshotLoader`만 렌더링한다.
- `SnapshotLoader`는 `/workspace-snapshot.json`을 fetch하고, snapshot이 준비되면 `MonitorShell`을 dynamic import로 로드한다.
- `MonitorShell`은 검색어를 `useDeferredValue`로 처리하고, Source 탭이 아닐 때 source content 검색을 수행하지 않는다.
- `scripts/check-performance-budget.mjs`는 build output의 JavaScript chunk 크기와 snapshot static import 회귀를 검사한다.

## 수용 기준

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- 정적 서버 + Playwright smoke에서 `/workspace-snapshot.json` fetch 후 주요 화면이 렌더링된다.

## 제외 범위

- snapshot JSON 자체의 압축/분할 저장
- 서버 API, DB, 실시간 streaming
- React component 전체 분해 리팩터링
