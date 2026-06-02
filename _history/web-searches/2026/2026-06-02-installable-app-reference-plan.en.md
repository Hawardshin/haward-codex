# Web Search Record: Installable App References and Implementation Plan

## Search Time

- Date: 2026-06-02
- Request: Find references from other installable apps and derive implementation plans and new ideas.

## Queries

- `VS Code integrated terminal tasks extensions official docs`
- `Cursor AI code editor features docs command palette agents`
- `Warp terminal agentic development AI terminal docs workflows`
- `Raycast extensions quicklinks snippets AI official docs`
- `VS Code integrated terminal official documentation shell integration tasks problems`
- `Visual Studio Code extension API webviews tree view terminal official docs`
- `Docker Desktop extensions dashboard official docs`
- `GitHub Desktop features official docs app repository history changes`
- `Tauri v2 macOS bundle updater code signing notarization official docs`
- `Electron autoUpdater code signing macOS notarization official docs`
- `Monaco Editor official docs integrate editor npm`
- `xterm.js addon fit serialize web links official docs`
- `Claude Code hooks slash commands subagents memory MCP official docs`
- `Gemini CLI official docs GitHub Google AI command line agent`
- `OpenCode AI coding agent official docs terminal`
- `Codex CLI official docs OpenAI GitHub`

## Main Sources Checked

- VS Code Terminal docs: https://code.visualstudio.com/docs/terminal/getting-started
- VS Code Shell Integration docs: https://code.visualstudio.com/docs/terminal/shell-integration
- VS Code Webviews UX docs: https://code.visualstudio.com/api/ux-guidelines/webviews
- GitHub Desktop docs: https://docs.github.com/desktop
- Docker Desktop docs: https://docs.docker.com/desktop/use-desktop/
- Docker Extensions docs: https://docs.docker.com/extensions/
- Warp Agent Platform docs: https://docs.warp.dev/agent-platform/
- Cursor docs: https://cursor.com/docs
- Gemini CLI README/docs: https://github.com/google-gemini/gemini-cli
- OpenCode official site: https://opencode.ai/
- OpenAI Codex GitHub repo: https://github.com/openai/codex
- Tauri distribution docs: https://v2.tauri.app/distribute/
- Tauri updater docs: https://v2.tauri.app/plugin/updater/
- Electron code signing docs: https://www.electronjs.org/docs/latest/tutorial/code-signing
- Electron autoUpdater docs: https://www.electronjs.org/docs/latest/api/auto-updater
- xterm.js docs: https://xtermjs.org/docs/
- Monaco Editor npm/GitHub docs: https://www.npmjs.com/package/monaco-editor

## Plan Impact

- Keep the Tauri-first implementation direction because official Tauri docs make platform-specific installers, signing, and macOS notarization explicit.
- Use VS Code and Docker Desktop as references for integrated terminals, shell/session persistence, extension surfaces, and in-app docs/search patterns.
- Use GitHub Desktop as a reference for safe visual repository changes, history, branches, and PR flows.
- Use Warp, Cursor, and OpenCode as references for agent lanes, sessions, multi-agent orchestration, and terminal-first agent UX.
- Use Raycast as a reference for command palette, extension/action, and quick-command interaction rather than setup-heavy workflows.
- Keep Monaco and xterm.js as open-source surfaces to integrate instead of building editor/terminal UI from scratch.

## Weak Source Handling

- Reddit, general blogs, and news articles were used only as idea and user-signal inputs.
- Official docs, official GitHub repos, and project official sites were prioritized as implementation evidence.

## Uncertainty

- Cursor and some agent products update dynamically, so competitive feature details should be rechecked later through UI/screenshots before design freeze.
- Rust/Tauri toolchain is not installed yet, so real `.app` packaging validation is outside this research slice.
