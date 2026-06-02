# Plan: Desktop CLI Session / Source Editor MVP

## Work Mode

- Selected: `governance`
- Reason: This adds subprocess sessions, stdin, file writes, backups, source editing surface, and resource/CLI pipeline gates.

## Scope

- Add allowlisted CLI pipe session commands to the Tauri backend
- Implement session start/poll/stdin/defer/cancel
- Implement workspace-scoped text file read/write with backup
- Add session console and scoped source editor to the Workspace Monitor Desktop tab
- Update readiness/tests/spec/evaluation

## Non-Scope

- Rust/Tauri toolchain installation
- Shell plugin permission changes
- xterm.js, Monaco, or node-pty installation
- Autonomous source-affecting multi-CLI merge/release
- Public installer readiness

## Language Selection

- Options: Rust/Tauri command, Node sidecar, Python sidecar
- Selection: Rust/Tauri command
- Reason: It matches the current scaffold and can enforce process/file boundaries without adding dependencies.

## Architecture Selection

- Options: pipe session MVP, Tauri shell plugin, PTY sidecar
- Selection: pipe session MVP
- Reason: It implements real stdout/stderr/stdin/cancel while keeping PTY and shell permissions deferred until installation audit.

## Sequence

1. Run web-first intake and memory bootstrap.
2. Inspect the existing Desktop MVP source and spec.
3. Add Rust backend commands and helpers.
4. Add Workspace Monitor UI.
5. Update requirements/spec/history/evaluation.
6. Run tests/build/policy checks.
