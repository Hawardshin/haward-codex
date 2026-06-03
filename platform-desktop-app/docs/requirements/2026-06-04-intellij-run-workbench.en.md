# IntelliJ-Style Run Workbench Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-089 | The `Orchestration` screen must provide a Run Configuration area for starting the search agent, a CLI session, a multi-CLI pipe, and readiness checks before the user has to scroll through long dashboard panels. | must | `intellij-run-workbench-panel`, `ide-run-config-list`, action wiring |
| REQ-PDA-090 | Run Configuration buttons must be wired to real behavior: search agent work chat, CLI session start, task pipe initialization, and readiness checks. | must | `startDefaultSearchAgent`, `startSession`, `initTaskPipe`, `runAllHealthChecks` |
| REQ-PDA-091 | The run screen must show runtime, workspace, CLI adapters, provider accounts, and active sessions in a Services-style tool window. | must | `ide-services-window`, `ideServiceRows` |
| REQ-PDA-092 | The run screen must show runtime gaps, missing adapters, missing provider setup, decision inbox items, dirty drafts, and release blockers in an actionable Problems area. | must | `ide-problems-strip`, `visibleIdeProblems` |
| REQ-PDA-093 | The run screen must include a compact status bar for runtime, CLI, model, sessions, inbox, and terminal state, and it must remain theme-token based in dark and light modes. | must | `ide-status-bar`, token-based CSS |
| REQ-PDA-094 | On narrow screens, the tool-window rail, run configurations, Services, and Problems regions must collapse without broken text or unusable buttons. | must | responsive CSS, renderer check, browser smoke |

## Decisions

- This change transfers IntelliJ-style product patterns rather than copying IntelliJ UI assets.
- The top of `Orchestration` is the place to start work and resolve blockers.
- Quick Start and detailed panels stay available, but the first execution surface becomes an IDE-style run workbench.
