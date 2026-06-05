# 요청 추적: Cute Mascot Character

## 요청

- 캐릭터가 너무 현실적이지 않고 귀여운 동물 느낌을 갖도록 개선.

## 결과

- `REQ-WM-073` 추가.
- Agents `AgentCharacter`에 ear, inner ear, muzzle, cheek, tail detail 추가.
- Tool Studio Three.js character map에도 같은 soft mascot geometry 추가.
- static tests와 desktop/mobile screenshot QA 갱신.

## 검증

- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor exec tsc --noEmit`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- Playwright static export desktop/mobile smoke
