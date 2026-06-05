# Local History Hook Componentization Plan

## 결정

| 옵션 | 장점 | 단점 | 결정 |
| --- | --- | --- | --- |
| `MonitorShell.tsx` 안에서 memo만 추가 | 작다 | 유지보수 부채가 계속 쌓인다 | 기각 |
| History 화면 전체를 새 컴포넌트로 분리 | 더 크고 명확하다 | 현재 turn에서 회귀 범위가 크다 | 보류 |
| 관리자 기록 로딩/병합 hook부터 분리 | 성능과 구조 부채를 동시에 줄이고 위험이 낮다 | 전체 componentization은 남는다 | 선택 |

## 실행

1. `components/history/useAdminHistoryIndex.ts`를 만든다.
2. hook이 local `admin-history-index.json` fetch, module cache, idle preload, document merge, day grouping, status copy를 소유한다.
3. `MonitorShell.tsx`에서 해당 상태/effect/helper를 제거하고 hook 결과만 사용한다.
4. History 화면의 한국어 지표와 상태 문구를 자연스럽게 바꾼다.
5. 테스트와 payload/build 검증을 실행한다.
