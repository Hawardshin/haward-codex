# Codex/Claude Desktop Reference Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| REQ-PDA-072 | The desktop app shall track Codex app and Claude Desktop as explicit official references and shall not regress into a CLI wrapper or web dashboard. | must | `reference-platform-advantage-registry.json`, readiness |
| REQ-PDA-073 | Agent run chats shall behave as Codex app-style thread workbenches where the chat composer, bottom terminal, files/diff, artifacts, decisions, and validation belong to the same work unit. | must | `codex-style-thread-workbench`, user-flow token |
| REQ-PDA-074 | Local tools, MCP servers, desktop extensions, and guest CLI adapters shall follow a Claude Desktop-style connector-first UX: manage them in a settings tab and show connection state around the chat composer. | must | `claude-desktop-connector-first-chat`, user-flow token |
| REQ-PDA-075 | Codex/Claude Desktop transfer patterns shall keep the public-source-only boundary and fail readiness/tests when omitted. | must | `check-readiness.mjs`, `readiness.test.mjs` |

## Decision

- Transfer only public, official desktop work patterns and connector flows from Codex app and Claude Desktop; do not copy brand identity or proprietary UI.
- Codex CLI and Claude Code CLI remain optional guest adapters. The platform app launches first and owns task state and accumulated data.
- Claude Desktop's desktop extension/MCP flow becomes the baseline for future `Settings > Capabilities` and agent work chat connector-chip implementation.
