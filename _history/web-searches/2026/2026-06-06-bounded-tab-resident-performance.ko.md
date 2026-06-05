# 웹 검색 기록: bounded tab resident 성능 보정

## 목적

Workspace Monitor 탭 전환이 여전히 느리다는 피드백에 대해 React/Next 성능 기준을 다시 확인하고, 이전의 무제한 resident 선마운트가 남기는 hidden tree 비용을 보정했다.

## 검색어

- `React official docs Profiler memo useMemo rendering performance hidden components state preservation`
- `Next.js official docs lazy loading dynamic imports client components performance`
- `MDN requestIdleCallback scheduling background tasks UI performance`
- `Tauri v2 official docs process app setup state Rust command performance`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| React `memo`: https://react.dev/reference/react/memo | 공식 문서 | interaction lag는 실제 render chain을 줄이고 필요한 컴포넌트에 memoization을 적용해야 한다. | hidden source/runtime panel에 `memo` 경계를 추가하고 stable callback을 전달했다. |
| React `<Profiler>`: https://react.dev/reference/react/Profiler | 공식 문서 | mount/update commit을 구분해 측정해야 한다. | 섹션 전환 settle time과 mounted panel count를 별도 Playwright 감사로 측정했다. |
| Next.js lazy loading: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading | 공식 문서 | `dynamic()`/`import()`는 top-level preload와 client-side lazy loading에 맞춰야 한다. | Monaco/3D는 top-level dynamic import와 idle prewarm을 유지하고, React tree 전체 선마운트는 줄였다. |
| MDN Background Tasks API: https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API | 공식 문서 | `requestIdleCallback`은 사용자 이벤트/화면 업데이트를 방해하지 않는 background task에 적합하다. | admin history data cache와 heavy module prewarm만 idle task로 유지했다. |

## 계획 영향

- 이전 구현의 `residentSectionMountPlan`은 결국 모든 visible section을 mounted React tree에 추가하므로, 시간이 지나면 숨겨진 탭 전체가 부모 렌더 비용에 들어온다.
- 이번 수정은 `source` 상태 보존은 유지하되, top-level mounted panel 수를 최대 5개로 제한한다.
- OS/RAM 활용은 Tauri startup Rust warmup과 source workspace cache, Monaco/3D/admin history idle prewarm으로 유지한다.

## 무시한 약한 출처

- Reddit/블로그 검색 결과는 현업 신호로만 참고했고 구현 근거로 사용하지 않았다.

## 공개 판단 요약

“모든 탭을 계속 마운트”는 클릭 시 mount 비용을 줄이지만, 큰 client component에서는 hidden tree update 비용을 키울 수 있다. 데스크톱 앱에서는 native cache와 module/data prewarm은 유지하되, React DOM resident는 bounded LRU로 제한하는 쪽이 더 안정적이다.
