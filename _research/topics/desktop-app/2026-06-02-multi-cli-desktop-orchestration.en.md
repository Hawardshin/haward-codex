# Multi-CLI Desktop Orchestration Research Note

## Summary

Official sources support treating the four AI CLIs as optional adapter candidates on top of the platform. Their authentication, interactive prompt behavior, and output contracts differ, so adapter contracts must precede execution.

## Reusable Judgments

- Claude Code, Gemini CLI, Codex CLI, and OpenCode are execution providers, not required platform runtimes.
- Tauri shell plugin and sidecar docs support desktop-originated process execution and external-binary boundaries, but a full interactive PTY path needs a separate POC.
- xterm.js is a terminal UI candidate; Monaco Editor is a code-editing candidate. Neither should be installed before dependency audit.
- Agent Client Protocol is a future editor-agent interoperability candidate; the current priority is CLI supervision.

## Plan Impact

- Added concrete adapter candidates and an interactive contract to `cli-adapter-registry.json`.
- Added a multi-CLI architecture doc and spec to `platform-desktop-app`.
- Vector DB remains a candidate after measured retrieval bottlenecks, not the default.
