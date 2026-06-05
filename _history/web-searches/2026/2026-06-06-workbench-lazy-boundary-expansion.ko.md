# 웹 검색 기록: Workbench lazy boundary 확장

## 목적

사용자의 “그것들 다” 요청을 이전 root-boundary 후속 작업으로 해석하고, React/Next renderer code splitting, main-thread responsiveness, long task 완화 기준을 다시 확인했다.

## 검색어

- `React official docs lazy memo Profiler startTransition performance`
- `Next.js official docs dynamic import lazy loading client components`
- `web.dev optimize long tasks main thread responsiveness`
- `web.dev off main thread JavaScript worker INP`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| React `lazy`: https://react.dev/reference/react/lazy | 공식 문서 | component code loading을 지연할 수 있다. | heavy panels를 dynamic module boundary로 분리했다. |
| React `memo`: https://react.dev/reference/react/memo | 공식 문서 | props가 안정적인 expensive child render 방지에 유효하다. | 분리된 panel에 명시적 props boundary를 유지했다. |
| React `<Profiler>`: https://react.dev/reference/react/Profiler | 공식 문서 | mount/update 비용은 측정으로 확인해야 한다. | `perf:sections`와 `perf:buttons`를 close-out gate로 사용했다. |
| React `startTransition`: https://react.dev/reference/react/startTransition | 공식 문서 | non-blocking UI update 분리에 쓰인다. | 즉시 feedback과 heavy work 분리 원칙을 버튼 감사에 반영했다. |
| Next.js lazy loading: https://nextjs.org/docs/app/guides/lazy-loading | 공식 문서 | `next/dynamic` 기반 client component lazy loading을 제공한다. | `MonitorShell.tsx` top-level dynamic boundaries를 추가했다. |
| web.dev optimize long tasks: https://web.dev/articles/optimize-long-tasks | 공식 문서 | 긴 main-thread task를 나누면 responsiveness가 개선된다. | prewarm imports를 한 번에 실행하지 않고 90ms 간격으로 분산했다. |
| web.dev off-main-thread: https://web.dev/articles/off-main-thread | 공식 문서 | main thread 작업을 줄이면 responsiveness 개선에 도움이 된다. | Rust/native cache만으로 충분하지 않아 renderer boundary를 확대했다. |
| web.dev optimize INP: https://web.dev/articles/optimize-inp | 공식 문서 | interaction 응답 지연은 사용자 체감 성능의 핵심이다. | 실제 탭 click feedback p95와 synthetic press feedback을 측정했다. |

## 공개 판단 요약

데스크톱 OS/Rust 자원 활용은 유지해야 하지만, 현재 체감 지연의 큰 축은 renderer client module boundary 부족이다. 따라서 이번 후속 slice는 Rust 추가가 아니라 `MonitorShell.tsx`의 heavy panel static imports를 lazy chunks로 이동하고, idle prewarm을 분산하는 방향으로 결정했다.
