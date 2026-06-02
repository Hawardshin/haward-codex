# Requirement Change: Desktop CLI Session / Source Editor MVP

## Change Summary

- `PDA-REQ-020`: add allowlisted CLI pipe session, stdin, defer, cancel, and human decision inbox persistence requirement.
- `PDA-REQ-021`: add workspace-scoped source file read/write and backup requirement.
- `PDA-UX-014`: add Desktop tab session console/source editor requirement.

## Reason

The user asked to continue implementing the missing parts after the health-check MVP. The next smallest implementation is dependency-free pipe sessions, human decision inbox persistence for deferred questions, and scoped file editing rather than full PTY.

## Verification Targets

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`
