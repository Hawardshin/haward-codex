# Installable App User Flow Requirements

## Scope

These requirements define first-run, home, task execution, decision inbox, settings, and recovery flows for making the installable agent platform easy to start and use repeatedly.

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| PDA-UX-001 | The installable app must provide `Open existing workspace`, `Create new workspace`, and `Try demo` paths during first run. | must | user-flow registry and onboarding docs |
| PDA-UX-002 | The app must clearly show which files, settings, and snapshots will be read or generated for the selected workspace. | must | first-run onboarding docs |
| PDA-UX-003 | The default user flow must reach the dashboard even when optional CLIs, notifications, browser automation, or advanced validators are not configured. | must | user-flow registry acceptance checks |
| PDA-UX-004 | `user`, `developer`, and `superadmin_developer` view modes must be selectable during first run and settings; user mode must hide complex internal tooling. | must | view mode registry linkage |
| PDA-UX-005 | Task execution must show current phase, elapsed time, active agents/subprocesses, produced files, evidence, user decisions, verification, and commit/push state. | must | task_run_flow review |
| PDA-UX-006 | User questions must be collected in a decision inbox, while independent work can continue. | must | decision_inbox_flow review |
| PDA-UX-007 | Recovery flows must cover unreadable workspace, missing optional CLI, pending user decision, stale snapshot, and update failure. | must | failure_recovery_flows review |
| PDA-UX-008 | Developer and superadmin modes should expose raw configs, validators, release gates, coordination, and source provenance. | should | developer_superadmin_flow review |

## Current State

- Status: baseline draft
- Actual desktop dependency installation: none
- Required before implementation: `platform-desktop-app/configs/user-flow-registry.json`
- Visual artifact: `platform-desktop-app/artifacts/user-flow-map.html`
