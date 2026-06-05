# 요청 추적: Agent Identity Labels

## 요청

- 캐릭터 디자인에서 어떤 에이전트인지 쉽게 알 수 있게 한다.
- 캐릭터를 더 작은 크기로 조정한다.

## 결과

- `REQ-WM-074` 추가.
- Agents 3D character scale을 active `0.86`, idle `0.78`로 축소했다.
- desktop에는 code + compact name label을 추가했다.
- mobile에는 28px code chip과 code/name identity strip을 추가했다.
- Tool Studio character map은 scale `0.82`와 mode legend를 추가했다.

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
