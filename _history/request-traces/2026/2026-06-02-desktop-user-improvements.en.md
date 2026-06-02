# Request Trace: Desktop User Improvements

- Request ID: `UR-2026-06-02-050`
- Date: 2026-06-02
- Work mode: `governance`
- Owning projects: `platform-desktop-app`, `workspace-monitor`

## Request Summary

The user asked to find and implement improvements and user-facing features for the installable multi-CLI orchestration desktop app.

## Result

- Added per-CLI setup and verification guidance to the Workspace Monitor Desktop tab.
- Added `User Task`, `Platform Improvement`, `Knowledge Accumulation`, and `Review & Verify` mode presets to the CLI session launcher.
- Added Tauri commands to list and answer `_ops/coordination/human-decision-inbox.json`.
- Added a Desktop decision inbox UI so deferred human decisions can be selected and answered.
- Kept setup guidance non-automatic: the UI shows official sources and verification commands, but does not install tools by itself.

## Linked Requirements

- `PDA-REQ-022`: The installable desktop app should provide optional CLI setup guidance, work-mode presets, and deferred-decision answer controls.
- `PDA-UX-015`: Users should be able to handle CLI setup, work mode selection, and decision inbox answers in one Desktop flow.

## Primary Artifacts

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`
- `_history/web-searches/2026/2026-06-02-desktop-user-improvements.en.md`
- `_research/topics/desktop-app/2026-06-02-desktop-user-improvements.en.md`

## Verification

- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run build`
- `npm --prefix platform-desktop-app test`
- `npm --prefix platform-desktop-app run check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-omissions ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-omission-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-resources ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-resource-input.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-02-desktop-user-improvements-evaluation-input.json`

## Remaining Limits

- Rust/Cargo is not available in this environment, so Tauri `.app` compilation and real macOS signing/notarization verification were not performed.
- Real CLI authentication, PTY terminal handling, Monaco-level editing, and installer/update flows remain follow-up slices.
