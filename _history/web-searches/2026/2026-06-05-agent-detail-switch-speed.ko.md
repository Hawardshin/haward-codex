# 웹 검색 기록: Agent Detail Switch Speed

## 질의

- `web.dev Interaction to Next Paint optimize JavaScript long tasks official`
- `React official useTransition performance keep UI responsive documentation`
- `React official memo useMemo performance documentation`
- `Next.js official dynamic import lazy loading client components performance`

## 확인한 출처

- web.dev, Interaction to Next Paint: https://web.dev/articles/inp
- web.dev, Optimize long tasks: https://web.dev/articles/optimize-long-tasks
- React, `useTransition`: https://react.dev/reference/react/useTransition
- React, `memo`: https://react.dev/reference/react/memo
- Next.js, Lazy loading: https://nextjs.org/docs/app/guides/lazy-loading

## 계획 영향

- 클릭 응답은 입력 직후 첫 paint가 막히지 않도록 long task와 heavy render를 분리해야 한다.
- 기존 코드에 이미 존재하는 `scheduleAfterFirstPaint`를 재사용해 선택 버튼 상태와 무거운 active workspace 렌더 commit을 분리한다.
- 새 dependency 설치보다 현재 React 상태 구조를 좁게 바꾸는 것이 이번 slice의 위험과 검증 비용이 낮다.

## 불확실성

- 실제 사용자 장비별 GPU/WebGL 비용은 다르므로, 이번 검증은 static export smoke와 기존 perf budget을 최소 기준으로 삼는다.
