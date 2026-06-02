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
| PDA-UX-009 | Task preflight shall show Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as selectable CLI lanes with availability, version, auth, permission, and setup-later status. | must | `ai_cli_orchestration_flow` review |
| PDA-UX-010 | The run screen shall show terminal output for multiple CLI lanes while converting durable state into task events, artifacts, decisions, and validation records. | must | run timeline and data accumulation contract |
| PDA-UX-011 | When a CLI asks a user question, the decision inbox handoff screen shall show the question, impact, default assumption, blocked lane, lanes that can continue, and resume action. | must | decision inbox flow and human decision inbox |
| PDA-UX-012 | The source editing screen should prefer a validated editor surface such as Monaco Editor and center user mode on safe file scope plus change review. | should | source editor prototype acceptance |
| PDA-UX-013 | The Desktop tab must show Tauri runtime connection state, CLI adapter availability/version, bounded health-check results, detected CLI questions, and source-editing readiness in one surface. | must | workspace-monitor Desktop tab |
| PDA-UX-014 | The Desktop tab shall provide a pipe-based CLI session console and scoped source editor so the user can start, poll, write stdin, defer, cancel, see decision inbox item counts, open files, and see backup save status in one surface. | must | workspace-monitor Desktop tab, TypeScript check |
| PDA-UX-015 | The Desktop tab shall show CLI setup guides, work-mode presets, deferred decision lists, answer type/text controls, and saved answer state in the same working surface. | must | workspace-monitor Desktop tab, Tauri decision commands |
| PDA-UX-016 | The Desktop tab shall distinguish answer-only from answer-and-resume actions for decisions linked to an active CLI session, and show the linked session id/status plus resume result. | must | workspace-monitor Desktop tab, Tauri answer-and-resume command |
| PDA-UX-017 | The Desktop tab shall apply selected VS Code, Raycast, Docker, GitHub Desktop, Warp, and Cursor reference patterns as quick actions, capability cards, run board, process graph, terminal event rail, grouped decisions, replay, diff review, and evidence/promotion information in a dense work surface. | must | workspace-monitor Desktop tab, build, readiness/test |
| PDA-UX-018 | The Desktop tab source-editing surface shall let users keep multiple files open as drafts and perform search/direct path open, dirty file queue review, diff preview, current save, save all, revert, close, and backup-result inspection in one screen. | must | workspace-monitor Desktop tab, visual QA, readiness/test |
| PDA-UX-019 | First run and the Desktop tab shall make clear that the user starts the platform first, then adds external AI CLIs as guest lanes. A missing CLI shall appear as setup-later/capability_missing for that lane, not as platform failure. | must | user-flow registry, Workspace Monitor Desktop tab, readiness/test |

## Current State

- Status: baseline draft
- Actual desktop dependency installation: none
- Required before implementation: `platform-desktop-app/configs/user-flow-registry.json`
- Visual artifact: `platform-desktop-app/artifacts/user-flow-map.html`
