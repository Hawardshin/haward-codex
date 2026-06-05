# 2026-06-05 Local History Hook Componentization Web Search

## 검색

- `React official performance useMemo useCallback context splitting large components`
- `Next.js official lazy loading client components performance`
- `web.dev optimize long tasks INP local data parsing JSON performance`
- `Korean UX writing guidelines plain language Korean interface copy`

## 확인한 출처

- Next.js lazy loading 공식 문서: 초기 로드 JavaScript를 줄이기 위해 Client Component와 라이브러리 lazy loading을 사용할 수 있음을 확인했다.
- React `useMemo`/`useCallback` 공식 문서: memoization은 필요한 곳에 적용하는 성능 최적화이며, 불필요한 렌더/계산을 줄일 때 사용한다는 기준을 확인했다.
- web.dev long task/INP 문서: 큰 데이터 처리와 JavaScript 실행이 main thread long task가 되어 입력 반응성을 해칠 수 있음을 확인했다.

## 계획 영향

- `MonitorShell.tsx`에 계속 쌓인 관리자 기록 로딩/병합 로직을 별도 hook으로 분리한다.
- 로컬 generated resource인 `admin-history-index.json`은 모듈 캐시와 idle preload로 재사용한다.
- History 핵심 화면의 한국어 문구를 자연스럽게 정리한다.
