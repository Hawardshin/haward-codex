# Web Search Record: Multi-CLI Desktop Orchestration

## Search Goal

Verify current official sources for designing an installable desktop app that treats Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as optional adapters while using mature terminal, process, and code-editor components.

## Queries

- `Tauri macOS permissions shell sidecar pty terminal app official docs 2026`
- `Electron node-pty xterm.js monaco editor desktop app official docs`
- `Claude Code CLI official documentation terminal output hooks MCP 2026`
- `Google Gemini CLI official GitHub documentation 2026`
- `OpenCode AI CLI official documentation GitHub 2026`
- `OpenAI Codex CLI official GitHub documentation 2026`
- `xterm.js official documentation terminal emulator browser addon fit webgl`
- `Monaco Editor official documentation standalone editor Electron Tauri`
- `Zed Agent Client Protocol official documentation AI agent CLI integration`

## Sources Checked

| Source | Type | What Was Checked | Plan Impact |
| --- | --- | --- | --- |
| `https://code.claude.com/docs/en/overview` | official docs | Claude Code has terminal, IDE, desktop, web surfaces plus MCP/hooks/skills/multi-agent context. | Add Claude Code as an optional adapter candidate. |
| `https://github.com/google-gemini/gemini-cli` | official repo | Gemini CLI is a terminal-based open-source AI agent. | Add Gemini CLI as a concrete adapter candidate. |
| `https://github.com/openai/codex` | official repo | Codex CLI install/run commands and desktop app references. | Treat Codex CLI as an optional adapter. |
| `https://opencode.ai/docs/` | official docs | OpenCode documents terminal interface, desktop app, IDE extension, and provider-key setup. | Add OpenCode and record provider-key posture. |
| `https://v2.tauri.app/plugin/shell/` | official docs | Tauri shell plugin supports child-process spawning with scoped permissions. | Do not implement desktop command execution before permission/allowlist design. |
| `https://v2.tauri.app/develop/sidecar/` | official docs | Tauri sidecars support external binaries and Python CLI/API server patterns. | Keep supervisor/agent-platform service sidecar as a candidate only. |
| `https://xtermjs.org/docs/` | official docs | xterm.js terminal emulator docs and terminal sequence/addon surface. | Record xterm.js as terminal UI candidate. |
| `https://github.com/microsoft/node-pty` | official repo | node-pty is a pseudo-terminal process binding with security/permission caveats. | Record as Electron/Node supervisor candidate, not default Tauri choice. |
| `https://github.com/microsoft/monaco-editor` | official repo | Monaco is a browser-based editor from VS Code with model/URI/dispose/worker constraints. | Record as source editor candidate without installing yet. |
| `https://agentclientprotocol.com/get-started/introduction` | official docs | ACP standardizes editor/IDE and coding-agent communication; local agents can use JSON-RPC over stdio. | Keep as future editor-agent interoperability candidate. |

## Weak Sources Ignored

- Blog or promotional comparison posts were not used for this design.
- GitHub stars, issues, and reactions were treated only as adoption/discovery signals, not factual proof.

## Plan Impact

- Register the four AI CLIs as optional adapters, not required dependencies.
- Do not implement real multi-CLI execution before Tauri shell/sidecar/PTY permissions and lifecycle design exist.
- Prefer xterm.js as terminal UI candidate and Monaco as source editor candidate.
- Treat raw terminal output as non-durable until transformed into structured records with provenance, redaction, and validation.

## Uncertainty

- Detailed output contracts and question prompt patterns for each CLI require installed POCs.
- The Tauri interactive PTY implementation path needs separate coding research and dependency audit.
