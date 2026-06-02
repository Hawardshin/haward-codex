# Multi-CLI Orchestration Desktop Spec

## Goal

Define the product contract for an installable desktop app that can configure Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as optional capabilities, supervise multiple CLIs, and manage questions, decisions, output, source editing, and data accumulation as platform state.

## Requirements

- `REQ-WS-085`
- `PDA-REQ-013` - `PDA-REQ-024`
- `PDA-UX-009` - `PDA-UX-017`

## Scope

- Concrete AI CLI adapter candidates in `cli-adapter-registry.json`
- AI CLI orchestration flow in `user-flow-registry.json`
- Multi-CLI supervisor release gate in `desktop-distribution-registry.json`
- Project-local architecture document
- Readiness/test reinforcement for the new documents
- Tauri backend allowlisted CLI detection and bounded health/version checks
- Workspace Monitor Desktop tab and browser fallback
- Tauri backend pipe-based CLI session start/poll/stdin/defer/cancel commands and human decision inbox append on defer
- Tauri backend human decision inbox list/answer commands
- Tauri backend linked active CLI session answer-and-resume command
- Tauri backend workspace-scoped source file read/write with backup
- Workspace Monitor CLI setup guide, work-mode presets, decision inbox answer UI, CLI session console, and scoped source editor
- Workspace Monitor command palette, capability center cards, run board, process graph, terminal event rail, grouped decision inbox, decision replay, source diff review, and evidence/promotion surface

## Non-Scope

- Interactive PTY execution and autonomous source-affecting long-running task release
- Installing Rust/Tauri, xterm.js, Monaco, or PTY dependencies
- Managing provider authentication
- Creating public installers or claiming release readiness

## Functional Contract

- The four CLIs are optional adapters; missing tools return `capability_missing` and disable only that lane.
- The first supervisor MVP runs allowlisted CLI PATH detection and stdin-free bounded version checks.
- The second supervisor MVP provides pipe-based session start, poll, stdin, defer, and cancel for allowlisted CLIs without adding the shell plugin, and stores detected questions in `_ops/coordination/human-decision-inbox.json` when deferring.
- Users can see per-CLI setup hints and verification commands, create session prompts from work-mode presets, and save answers to deferred decision items from the Desktop tab.
- A deferred decision with session metadata sends the saved answer to the linked active CLI session stdin and refreshes the session report only after the user explicitly chooses answer-and-resume.
- The Desktop tab shows quick action commands, capability status, lane timeline, process graph, structured terminal events, grouped decisions, replay metadata, source diffs, and evidence/promotion candidates as the applied reference UI layer.
- Autonomous source-affecting long-running multi-CLI execution will be implemented in the next supervisor stage with process graphs and merge gates.
- CLI questions route to the decision inbox and pause only dependent lanes.
- Terminal output separates bounded/redacted raw logs from structured durable records.
- Source editing starts with a textarea-based scoped editor and backup save; mature open-source editor surfaces such as Monaco Editor are added after dependency audit.
- Data accumulation defaults to file-system indexes and structured records; vector DB comes only after measured retrieval bottlenecks.

## Acceptance Criteria

- JSON configs pass syntax and self-documenting config contract checks.
- Desktop readiness tests check the multi-CLI architecture doc and orchestration registry fields.
- The `workspace-monitor` Desktop tab shows CLI adapter state and health-check results when Tauri runtime exists, and an unavailable fallback in browser-only environments.
- The `workspace-monitor` Desktop tab shows a CLI session console and scoped source editor.
- The `workspace-monitor` Desktop tab shows CLI setup guides, work-mode presets, and human decision inbox list/answer UI.
- The `workspace-monitor` Desktop tab distinguishes `Answer` from `Answer & Resume` for decisions linked to an active CLI session and displays the resume result.
- The `workspace-monitor` Desktop tab includes `Command Palette`, `Capability Center`, `Run Board`, process graph, terminal event, decision replay, `Source Review`, `Evidence / Promotion`, and the related UI state.
- Tauri file commands block `_private/`, `outputs/`, paths outside the workspace, and symlink escapes, and create backups before writes.
- Requirements, specs, and traceability link the new capability.
- Evaluation records distinguish the current bounded health/session/file-edit implementation from later PTY supervisor resource and CLI-pipeline risks.
