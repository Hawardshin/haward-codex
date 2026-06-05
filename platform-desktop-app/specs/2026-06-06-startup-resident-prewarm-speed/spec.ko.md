# 스펙: startup resident prewarm 속도 최적화

## 목표

bounded resident cap을 유지하면서 앱 시작 직후 자주 쓰는 핵심 탭을 유휴 시간에 미리 mount해 탭 전환의 worst-case 지연을 줄인다.

## 언어/런타임 선택

- 옵션 A: React renderer resident lifecycle + memo. 현재 병목은 탭 전환 시 React section mount/update 비용이므로 선택.
- 옵션 B: Rust/Tauri cache만 확장. OS resource 활용에는 맞지만 React component mount 비용을 직접 줄이지 못하므로 이번 변경의 주 수단으로는 부족하다.
- 옵션 C: 모든 탭을 startup에 즉시 mount. 첫 전환은 빨라질 수 있지만 startup blocking과 hidden rerender 비용이 커져 미선택.

## 아키텍처 선택

- 옵션 A: Shell 안의 bounded resident lifecycle에 startup idle prewarm을 추가한다. 기존 구조와 맞고 변경 범위가 작아 선택.
- 옵션 B: 각 섹션을 별도 route/chunk/state island로 분리한다. 장기적으로 더 낫지만 이번 속도 보정 범위를 넘는다.
- 옵션 C: 모든 section component를 별도 memo component로 분해한다. 효과 가능성은 있으나 1회 변경의 blast radius가 커서 Tool Studio부터 적용한다.

## 설계

- `startupResidentPreloadSections = ["agents", "desktop", "source", "tools", "overview"]`를 둔다.
- `residentStartupPreloadDoneRef`로 startup prewarm을 한 번만 실행한다.
- `requestIdleCallback(preloadResidentPanels, { timeout: 900 })`를 우선 사용하고, 미지원 환경은 `setTimeout(..., 240)`로 fallback한다.
- `normalizeResidentSectionIds([...preloadSections, ...current], section)`로 기존 cap을 통과시킨다.
- `nonRetainedResidentSections = ["overview"]`를 둬 overview가 active가 아닐 때 resident set에 오래 남지 않게 한다.
- `ToolStudioPanel`을 `MemoizedToolStudioPanel`로 감싸고, Shell에서 전달하는 section/provider 이동 callback을 `useCallback`으로 안정화한다.

## 수용 기준

- `perf:sections`가 통과하고 max resident/mounted panel count가 5 이하여야 한다.
- bounded resident baseline 대비 section switch p95가 개선되어야 한다.
- workspace-monitor test/check/build가 통과해야 한다.
- desktop app test/check와 `package:internal`이 통과해야 한다.
- `.app`와 `.dmg` 내부 패키징 산출물이 생성되고 검증되어야 한다.

## 근거

- React `memo`: https://react.dev/reference/react/memo
- React `<Profiler>`: https://react.dev/reference/react/Profiler
- Next.js Lazy Loading: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
- MDN Background Tasks API: https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API
