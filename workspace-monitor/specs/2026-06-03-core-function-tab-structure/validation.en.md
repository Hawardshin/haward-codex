# Validation: Core Function Tab Structure

## Commands

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `npm --prefix platform-desktop-app run monitor:build`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`

## Results

- `npm --prefix workspace-monitor test`: passed, 16 tests.
- `npm --prefix workspace-monitor run check`: passed.
- `npm --prefix workspace-monitor run build`: passed, developer snapshot with 1200 documents.
- `npm --prefix workspace-monitor run perf:budget`: passed, largest initial chunk 227537 bytes.
- `npm --prefix workspace-monitor run check:intent-map`: passed, developer intent map has 155 intents / 12 themes.
- `npm --prefix platform-desktop-app run monitor:build`: passed, customer bundle audit ready.
- `npm --prefix workspace-monitor run check:intent-map:customer`: passed, customer intent map redacted to 0.
- `npm --prefix platform-desktop-app run check`: passed, internal service ready with existing public blockers retained.
- `npm --prefix platform-desktop-app test`: passed, 13 tests.
- `npm --prefix workspace-monitor run collect`: passed, tracked snapshot restored to the developer public snapshot.
- Static export DOM/CSS smoke: `core-feature-rail`, `section-tab-groups`, `Core Functions`, and responsive core feature CSS are present in the built output.
- Playwright availability check: Playwright is not installed in the current workspace.
- `git diff --check`: passed.
- `check-omissions`: `coverage_ready`.
- `evaluate-work`: `ready_to_close`.

## Manual Review Points

- The top `core-feature-rail` makes core function locations visible first.
- `section-tab-groups` groups sections by functional area.
- Mobile CSS keeps tab labels visible and switches to a one-column layout.
