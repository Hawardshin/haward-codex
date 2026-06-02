# Plan: Reference UI Application Implementation

## Work Mode

- Selected: `governance`
- Reason: The work changes installable desktop app requirements, specs, readiness tests, and Workspace Monitor UI.

## Application Scope

- `Command Palette`: VS Code/Raycast-style quick-action surface.
- `Capability Center`: Docker/Raycast-style capability cards and setup-later state.
- `Run Board`: Warp/Cursor/OpenCode-style lane status, timeline, and process graph.
- `Terminal Event Rail`: structured event candidates separated from raw output.
- `Decision Grouping/Replay`: decision inbox grouped by session/source with answer/resume metadata.
- `Source Review`: GitHub Desktop/Cursor-style diff summary and backup save gate.
- `Evidence / Promotion`: output events, decisions, source diffs, and artifacts surfaced as reusable candidates.

## Non-Scope

- xterm.js installation
- Monaco Editor installation
- PTY or shell plugin addition
- Provider credential storage
- Public installer readiness claims

## Verification

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run perf:budget`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- Playwright desktop/mobile screenshot smoke
- naming/structure audit, JSON validation, `git diff --check`
