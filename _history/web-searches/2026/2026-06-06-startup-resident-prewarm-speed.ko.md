# 웹 검색 기록: startup resident prewarm 속도 최적화

## 목적

Workspace Monitor 탭 전환이 아직 느리다는 피드백에 대해, React tree 상주 수를 다시 늘리지 않으면서 시작 직후 핵심 탭을 미리 준비하는 구현 근거를 공식 문서로 확인했다.

## 검색어

- `site:react.dev/reference/react memo React official docs performance memo`
- `site:react.dev/reference/react/Profiler React official docs performance`
- `site:nextjs.org/docs lazy loading dynamic import Next.js official docs`
- `site:developer.mozilla.org requestIdleCallback background tasks MDN`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| React `memo`: https://react.dev/reference/react/memo | 공식 문서 | `memo`는 props가 안정적인 비싼 component의 불필요한 rerender를 줄이는 최적화 수단이다. | Tool Studio panel을 memoized component로 감싸고 open callback들을 `useCallback`으로 안정화했다. |
| React `<Profiler>`: https://react.dev/reference/react/Profiler | 공식 문서 | React render/update 비용은 측정 가능한 단위로 분리해야 한다. | `perf:sections`의 settle time, resident count, mounted panel count를 이번 변경의 acceptance로 사용했다. |
| Next.js Lazy Loading: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading | 공식 문서 | 필요한 client component/library를 지연 로드하고 preload 가능한 위치에 두는 방식이 권장된다. | Monaco/3D/admin history prewarm은 유지하되, React section tree 전체 무제한 상주는 피했다. |
| MDN Background Tasks API: https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API | 공식 문서 | `requestIdleCallback`은 사용자 입력을 막지 않는 background work 예약에 맞다. | 시작 직후 핵심 resident tab prewarm을 idle callback/timeout fallback으로 예약했다. |

## 계획 영향

- 기존 bounded resident cap은 유지해야 한다.
- 핵심 탭의 첫 전환 mount 비용은 시작 직후 유휴 시간에 미리 지불하되, `overview`처럼 무겁고 상태 보존 우선순위가 낮은 탭은 비활성 상태로 계속 붙잡지 않는다.
- memoization은 stable props와 함께 적용해야 효과가 있으므로 Tool Studio 진입 callback들을 stable callback으로 분리한다.

## 무시한 약한 출처

- 일반 블로그와 커뮤니티 글은 구현 근거로 쓰지 않았다.

## 공개 판단 요약

전체 탭을 다시 무제한 resident로 되돌리면 장기 메모리와 hidden rerender 비용이 커진다. 이번에는 bounded resident cap을 유지하면서 app startup idle 시간에 자주 쓰는 핵심 섹션만 미리 mount하고, 비활성 overview는 resident retention에서 제외하는 방식이 더 적절하다.
