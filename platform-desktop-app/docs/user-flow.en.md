# Installable App User Flow

## Purpose

This document defines how `platform-desktop-app` should become an installable product that is easy to start, understand, and operate.

The core standards are:

- After installation, the first screen must make the next action obvious.
- Required setup and optional integrations must be separated.
- One unanswered choice must not block unrelated work.
- User, developer, and superadmin developer views must be separated.
- Every task should show progress, bottlenecks, artifacts, evidence, and evaluation.

The source of truth is `platform-desktop-app/configs/user-flow-registry.json`.

## User Segments

| Segment | Default View | Needs | Hidden By Default |
| --- | --- | --- | --- |
| Task user | `user` | Open workspace, view projects/history, start work, answer questions, review results | Raw configs, validation internals, installer logs |
| Platform builder | `developer` | Edit specs/prompts/configs, run validators, inspect provenance, manage local changes | Real secrets, external account sessions |
| Superadmin developer | `superadmin_developer` | See all projects, agents, settings, validation, release gates, bottlenecks | Nothing by default |

## First Value After Install

The first-run goal is not full configuration. It is reaching a workspace dashboard.

The first screen should prioritize:

1. Open existing workspace
2. Create new workspace
3. Try demo workspace
4. Open developer setup

Slack, Discord, Teams, external CLIs, advanced validators, and browser automation must not block initial use. Missing optional capabilities become setup cards and disable only that capability.

## First-Run Flow

```text
Launch app
  -> open / create / demo workspace
  -> confirm path and data boundary
  -> select view mode
  -> run required readiness scan
  -> create optional capability status cards
  -> arrive at dashboard
```

Required readiness checks include workspace readability, core platform files, and snapshot generation. Optional checks include CLI adapters, notification channels, browser automation, and advanced validators.

## Home Structure

| Area | User | Developer | Superadmin | Contents |
| --- | --- | --- | --- | --- |
| Now | visible | visible | visible | Active tasks, blocked decisions, recent outputs, timing bottlenecks |
| Projects | visible | visible | visible | Root projects, requirements, specs, history |
| Run | visible | visible | visible | Task start, work mode, output type, notification |
| History | visible | visible | visible | Request summaries, traces, evaluations, web search records |
| Capabilities | hidden | visible | visible | Agents, CLIs, notifications, source code, validators, install state |
| Superadmin | hidden | hidden | visible | Raw configs, source code, policies, coordination, release gates |

## Task Run Flow

Minimum inputs:

- Goal
- Target project or workspace
- Desired output

Optional inputs:

- Work depth
- Notification channel
- Work mode
- Preferred tools

During execution, the app should show a timeline instead of a terminal-only stream:

- Current phase
- Elapsed time by phase
- Active agents and subprocesses
- Produced files
- Pending user decisions
- Verification results
- Commit and push state

## Questions And Bottlenecks

When the AI needs a user answer, it should not stop every lane. The question goes to the decision inbox, while independent work continues.

A question record should include:

- Task ID
- Question
- Impact
- Default assumption
- Deadline
- Work that can continue before the answer

When the user answers later, the blocked task resumes from saved context.

## Developer And Superadmin Flow

Developer and superadmin views should expose:

- View mode, work mode, and install mode comparison
- Raw registries and config files
- Read source code from key projects and tools
- Validator execution
- Source provenance and hallucination guard results
- Memory bootstrap anchors
- Coordination board and decision inbox
- Tauri, Electron, and native packaging comparison
- Signing, updater, uninstall, privacy, and license release gates

This is hidden from user mode for complexity control, not as a security boundary.

## Recovery

| Situation | Recovery |
| --- | --- |
| Workspace unreadable | Choose another folder, open permission help, use demo mode |
| Optional CLI missing | Show setup guide, disable that capability, continue |
| Waiting for user decision | Record in decision inbox, continue independent work |
| Snapshot stale | Refresh, show last generated time, continue with warning |
| Update failed | Keep current version, retry, open manual download |

## MVP Screens

1. Workspace chooser
2. Workspace home
3. Guided task start
4. Run timeline
5. Decision inbox
6. History and outputs
7. Settings and capabilities
8. Superadmin console

## Acceptance

- Users can distinguish installable app usage from repository developer setup.
- First run supports open, create, and demo workspace paths.
- Missing optional capabilities do not block core dashboard and history use.
- Task runs show phase, timing, evidence, artifacts, user decisions, and verification state.
- User mode stays simple, while developer and superadmin modes expose internal tooling.
