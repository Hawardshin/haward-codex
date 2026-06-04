# 2026-06-05 Safe Section Location Trace

## Request

사용자가 버그를 찾아 개선하라고 요청했다.

## Bug Found

- Workspace Monitor initial section parsing used direct `decodeURIComponent` on URL hash.
- Malformed percent encoding in a hash such as `#section-%` could throw and break the location synchronization path.

## Fix

- Added `lib/section-location.mjs` with `readInitialSectionFromParts` and `normalizeInitialSection`.
- Added safe decode fallback so malformed percent encoding returns the raw value instead of throwing.
- Updated `SnapshotLoader` to call the shared parser.
- Added `lib/section-location.d.mts` so TypeScript can import the `.mjs` helper.
- Added `tests/section-location.test.mjs` for normal hash/query behavior and malformed hash handling.

## Validation

- `corepack pnpm --filter workspace-monitor test`: passed, 20 tests
- `corepack pnpm --filter workspace-monitor check`: passed
- `corepack pnpm --filter platform-desktop-app test`: passed, 22 tests
- `corepack pnpm --filter workspace-monitor run build:customer`: passed
- `corepack pnpm --filter workspace-monitor run perf:budget`: passed
- Playwright static export malformed hash smoke: passed, no page errors
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: passed
- `corepack pnpm --filter platform-desktop-app run check`: passed
- `corepack pnpm --filter platform-desktop-app run doctor -- --json`: passed
- `git diff --check`: passed

## Notes

- Generated snapshot JSON files remain unstaged build outputs.
