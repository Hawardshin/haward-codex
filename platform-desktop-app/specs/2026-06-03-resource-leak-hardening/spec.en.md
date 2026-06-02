# Spec: Runtime Resource Leak Hardening

## Status

- Status: `implemented`
- Date: 2026-06-03
- Owning project: `platform-desktop-app/`
- Shared UI: `workspace-monitor/`
- Requirement: `PDA-REQ-028`
- Source request: `UR-2026-06-03-019`

## Problem

The installable platform manages CLI child processes, stdout/stderr reader threads, active polling intervals, and snapshot fetches over long sessions. Without cleanup, finished sessions and asynchronous work can accumulate memory, process, thread, timer, and network resources.

## Behavior

- Rust CLI sessions record `finished_at` when they finish.
- Finished sessions are removed from the session store after 30 minutes or when retained finished sessions exceed 40.
- Session cleanup joins reader thread handles when they are joinable.
- Child process kill paths call `wait()` after `kill()` to reduce zombie process risk.
- `SnapshotLoader` aborts fetch work on unmount.
- The Desktop runtime panel checks a mounted ref before state updates from the initial async refresh.
- The existing active-session polling interval calls `clearInterval` in effect cleanup.

## Non-Goals

- Public updater implementation
- OS-level long-running daemon introduction
- Automatic external CLI installation
- Automated long soak testing
