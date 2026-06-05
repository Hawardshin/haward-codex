# 요청 추적: Character Design Refinement

## 요청

- 캐릭터 디자인을 더 좋게 개선.
- 귀여운 레퍼런스 캐릭터 방향을 반영.

## 결과

- `REQ-WM-073`의 세부 acceptance를 확장했다.
- Agents `AgentCharacter`에 작은 점눈, 작은 코, 더 낮은 muzzle, 둥근 귀/손발/꼬리, 통통한 몸통 비율, 축소된 visor/chest panel을 적용했다.
- Tool Studio Three.js character map에도 같은 geometry 기준을 적용했다.
- static tests와 desktop/mobile screenshot QA를 갱신했다.

## 검증

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter workspace-monitor run build:customer`
- In-app Browser load smoke
- Playwright static export desktop/mobile smoke
- `git diff --check`
