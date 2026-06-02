# Plan: Desktop User Improvements

## Work Mode

- Selected: `governance`
- Reason: This adds desktop user flow, CLI setup guidance, and human decision inbox state-changing commands.

## Improvement Candidates

- CLI setup assistant
- Work-mode session prompt presets
- Human decision inbox list/answer UI
- Provider auth status checks
- Stronger PTY/xterm.js/Monaco working surface

## Selected Slice

- Selected: setup guide, mode preset, decision inbox list/answer
- Excluded: auto-install, provider auth storage, PTY/xterm.js/Monaco installation
- Reason: This reduces user friction without dependency installation and closes the loop from “defer and store” to “return and answer.”

## Touch Paths

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/docs/requirements/`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`
- `_history/`, `_requirements/`, `_research/`

## Verification

- TypeScript check
- Workspace Monitor tests/build
- Platform desktop readiness/tests
- Omission/resource/grounding/evaluation close-out
- Rust/Tauri compile excluded because Rust toolchain is not installed
