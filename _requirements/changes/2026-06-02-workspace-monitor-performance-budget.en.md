# Requirement Change: Workspace Monitor Performance Budget

## Change Summary

- Added `REQ-WM-016`.
- Purpose: prevent regressions where the large workspace snapshot is bundled into client JavaScript and slows initial loading.

## Added Requirement

- `REQ-WM-016`: The web UI shall not embed the large workspace snapshot directly in the client JavaScript bundle, and shall provide a regression check that keeps initial JavaScript chunks within the performance budget.

## Verification

- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- Static Playwright smoke
