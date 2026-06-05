# 웹 검색 기록: Monitor 성능 가드레일 완성

## 검색 시각

2026-06-06

## 질의

- `Next.js official docs dynamic import lazy loading client components`
- `React official docs Profiler startTransition useDeferredValue memo performance`
- `web.dev optimize long tasks Interaction to Next Paint INP main thread JavaScript`
- `Google SRE book controlled rollout large scale change risk validation`

## 확인한 강한 출처

- Next.js Lazy Loading: https://nextjs.org/docs/app/guides/lazy-loading
- React `useTransition`: https://react.dev/reference/react/useTransition
- React `useDeferredValue`: https://react.dev/reference/react/useDeferredValue
- React `memo`: https://react.dev/reference/react/memo
- web.dev Optimize long tasks: https://web.dev/articles/optimize-long-tasks
- web.dev Optimize INP: https://web.dev/articles/optimize-inp

## 계획 반영

- heavy UI surface는 lazy boundary와 preload contract를 함께 가져야 한다.
- 단순 bundle budget만으로는 탭 전환 체감 지연을 충분히 잡지 못하므로 browser long-task telemetry를 section switch audit에 추가했다.
- 반복 실행 가능한 regression gate가 수동 DevTools 프로파일링보다 현재 repo 운영에 더 적합하다고 판단했다.

## 불확실성

- Chromium headless의 long task 관찰은 Tauri WebView와 완전히 같지 않다. 실제 앱 runtime telemetry는 별도 slice에서 확장해야 한다.
