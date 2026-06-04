# 웹 검색 기록: Tab transition performance

- 날짜: 2026-06-05
- 목적: 탭 전환 지연을 고치기 전 React/Next 공식 성능 기준을 확인한다.

## 검색어

- `React official performance useMemo memo useTransition rendering lists docs`
- `Next.js official optimizing performance React Server Components client components rendering docs`
- `React official Profiler measure rendering performance docs`
- `React official useMemo memo performance skip re-rendering docs`
- `Next.js official lazy loading Client Components libraries docs`

## 확인한 출처

- React, [useMemo](https://react.dev/reference/react/useMemo): 느린 렌더 계산이 검증된 경우 memoization으로 재계산과 불필요한 렌더 비용을 줄이는 기준을 확인했다.
- React, [memo](https://react.dev/reference/react/memo): props가 바뀌지 않은 컴포넌트의 재렌더를 건너뛰는 것이 성능 최적화라는 점과 실제 측정 필요성을 확인했다.
- React, [useTransition](https://react.dev/reference/react/useTransition): transition은 non-blocking 업데이트로 사용자 입력을 막지 않는 용도라는 점을 확인했고, 이번 탭 클릭처럼 즉시 콘텐츠 표시 시간이 목표인 경우 실제 측정으로 유지 여부를 판단했다.
- React, [Profiler](https://react.dev/reference/react/Profiler): 렌더 성능은 commit 측정으로 확인해야 한다는 방향을 확인했다.
- Next.js, [Lazy Loading](https://nextjs.org/docs/app/guides/lazy-loading): 사용자가 필요로 할 때까지 Client Component나 라이브러리 로딩을 미루는 원칙을 확인했다.
- Next.js, [Production checklist](https://nextjs.org/docs/app/guides/production-checklist): production 성능을 위해 bundle 분석, code splitting, lazy loading을 고려해야 한다는 기준을 확인했다.

## 무시한 약한 출처

- Reddit, 블로그, 비공식 성능 가이드는 병목 진단의 참고 신호로만 보고 구현 근거에서는 제외했다.
- Next.js mirror 문서는 공식 `nextjs.org` 원문으로 대체했다.

## 계획 영향

- memoization만으로 해결하지 않고 닫힌 보조 UI를 실제로 마운트하지 않는 구조로 바꾼다.
- `useTransition`은 사용자 입력을 막지 않는 목적에는 맞지만, 탭 클릭부터 주 콘텐츠 visible까지의 시간이 목표라서 제거 후 실측으로 판단한다.
- 검증은 bundle 예산뿐 아니라 CPU throttle 6의 탭 전환 시간, disclosure closed/open DOM mount, 모바일 overflow까지 포함한다.

## 불확실성

- 로컬 정적 export와 headless Chromium 측정은 사용자 실제 기기와 완전히 같지 않다.
- 절대 시간보다 같은 조건에서의 전후 비교와 heavy panel mount count를 주 근거로 둔다.

## 공개 결정 요약

- 닫힌 보조 기능군을 숨김 처리만 하지 않고 열릴 때만 렌더링한다.
- 탭 전환은 즉시 상태 갱신으로 처리하고, 검증된 값 기준으로 평균 전환 시간을 낮춘다.
