# Requirement Change: Multi-CLI Desktop Orchestration

## Change ID

- `REQ-CHANGE-2026-06-02-MULTI-CLI-DESKTOP-ORCHESTRATION`

## Background

The user wants an installable desktop app that can configure Claude Code, Gemini CLI, Codex CLI, and OpenCode without depending on any single CLI. They also want several CLIs to run together, CLI output and questions to be managed, unanswered user questions to be deferred into a decision inbox, and accumulated data to improve over time.

## Change

- Add `REQ-WS-085`.
- Treat the four AI CLIs as first optional adapter candidates.
- Require a platform supervisor, process graph, lane state, terminal I/O bounds, stdin policy, merge gates, and cleanup for multi-CLI execution.
- Route interactive CLI questions to the decision inbox while pausing only dependent lanes.
- Give terminal output a data contract for promotion into structured records, artifacts, decisions, validations, and reusable knowledge candidates.
- Prefer mature open-source editor surfaces such as Monaco Editor for code editing.

## Impact

- `agent-platform/configs/integrations/cli-adapter-registry.json`
- `platform-desktop-app/configs/desktop-distribution-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.en.md`
- `platform-desktop-app/specs/2026-06-02-multi-cli-orchestration-desktop/`

## Status

- Applied
