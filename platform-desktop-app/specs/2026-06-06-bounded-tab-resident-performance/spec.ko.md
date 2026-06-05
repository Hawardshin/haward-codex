# 스펙: bounded tab resident 성능 보정

## 목표

이전 resident preload 변경이 hidden tab 전체를 React tree에 누적시켜 장기적으로 탭 전환과 상위 state update를 느리게 만들 수 있는 구조를 보정한다. native/RAM prewarm은 유지하되 top-level mounted section 수는 제한한다.

## 언어/런타임 선택

- 옵션 A: React renderer bounded resident + memo. 현재 병목은 hidden React tree update와 탭 전환 commit 비용이므로 선택.
- 옵션 B: Rust/Tauri cache만 확장. 파일 IO와 OS resource 활용에는 맞지만 React tree 비용을 직접 해결하지 못하므로 보조 수단으로 유지.
- 옵션 C: 전체 섹션 완전 lazy mount. hidden update 비용은 줄지만 source editor state 보존과 첫 진입 지연이 다시 커지므로 미선택.

## 아키텍처 선택

- 옵션 A: `residentSectionIds`를 bounded LRU 성격으로 바꾸고 `source`를 retained section으로 유지한다. 기존 Shell 책임과 맞고 변경 범위가 좁아 선택.
- 옵션 B: 모든 section을 별도 route/chunk로 분해한다. 장기적으로 가능하지만 현재 단일 monitor shell을 크게 찢어야 해서 이번 범위에서는 과하다.
- 옵션 C: 모든 section component를 memoized child로 추출한다. 효과는 있지만 1.4만 줄 Shell을 대규모 리팩터링해야 하므로 후속 구조 개선 후보로 둔다.

## 설계

- `maxResidentSectionPanels = 5`를 둔다.
- `retainedResidentSections = ["source"]`로 source/code editor 상태 보존을 우선한다.
- `normalizeResidentSectionIds()`는 active section, retained source, 최근 resident 후보를 dedupe하고 cap으로 자른다.
- `residentSectionMountPlan`과 모든 visible section을 idle callback으로 resident에 추가하는 effect는 제거한다.
- Monaco, AgentCollaborationScene, admin history index는 `requestIdleCallback` prewarm에 남긴다.
- Desktop/source runtime work surface는 `memo(DesktopRuntimePanel)`로 감싸고 inline callback을 stable callback으로 바꾼다.
- `audit-section-switch-latency.mjs`는 현재 visible section만 측정하고 resident/mounted panel cap과 settle p95를 검사한다.

## 수용 기준

- hidden mounted panel 수가 최대 5개를 넘지 않는다.
- 섹션 전환 Playwright 감사가 통과한다.
- workspace-monitor test/check/build가 통과한다.
- platform-desktop-app test/check와 `package:internal`이 통과한다.
- `.app`와 `.dmg` 내부 패키징 산출물이 생성되고 검증된다.

## 근거

- React memo: https://react.dev/reference/react/memo
- React Profiler: https://react.dev/reference/react/Profiler
- Next.js lazy loading: https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading
- MDN Background Tasks API: https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API
