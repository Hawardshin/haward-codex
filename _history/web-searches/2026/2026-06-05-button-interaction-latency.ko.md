# Web Search: Button Interaction Latency

## 질문

버튼 클릭 후 느려지는 현상을 근본적으로 줄이기 위해 React/Next UI에서 첫 응답 paint를 막는 long task와 불필요한 렌더링을 어떻게 다뤄야 하는지 확인한다.

## 검색어

- `React official docs performance optimizing re-render memo useCallback useMemo event handlers`
- `Next.js official docs optimizing performance client components dynamic imports lazy loading`
- `web.dev INP optimize long tasks event handlers official`

## 확인한 출처

- React docs, `memo`: https://react.dev/reference/react/memo
- React docs, Built-in React Hooks: https://react.dev/reference/react/hooks
- Next.js docs, Lazy Loading: https://en.nextjs.im/docs/13/pages/building-your-application/optimizing/lazy-loading
- web.dev, Optimize long tasks: https://web.dev/articles/optimize-long-tasks
- web.dev, Optimize Interaction to Next Paint: https://web.dev/articles/optimize-inp

## 약한 출처 제외

- 블로그와 Reddit 결과는 측정 우선, lazy loading, memoization 사용 관점에서 참고 신호로만 보고 구현 근거로 채택하지 않았다.

## 계획 영향

- 최적화는 모든 handler에 `useCallback`을 붙이는 방식이 아니라 실제 클릭 계측 후 느린 공통 마운트 경로를 줄이는 방식으로 진행했다.
- 첫 응답 paint를 막는 long task를 제거하기 위해 Desktop Runtime/Source heavy workbench mount와 native refresh를 staged shell 뒤로 분리했다.
- React memoization은 현재 컴포넌트 대분할 없이 효과가 제한적이므로, 이번 slice에서는 derived data gate와 staged render를 선택했다.

## 불확실성

- 정적 export headless audit는 브라우저/CPU throttle 조건의 비교 기준이다. Tauri native runtime 내부 command 지연은 별도 native profiling이 필요하다.
