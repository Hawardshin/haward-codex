# Requirement Change: Desktop CLI Supervisor MVP

## Change

- Added `PDA-REQ-018`: first real supervisor implementation must detect allowlisted AI CLIs and run stdin-free bounded health/version checks.
- Added `PDA-REQ-019`: Desktop UI must safely fall back in normal browsers without Tauri runtime.
- Added `PDA-UX-013`: Desktop tab must show runtime, CLI availability/version, health checks, decision prompts, and source-editing readiness.

## Reason

The user asked to proceed with actual implementation, so the multi-CLI contract needed to become a first executable MVP.

## Non-Scope

- interactive PTY/stdin supervisor
- dependency installation
- source-affecting CLI task execution
