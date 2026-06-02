# Multi-CLI Orchestration Desktop Spec

## Goal

Define the product contract for an installable desktop app that can configure Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as optional capabilities, supervise multiple CLIs, and manage questions, decisions, output, source editing, and data accumulation as platform state.

## Requirements

- `REQ-WS-085`
- `PDA-REQ-013` - `PDA-REQ-019`
- `PDA-UX-009` - `PDA-UX-013`

## Scope

- Concrete AI CLI adapter candidates in `cli-adapter-registry.json`
- AI CLI orchestration flow in `user-flow-registry.json`
- Multi-CLI supervisor release gate in `desktop-distribution-registry.json`
- Project-local architecture document
- Readiness/test reinforcement for the new documents
- Tauri backend allowlisted CLI detection and bounded health/version checks
- Workspace Monitor Desktop tab and browser fallback

## Non-Scope

- Interactive PTY execution, stdin writes, and long-running task execution
- Installing Rust/Tauri, xterm.js, Monaco, or PTY dependencies
- Managing provider authentication
- Creating public installers or claiming release readiness

## Functional Contract

- The four CLIs are optional adapters; missing tools return `capability_missing` and disable only that lane.
- The first supervisor MVP runs only allowlisted CLI PATH detection and stdin-free bounded version checks.
- Long-running multi-CLI execution will be implemented in the next supervisor stage with process graphs and merge gates.
- CLI questions route to the decision inbox and pause only dependent lanes.
- Terminal output separates bounded/redacted raw logs from structured durable records.
- Source editing first evaluates mature open-source editor surfaces such as Monaco Editor.
- Data accumulation defaults to file-system indexes and structured records; vector DB comes only after measured retrieval bottlenecks.

## Acceptance Criteria

- JSON configs pass syntax and self-documenting config contract checks.
- Desktop readiness tests check the multi-CLI architecture doc and orchestration registry fields.
- The `workspace-monitor` Desktop tab shows CLI adapter state and health-check results when Tauri runtime exists, and an unavailable fallback in browser-only environments.
- Requirements, specs, and traceability link the new capability.
- Evaluation records distinguish the current bounded health-check implementation from later interactive supervisor resource and CLI-pipeline risks.
