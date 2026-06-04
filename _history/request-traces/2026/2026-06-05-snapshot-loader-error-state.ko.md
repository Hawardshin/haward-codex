# 2026-06-05 Snapshot Loader Error State Trace

## Request

사용자가 버그 개선을 요청했다.

## Bug Found

- `SnapshotLoader`의 `catch` path가 fetch 실패를 `console.warn`으로만 처리하고 state를 바꾸지 않았다.
- 따라서 `workspace-snapshot.json` 404, network failure, timeout 상황에서 사용자는 error screen이 아니라 loading screen을 계속 보게 된다.

## Fix

- `timedOut` state와 `clearSnapshotTimeout` helper를 추가했다.
- fetch 실패 또는 timeout 시 `setState({ status: "error", snapshot: null, error })`를 호출하게 했다.
- `finally`와 cleanup에서 timeout을 정리하게 했다.
- `tests/snapshot-loader.test.mjs`를 추가해 error state transition, timeout message, timeout cleanup contract를 고정했다.

## Validation

- `corepack pnpm --filter workspace-monitor test`: passed, 18 tests
- `corepack pnpm --filter workspace-monitor check`: passed
- `corepack pnpm --filter platform-desktop-app test`: passed, 22 tests
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter workspace-monitor run perf:budget`: passed
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `corepack pnpm --filter platform-desktop-app run doctor -- --json`: passed
- `git diff --check`: passed
- Playwright static export 404 smoke: passed, `Snapshot unavailable` rendered with `Snapshot request failed with 404`

## Notes

- Browser plugin was not exposed by tool discovery in this session, so local Playwright headless was used as fallback.
- Generated snapshot JSON files remain unstaged build outputs.
