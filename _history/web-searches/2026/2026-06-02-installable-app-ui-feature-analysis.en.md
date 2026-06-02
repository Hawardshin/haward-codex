# Web Search Record: Installable App UI and Feature Analysis

## Search Time

- Date: 2026-06-02
- Request: Analyze the UI and feature patterns of the previously identified installable app references.

## Queries

- `VS Code user interface terminal source control problems tasks official docs UI`
- `GitHub Desktop user interface changes history diff branch pull request official docs`
- `Docker Desktop dashboard integrated terminal extensions notification center official docs`
- `Raycast manual extensions snippets quicklinks AI extensions command palette official docs`
- `Warp agent platform terminal workflows sessions official docs UI`
- `Cursor docs agent mode chat composer rules MCP UI concepts official`
- `OpenCode desktop app multi-session LSP providers official docs UI`
- `Gemini CLI interactive commands resume MCP extensions memory official docs`
- `github google-gemini gemini-cli README official memory MCP resume commands`
- `github openai codex CLI README official docs local coding agent`
- `Tauri official docs distribute macOS signing notarization updater`
- `Electron official docs desktop app distribution auto updater macOS`
- `Monaco Editor official npm package xterm.js official docs`

## Main Sources Checked

- VS Code User Interface: https://code.visualstudio.com/docs/getstarted/userinterface
- VS Code Integrated Terminal: https://code.visualstudio.com/docs/terminal/getting-started
- VS Code Source Control: https://code.visualstudio.com/docs/sourcecontrol/overview
- VS Code Webviews UX Guidelines: https://code.visualstudio.com/api/ux-guidelines/webviews
- GitHub Desktop docs: https://docs.github.com/desktop
- Docker Desktop docs: https://docs.docker.com/desktop/use-desktop/
- Docker Extensions docs: https://docs.docker.com/extensions/
- Raycast Manual: https://manual.raycast.com/
- Warp Agent Platform docs: https://docs.warp.dev/agent-platform/
- Cursor docs: https://cursor.com/docs
- OpenCode official site: https://opencode.ai/
- Gemini CLI official repository: https://github.com/google-gemini/gemini-cli
- OpenAI Codex official repository: https://github.com/openai/codex
- Tauri distribution docs: https://v2.tauri.app/distribute/
- Electron docs: https://www.electronjs.org/docs/latest/
- xterm.js docs: https://xtermjs.org/docs/
- Monaco Editor package docs: https://www.npmjs.com/package/monaco-editor

## Source Ranking

- Primary: official docs, official repositories, and official product sites.
- Secondary: existing local architecture docs and user requirements.
- Excluded: general blogs, news, and community opinions were not used as direct evidence in this UI/feature analysis.

## Plan Impact

- VS Code contributes activity/workbench/terminal/source-control patterns, not a full editor clone target.
- GitHub Desktop grounds safe change review and diff/commit patterns.
- Docker Desktop grounds capability center, extension, troubleshooting, and health/recovery surfaces.
- Raycast grounds command palette and low-friction action routing.
- Warp, Cursor, and OpenCode ground agent lanes, sessions, checkpoints, and multi-provider orchestration.
- Gemini CLI and Codex CLI ground optional adapter contracts while preserving each CLI's resume, memory, and session differences.
- Tauri/Electron, xterm.js, and Monaco ground installable shell, terminal surface, and code editor surface choices without hand-rolling those primitives.

## Uncertainty

- AI product docs such as Cursor, Warp, and OpenCode change quickly. A screenshot-based hands-on benchmark should run again before freezing the UI.
- This task analyzed UI and feature patterns only. No package installation or UI implementation occurred.
