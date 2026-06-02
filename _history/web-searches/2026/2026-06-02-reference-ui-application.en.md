# Web Search Record: Reference UI Application Implementation

## Search Time

- Date: 2026-06-02
- Request: Apply all applicable reference patterns from the earlier reference analysis to the actual app.

## Queries

- `VS Code user interface command palette terminal source control official docs current`
- `Docker Desktop extensions marketplace integrated terminal official docs current`
- `Raycast extensions action panel snippets quicklinks official manual current`
- `GitHub Desktop diff changes history branch commit official docs current`
- `Warp Agent Platform docs terminal agent mode workflows sessions official current`
- `Cursor docs agent mode checkpoints terminal diff review rules memory current`
- `OpenCode docs multi session providers LSP terminal official current`
- `Gemini CLI docs MCP memory resume command official current`

## Main Sources Checked

- VS Code User Interface: https://code.visualstudio.com/docs/getstarted/userinterface
- Docker Desktop: https://docs.docker.com/desktop/use-desktop/
- Docker Extensions: https://docs.docker.com/extensions/
- Raycast Extensions: https://manual.raycast.com/extensions
- Raycast Snippets/Quicklinks: https://manual.raycast.com/snippets/how-to-import-snippets, https://manual.raycast.com/quicklinks/how-to-import-quicklinks
- GitHub Desktop change review: https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop
- Warp Agents: https://docs.warp.dev/agents
- Warp full terminal use: https://docs.warp.dev/agents/full-terminal-use
- Cursor Checkpoints: https://docs.cursor.com/en/agent/chat/checkpoints
- Cursor CLI: https://docs.cursor.com/en/cli/using
- Gemini CLI: https://github.com/google-gemini/gemini-cli

## Plan Impact

- VS Code/Raycast: add a `Command Palette` quick-action surface.
- Docker/Raycast: show CLI adapters as `Capability Center` cards with setup-later state.
- Warp/Cursor/OpenCode: show sessions as a `Run Board`, lane timeline, and process graph.
- Warp/VS Code: add a structured terminal event rail instead of relying only on raw output.
- GitHub Desktop/Cursor: add source diff summary and review gate.
- Cursor/HITL: group decision inbox items by session/source and show replay metadata.
- Knowledge/promotion requirement: add an evidence/promotion surface.

## Weak Sources

- Reddit and general blogs were not used as direct implementation evidence.
- Official docs plus local specs and requirements were used as the implementation basis.

## Uncertainty

- xterm.js, Monaco, and PTY remain deferred until the existing installation-audit gate.
- This implementation applies UI/information-architecture patterns on top of the current React/Next/Tauri command contract without adding dependencies.
