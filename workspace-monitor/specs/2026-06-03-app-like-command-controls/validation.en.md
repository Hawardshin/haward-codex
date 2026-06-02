# Validation: App-Like Command Controls

## Commands

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix platform-desktop-app run monitor:build`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `npm --prefix platform-desktop-app run check`
- `npm --prefix platform-desktop-app test`
- static export smoke
- `git diff --check`

## Results

- `npm --prefix workspace-monitor test`: passed, 16 tests.
- `npm --prefix workspace-monitor run check`: passed.
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-03-app-like-command-controls-resource-input.json`: `resource_ready`.
- `npm --prefix platform-desktop-app test`: passed, 13 tests.
- `npm --prefix workspace-monitor run build`: passed, developer snapshot with 1200 documents.
- `npm --prefix workspace-monitor run perf:budget`: passed, largest initial chunk 227537 bytes.
- `npm --prefix workspace-monitor run check:intent-map`: passed, developer intent map has 155 intents / 12 themes.
- Static export smoke: `app-control-bar`, `command-palette`, and `workspace-monitor:pinned-sections` are present in built JS/CSS.
- Playwright availability check: Playwright is not installed in the current workspace.
- `npm --prefix platform-desktop-app run monitor:build`: passed, customer bundle audit ready.
- `npm --prefix workspace-monitor run check:intent-map:customer`: passed, customer intent map redacted to 0.
- `npm --prefix platform-desktop-app run check`: passed, internal service ready with existing public blockers retained.
- `npm --prefix workspace-monitor run collect`: passed, tracked snapshot restored to the developer public snapshot.
- `git diff --check`: passed.
- `check-omissions`: `coverage_ready`.
- `evaluate-work`: `ready_to_close`.
