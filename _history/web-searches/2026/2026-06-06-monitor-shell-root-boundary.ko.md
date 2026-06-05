# 웹 검색 기록: MonitorShell 근본 boundary 재검토

## 목적

사용자가 “근본적인 부분부터 다시 살펴봐”라고 요청해, Workspace Monitor의 남은 성능 병목을 main thread, React render tree, lazy loading/code splitting 관점에서 재검토했다.

## 검색어

- `Tauri official documentation performance state commands async Rust desktop app best practices`
- `React official documentation performance memo Profiler startTransition useDeferredValue`
- `web.dev long tasks interaction to next paint optimize main thread performance official`
- `Next.js official documentation optimizing lazy loading dynamic imports bundle analyzer`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| React `memo`: https://react.dev/reference/react/memo | 공식 문서 | memoization은 props가 안정적인 expensive component에 적용해야 의미가 있다. | Tool Studio memo boundary는 유지하되 runtime import를 제거하고 stable props만 넘겼다. |
| React `<Profiler>`: https://react.dev/reference/react/Profiler | 공식 문서 | mount/update 비용을 실제 측정해야 한다. | `perf:sections`, `audit-tab-response.mjs`, chunk inspection을 검증 근거로 기록했다. |
| React `useDeferredValue`: https://react.dev/reference/react/useDeferredValue | 공식 문서 | 느린 하위 UI 업데이트를 지연하려면 memo boundary가 필요하다. | 남은 후속 병목을 section-level memo/component boundary로 분류했다. |
| Next.js Lazy Loading: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading | 공식 문서 | `dynamic()`은 top-level에 있어야 preload/code splitting이 가능하다. | `ToolStudioPanel`을 top-level dynamic component로 전환했다. |
| Next.js Bundle Analyzer: https://nextjs.org/docs/app/building-your-application/optimizing/bundle-analyzer | 공식 문서 | 큰 dependency/code chunk는 분석 후 split/lazy-load 대상으로 다뤄야 한다. | chunk 검색과 size inspection으로 Tool Studio 분리를 확인했다. |
| web.dev INP optimization: https://web.dev/articles/optimize-inp | 공식 문서 | 긴 main-thread task는 interaction response를 지연시킨다. | `MonitorShell.tsx`의 14k line monolith를 남은 핵심 long-task 위험으로 기록했다. |
| web.dev off-main-thread: https://web.dev/articles/off-main-thread | 공식 문서 | main thread 작업을 줄이면 INP responsiveness에 도움이 될 수 있다. | Rust/native cache만으로 부족하고 renderer code boundary도 필요하다고 판단했다. |

## 로컬 구조 조사

- `MonitorShell.tsx`: 14,191 lines.
- `ToolStudioPanel.tsx`: 1,607 lines.
- 기존 build에서는 Tool Studio 문자열이 Shell과 같은 큰 client chunk에 포함됐다.
- 변경 후 Tool Studio 문자열은 `0cbtc.g2b83vn.js`, `09yq_9dx5v2xh.js`, CSS chunk에 분리되어 나타났다.

## 공개 판단 요약

남은 근본 문제는 “탭은 많지만 code/runtime boundary는 거의 하나인 Shell monolith”다. 이번 변경은 전체 Shell 분해 전 가장 안전한 첫 단계로, 이미 별도 파일인 Tool Studio를 static import에서 dynamic import boundary로 빼고 idle prewarm에 연결했다.
