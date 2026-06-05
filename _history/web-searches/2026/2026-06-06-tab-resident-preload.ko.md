# 웹 검색 기록: 탭 상주 선마운트 최적화

## 목적

React 탭 전환에서 state preservation, conditional rendering, memoization, idle/lazy loading, CSS rendering containment 선택지를 확인했다.

## 검색어

- `React official docs memo useMemo useTransition performance rendering hidden tabs`
- `React official docs preserving and resetting state component tree hidden tabs`
- `MDN content-visibility CSS rendering performance official`
- `React official docs lazy suspense code splitting performance`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| React Preserving and Resetting State: https://react.dev/learn/preserving-and-resetting-state | 공식 문서 | component tree 위치와 mount/unmount가 state 보존에 미치는 영향 | source editor뿐 아니라 주요 탭 전체를 mounted tree로 유지 |
| React `useMemo`: https://react.dev/reference/react/useMemo | 공식 문서 | expensive calculation caching과 render 비용 절감 경로 | resident mount plan과 derived sets를 memoized state로 유지 |
| React `lazy`: https://react.dev/reference/react/lazy | 공식 문서 | code splitting은 bundle load 지연에 유용하지만 mount 비용 자체는 남음 | import prewarm은 유지하되 resident tree를 추가 |
| MDN `contain`: https://developer.mozilla.org/en-US/docs/Web/CSS/contain | 공식 문서 | layout/paint/style containment로 렌더링 영향 범위 제한 | hidden resident panel에 `contain: layout paint style` 추가 |
| MDN `content-visibility`: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility | 공식 문서 | offscreen rendering skip 옵션 확인 | 접근성/hidden state와 충돌을 피하려 이번 구현은 `hidden`과 containment를 사용 |

## 계획 영향

- 탭 클릭 시 조건부 mount를 반복하는 구조를 줄이고, idle 시간에 주요 탭을 resident로 올리는 방향을 선택했다.
- 모든 탭을 즉시 한 번에 마운트하지 않고 idle callback으로 나눠 초기 CPU spike를 완화한다.
- 숨김 탭은 `hidden`/`aria-hidden`으로 접근성 트리에서 제외하고 state만 유지한다.

## 불확실성

- 실제 체감 성능은 사용자의 워크스페이스 크기, 브라우저 엔진 상태, native snapshot 크기에 따라 달라진다.
- 이 변경 후에도 특정 탭 내부 effect가 활성 여부와 무관하게 무거우면 별도 `surfaceActive` gate가 더 필요하다.
