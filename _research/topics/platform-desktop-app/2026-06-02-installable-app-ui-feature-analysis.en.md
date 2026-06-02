# UI/Feature Analysis: Installable Multi-Agent App References

## Key Sources Checked

- VS Code UI, terminal, source control, and webview docs: https://code.visualstudio.com/docs/getstarted/userinterface, https://code.visualstudio.com/docs/terminal/getting-started, https://code.visualstudio.com/docs/sourcecontrol/overview, https://code.visualstudio.com/api/ux-guidelines/webviews
- GitHub Desktop docs: https://docs.github.com/desktop
- Docker Desktop and Docker Extensions docs: https://docs.docker.com/desktop/use-desktop/, https://docs.docker.com/extensions/
- Raycast Manual, Store, and AI docs: https://manual.raycast.com/
- Warp Agent Platform docs: https://docs.warp.dev/agent-platform/
- Cursor docs: https://cursor.com/docs
- OpenCode official site: https://opencode.ai/
- Gemini CLI official repository: https://github.com/google-gemini/gemini-cli
- Codex CLI official repository: https://github.com/openai/codex
- Tauri and Electron distribution docs: https://v2.tauri.app/distribute/, https://www.electronjs.org/docs/latest/
- xterm.js and Monaco Editor docs: https://xtermjs.org/docs/, https://www.npmjs.com/package/monaco-editor

## Analysis Conclusion

The product should borrow selectively from VS Code, GitHub Desktop, Docker Desktop, Raycast, Warp, Cursor, and OpenCode. Its identity should not be a code editor, terminal, Git GUI, launcher, or CLI wrapper. It should be an **installable AI work operating system** that manages execution and judgment.

Core UI principles:

- Before execution, show workspace scope, capability status, and risky permissions.
- During execution, show agent lanes, terminal output, pending decisions, elapsed time, and artifacts.
- After execution, separate diff, evidence, validation, commit/revert, and reusable knowledge candidates.
- When a CLI asks a question or blocks, pause only that lane and route the question to the decision inbox.
- Let users start quickly through a command palette, while preserving important decisions and execution results as durable records.

## Reference-by-Reference UI and Feature Analysis

| Reference | UI Structure | Core Features | Adopt for This App | Cautions |
| --- | --- | --- | --- | --- |
| VS Code | Activity bar, sidebar, editor grid, bottom panel, status bar, command palette | Integrated terminal, shell integration, tasks/problems, source control, extensions, webviews | Left navigation, central workbench, terminal lane, command palette, event extraction | Do not become a VS Code clone; avoid unnecessary webviews |
| GitHub Desktop | Repository selector, branch bar, Changes/History tabs, file list, diff view, commit panel | Change review, branch switching, commits, PR/sync, visual confirmation | Route agent source changes through diff/review/branch/worktree gates | Do not expose dangerous reset/rewrite flows too easily |
| Docker Desktop | Resource navigation, dashboard, quick search, integrated terminal, extension marketplace, notifications, troubleshooting | Resource management, extensions, docs/search, health/recovery | Capability center, CLI adapter marketplace, recovery cards, in-app docs | AI tasks are more abstract than containers; timeline/evidence matter more |
| Raycast | Root search, command list, action panel, store, extension settings, AI `@` mentions | Quicklinks, snippets, extensions, AI extensions, action routing | Global command palette, task recipe launcher, prompt/workflow/snippet catalog | Fast actions must not bypass durable trace and validation |
| Warp | Terminal-first workbench, agent mode, terminal buffer attach, workflow/session management | Agents read PTY output and act inside interactive processes | xterm.js lane, attach/resume, command blocks, output event extraction | Active shell writes require allowlists, confirmations, and bounds |
| Cursor | VS Code-like editor plus agent sidepane, chat tabs, checkpoints, diff, terminal integration, rules, memory, context | Multi-file edits, terminal commands, diff review, checkpoints, rules, codebase indexing | Monaco editor, agent mode presets, checkpoints, diff apply/reject, project rules/context packs | Editor-first identity would weaken the multi-CLI platform identity |
| OpenCode | Terminal/IDE/desktop surfaces, multi-session, provider flexibility, LSP direction | Multiple sessions, provider/model selection, local/remote model connectivity | Vendor-neutral multi-session supervisor and provider/capability selection | Do not let the app own provider credentials or billing |
| Gemini CLI | TUI/CLI with interactive, non-interactive, pipe, resume, MCP, extensions, memory/context files | `gemini -p`, pipe, session resume, `/memory reload`, `/mcp reload` | Standardize prompt, pipe, resume, extension, and memory reload capabilities in adapter contracts | Do not hide every CLI-specific command behind a fake universal command |
| Codex CLI | Local terminal coding agent with repo-aware execution | Coding tasks, shell/file workflows, optional adapter | Treat Codex as a strong default adapter, not the product identity | Avoid Codex-specific UX lock-in |
| Tauri/Electron | App shell, packaging, updater, signing/notarization | Installer, OS integration, update, native boundary | Keep Tauri-first, release gates, updater gates | Do not claim public readiness before signed/notarized builds |
| xterm.js/Monaco | Embeddable terminal/editor libraries | Terminal rendering, code editing, language support | Adopt as terminal/editor surfaces instead of hand-rolling | Requires install audit, lifecycle cleanup, worker disposal, accessibility |

## Feature-Area Analysis

### 1. App Shell and Navigation

References: VS Code, Docker Desktop, GitHub Desktop

Recommended structure:

- Left rail: `Home`, `Runs`, `Agents`, `Decisions`, `Source`, `Knowledge`, `Capabilities`, `Settings`
- Top bar: current workspace, global command palette, view mode, sync/build/health status
- Central workbench: selected task/run/source/diff/detail
- Right inspector: evidence, validation, selected lane, source provenance
- Bottom/embedded panel: terminal lanes, logs, problems, output events

### 2. First Run and Setup

References: Docker Desktop, GitHub Desktop, Raycast

Needed features:

- Workspace chooser with explicit read/write scope
- Privacy scope preview
- Capability cards for Claude Code, Gemini CLI, Codex CLI, and OpenCode
- Setup-later behavior for missing CLIs
- Useful read-only dashboard without any CLI configured

### 3. Command Palette and Quick Actions

References: Raycast, VS Code

Needed features:

- Search and run actions such as `Run task`, `Open decision inbox`, `Check CLI adapters`, `Search workspace`, `Create task recipe`, and `Promote learning`
- Every action has command id, required capability, risk level, and output target
- Palette execution still creates durable run records

### 4. Agent Run Board

References: Warp, Cursor, OpenCode

Needed features:

- Per-lane adapter, cwd, status, PID/session id, elapsed time, output bytes, last event
- Process graph for fan-out, fan-in, dependencies, and merge gates
- Timeline events for start, command sent, output event, question detected, decision deferred, artifact created, validation passed/failed
- Controls for pause, cancel, answer, resume, export, and promote

### 5. Terminal Lane

References: VS Code terminal, Docker Desktop terminal, Warp full terminal use

Needed features:

- xterm.js rendering
- Parser for questions, errors, warnings, file paths, test summaries, prompt waiting, and command completion
- Output bounds and scrollback retention
- Input modes: read-only, confirm-each-write, trusted-workflow auto-write
- Interactive PTY only after separate POC

### 6. Decision Inbox

References: Raycast action panel, Cursor checkpoints, existing human decision inbox

Needed features:

- Question records with source lane, prompt text, blocked decision, impact, default/defer option, resume action
- Grouped decisions by task/run/source file
- Answer modes: direct answer, choose option, defer again, cancel lane, resume with answer
- Decision replay showing how answers were injected back into sessions

### 7. Source Editor and Diff Review

References: Cursor, GitHub Desktop, VS Code

Needed features:

- Monaco scoped editor
- GitHub Desktop-style file list plus diff view
- Agent change sets with modified/generated/deleted files and risk labels
- Backup/checkpoint before save/apply
- Validation command linkage
- Review actions: accept file, reject file, apply patch, open external editor, commit

### 8. Capability Marketplace

References: Docker Extensions, Raycast Store, VS Code Extensions

Needed features:

- CLI adapters: Codex, Claude Code, Gemini CLI, OpenCode
- Tools: GitHub CLI, package managers, deployment CLIs, browser tools
- Prompts, workflows, skills, validators
- Capability cards: status, install source, verification command, permissions, risk, docs link, last check
- Separation between private/local catalog and future public marketplace

### 9. Evidence Panel

References: Cursor checkpoints/export, GitHub diff, Docker logs/troubleshooting

Needed features:

- claim -> source -> command output -> file diff -> validation result
- unsupported-claim warnings
- artifact provenance
- run summary export
- knowledge promotion candidates

### 10. Knowledge and Memory Map

References: Raycast snippets/quicklinks, Cursor rules/memories, Gemini memory/context files

Needed features:

- reusable prompts, task recipes, workflows, skills, validators
- graph of requirements, specs, history, decisions, artifacts, and source files
- promotion inbox for repeated work, good prompts, validation failures, and omission-prevention candidates
- vector DB only after measured need; start with filesystem index plus structured JSON/Markdown

## Recommended Screen Information Architecture

| Screen | User Question | Main UI |
| --- | --- | --- |
| Home | What can I do and what is blocked? | active runs, decision inbox, capability health, recent artifacts |
| Runs | What is each agent/CLI doing? | run board, process graph, lane timeline, terminal lanes |
| Agents | Which agents, modes, and capabilities exist? | adapter cards, mode presets, agent configs, scorecards |
| Decisions | What needs my answer? | grouped inbox, impact, answer/resume/replay |
| Source | Which files changed and are they safe? | Monaco editor, file tree, diff review, validation |
| Knowledge | What should become reusable? | promotion inbox, recipes, prompts, skills, memory map |
| Capabilities | Which CLIs/tools/extensions are ready? | marketplace, health checks, setup guides, permission scopes |
| Settings | How is the app/workspace/security/update configured? | workspace scope, privacy, logs, updater, signing/readiness |

## MVP Feature Order

1. **Capability Center upgrade**
   - Turn the current Desktop tab CLI setup guide into clearer capability cards.

2. **Run Board v1**
   - Show existing pipe sessions as lane cards with status, adapter, cwd, elapsed time, output bytes, decisions, and artifacts.

3. **Terminal Lane POC**
   - Add xterm.js after installation audit and connect the existing stdout/stderr buffer.

4. **Decision Inbox v2**
   - Add grouped inbox, answer/resume, and decision replay.

5. **Source Review v1**
   - Add file list, diff preview, backup restore before Monaco.

6. **Run Record Schema**
   - Freeze schema for sessions, lanes, commands, output events, decisions, artifacts, validations, and source diffs.

7. **Process Graph v1**
   - Implement two-CLI fan-out, merge gate, cancellation, and conflict display.

## UX to Avoid

- Do not put every feature into first-run setup.
- Do not treat raw CLI output as primary knowledge.
- Do not make any one CLI the app brand.
- Do not store provider tokens, passwords, or browser cookies in the app.
- Do not let quick actions bypass validation or durable records.

## Differentiation

Most references center on terminal, editor, Git, containers, or launcher workflows. This app should center on **decisions**, **evidence**, **validation**, **knowledge promotion**, and **multi-CLI orchestration**.

The first-class UI objects are not files or commands alone. They are `run`, `lane`, `decision`, `artifact`, `evidence`, and `reusable asset`.
