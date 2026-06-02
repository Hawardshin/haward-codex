# Multi-CLI Orchestration Desktop Spec

## Goal

Define the product contract for an installable desktop app that can configure Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as optional capabilities, supervise multiple CLIs, and manage questions, decisions, output, source editing, and data accumulation as platform state.

## Requirements

- `REQ-WS-085`
- `PDA-REQ-013` - `PDA-REQ-017`
- `PDA-UX-009` - `PDA-UX-012`

## Scope

- Concrete AI CLI adapter candidates in `cli-adapter-registry.json`
- AI CLI orchestration flow in `user-flow-registry.json`
- Multi-CLI supervisor release gate in `desktop-distribution-registry.json`
- Project-local architecture document
- Readiness/test reinforcement for the new documents

## Non-Scope

- Actually running Claude/Gemini/Codex/OpenCode
- Installing Rust/Tauri, xterm.js, Monaco, or PTY dependencies
- Managing provider authentication
- Creating public installers or claiming release readiness

## Functional Contract

- The four CLIs are optional adapters; missing tools return `capability_missing` and disable only that lane.
- Multi-CLI execution is not implemented until a supervisor with process graph and merge gates exists.
- CLI questions route to the decision inbox and pause only dependent lanes.
- Terminal output separates bounded/redacted raw logs from structured durable records.
- Source editing first evaluates mature open-source editor surfaces such as Monaco Editor.
- Data accumulation defaults to file-system indexes and structured records; vector DB comes only after measured retrieval bottlenecks.

## Acceptance Criteria

- JSON configs pass syntax and self-documenting config contract checks.
- Desktop readiness tests check the multi-CLI architecture doc and orchestration registry fields.
- Requirements, specs, and traceability link the new capability.
- Evaluation records capture resource and CLI-pipeline risk as design risks before implementation.
