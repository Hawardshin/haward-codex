# 2026-06-05 Bug Hunt Stale Customer Snapshot Trace

## Request

사용자가 버그 찾기를 요청했다.

## Bug Found

- 일반 `workspace-monitor build` 뒤에 `public/workspace-snapshot.json`과 `out/workspace-snapshot.json`이 developer snapshot 상태로 남으면, `platform-desktop-app check`와 `desktop-doctor`가 hard failure를 냈다.
- 이 상태는 pre-build/readiness 관점에서는 `src/generated/customer-workspace-snapshot.json` fallback이 clean이면 경고로 충분하다.
- 반대로 실제 package payload를 감사하는 strict `customer-bundle:audit`는 계속 실패해야 한다.

## Fix

- `auditCustomerSnapshotWithFallback`을 추가했다.
- `runCustomerBundleAudit`에 `allowStaleGeneratedSnapshots` 옵션과 `staleSnapshots`/`fallbackSnapshot` report fields를 추가했다.
- `platform-desktop-app check`와 `desktop-doctor`가 pre-build context에서 stale generated output을 warning으로 다루게 했다.
- strict `customer-bundle:audit`는 옵션을 쓰지 않으므로 stale public/out snapshot을 계속 실패로 처리한다.
- customer bundle unit test에 fallback downgrade 회귀 테스트를 추가했다.

## Validation

- `corepack pnpm --filter workspace-monitor build`: reproduced stale public/out generated output after developer build.
- strict/prebuild assertion: strict audit failed stale output with 74 failures; prebuild audit had 0 failures and stale warnings.
- `corepack pnpm --filter platform-desktop-app run doctor -- --json` after stale output: passed with warning, 0 failures.
- `corepack pnpm --filter workspace-monitor run build:customer`: restored customer-safe public/out output.
- `corepack pnpm --filter platform-desktop-app test`: passed, 22 tests.
- `corepack pnpm --filter workspace-monitor test`: passed, 17 tests.
- `corepack pnpm --filter workspace-monitor check`: passed.
- `corepack pnpm --filter workspace-monitor run perf:budget`: passed.
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: passed, 0 warnings.
- `corepack pnpm --filter platform-desktop-app run check`: passed.
- `corepack pnpm --filter platform-desktop-app run doctor -- --json`: passed, 18 passed, 1 expected public-release warning, 0 failures.
- `corepack pnpm --filter platform-desktop-app run pipeline:dry-run`: passed.

## Notes

- Generated snapshot JSON files remain unstaged build outputs.
- The initial simultaneous `build`/`build:customer` run showed Next's build lock, so follow-up build validations were run serially for overlapping generated outputs.
