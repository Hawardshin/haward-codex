# Requirements Review: Mode and Function Switchboard

## Review Result

- Status: `accepted`
- Requirement: `REQ-WM-019`
- Scope: `workspace-monitor` user-facing monitor UI and snapshot schema

## Judgment

- The requirement does not replace the existing view/language/work/install/CLI adapter registries; it adds an explicit selection surface users can find.
- Work/install modes belong to task/setup procedures, so not persisting them as browser state is appropriate.
- CLI adapters remain optional guest capabilities, so the switchboard should not auto-install or require them.

## Acceptance Criteria

- Snapshot catalog, Overview UI, readiness checks, and build validation must be connected.
