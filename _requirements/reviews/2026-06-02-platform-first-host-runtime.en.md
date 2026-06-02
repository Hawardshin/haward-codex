# Platform-First Host Runtime Requirement Review

## Review Result

- Status: accepted
- Reason: This strengthens the existing CLI-neutral direction into a clearer platform-first host runtime contract. It does not conflict with the optional CLI adapter direction started at `PDA-REQ-013`; it clarifies product runtime ownership.

## Checks

- The platform must open and show workspace/history/docs/dashboard without external CLIs.
- External CLIs must run only as guest adapter lanes.
- Task state, durable memory, decision inbox, artifacts, validation, and UI authority must be platform-owned.
- Public installer readiness remains gated by signing, notarization, smoke tests, privacy review, and dependency review.

## Validation Targets

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/tests/readiness.test.mjs`
