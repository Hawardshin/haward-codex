# Research Summary: Installable Multi-Agent App References and Ideas

## Conclusion

The app should become an **installable AI work operating system**, not a CLI wrapper. The useful patterns from reference apps map as follows.

| Reference | What to Learn | Application to This Platform |
| --- | --- | --- |
| VS Code | Integrated terminal, shell integration, tasks, disciplined webview usage | Terminal lanes, command detection, problem/event extraction, avoiding unnecessary custom webviews |
| GitHub Desktop | Simplified GUI for Git changes/history/review | Route agent output through diff/review/branch/worktree gates before commit |
| Docker Desktop | Dashboard, integrated terminal, extensions, in-app docs/search, notification center | Adapter marketplace, setup guidance, health/status center, docs command center |
| Raycast | Command palette, quicklinks, snippets, extension action surface | Fast action palette and reusable prompt/action/snippet catalog |
| Warp | Terminal-first agent workspace, agent mode, shared workflows, session management | CLI lane console, task run timeline, reusable workflow promotion |
| Cursor | Codebase-aware agents, multi-file edits, rules/context, agent modes | Source editor, context packs, mode presets, review/verify loop |
| OpenCode | Terminal/IDE/desktop surfaces, multi-session, provider flexibility | Multi-provider/multi-session supervisor independent from any one CLI |
| Gemini CLI | Pipe/non-interactive/interactive/resume, MCP, extensions, memory/context files | Standardize prompt, pipe, resume, extensions, and memory reload in adapter contracts |
| Codex CLI | Local terminal coding agent, repo-aware execution | Treat Codex as an optional adapter, not as the platform identity |

## Implementation Idea Priorities

### P0: Basic Trust for an Installable App

- First-run workspace chooser: state what the app will read and execute.
- Capability cards for Claude Code, Gemini CLI, Codex CLI, and OpenCode: installed/auth/version/setup-later.
- Static dashboard reliability: connect the current relative static asset path fix to desktop shell smoke tests.
- Local-only safety: keep blocking `_private/`, `outputs/`, outside-workspace paths, and symlink escapes.

### P1: Terminal and Agent Work Surface

- Replace the textarea console with an xterm.js terminal lane.
- Add output parsing for questions, errors, test results, file references, and command-complete events.
- Show `cwd`, adapter, PID, elapsed time, output bytes, decision status, and artifacts per lane.
- Route CLI questions to the decision inbox and pause only the dependent lane.

### P2: Code Editing and Review Surface

- Add Monaco Editor as the scoped source editor.
- Save through backup, diff preview, and validation command linkage.
- Show agent changes like GitHub Desktop: staged/unstaged, branch/worktree, commit summary.
- Keep user mode simple while exposing raw traces and policy evidence in superadmin mode.

### P3: Multi-CLI Orchestration

- Build a process graph UI for fan-out, fan-in, merge gates, and validation gates.
- Add Best-of-N mode to run the same task across different CLIs/models/prompts and compare results.
- Use worktree isolation so lanes do not write to the same files at the same time.
- Show accepted/rejected/conflicting/deferred outcomes separately in merge review.

### P4: Knowledge Accumulation and Reuse

- Store structured run records instead of unlimited raw terminal output.
- Promote repeated prompts, workflows, commands, and validations into a catalog.
- Add a knowledge promotion inbox for docs, requirements, specs, tests, and skill candidates.
- Choose vector DB only after measuring search volume or latency bottlenecks.

## New Product Ideas

1. **Agent Run Board**: show CLI lanes as process graph plus timeline.
2. **Decision Replay**: replay how a delayed human decision was injected back into a session.
3. **Capability Marketplace**: manage CLIs, prompts, workflows, skills, validators, and source adapters together.
4. **Task Recipe Builder**: visually define repeatable flows such as research, plan, implement, verify, record, commit.
5. **Evidence Panel**: bundle claims, sources, command results, changed files, and test logs.
6. **Failure Recovery Center**: recovery cards for missing CLI, expired auth, hung command, output overflow, merge conflict, and unsafe file write.
7. **Workspace Memory Map**: graph requirements, specs, history, decisions, artifacts, and source files.
8. **Mode Switcher**: add `Ship`, `Research`, `Audit`, and `Learning Capture` presets.
9. **Privacy Scope Preview**: show folders, CLIs, logs, and write targets before starting a task.
10. **Agent Scorecard**: track success rate, question frequency, average runtime, test pass rate, and intervention count per CLI.

## Suggested Implementation Order

1. Audit and plan Rust/Tauri CLI installation with rollback and validation commands.
2. Run developer-local Tauri `.app` smoke: `workspace-monitor/out`, snapshot fetch, Desktop tab command invoke.
3. Build xterm.js terminal lane POC while preserving output bounds.
4. Replace textarea source editor with Monaco while preserving path boundary and backup save.
5. Define run record schema for sessions, decisions, artifacts, validation, and source changes.
6. Implement two-adapter fan-out with cancellation, pause/resume, and merge review.
7. Add worktree isolation for source-affecting runs.
8. Keep internal `.app` smoke separate from public-ready signing/notarization gates.

## Do Not Build Yet

- Do not auto-install CLIs, store provider credentials, claim public readiness, autonomously merge, or allow unrestricted shell execution in v1.
- Do not store unlimited raw terminal output.
- Do not introduce vector DB before measured need.
- Do not make Codex, Claude, Gemini, or OpenCode the platform identity.

## Strong Evidence

- Official Tauri docs define platform installers, signing, and macOS notarization needs.
- Official VS Code docs provide terminal, shell integration, and webview usage discipline.
- Official Docker Desktop docs provide dashboard, extensions, terminal, notification, and docs patterns.
- Gemini CLI official README/reference supports adapter design for pipe, interactive, resume, extensions, and MCP.
- OpenCode official site shows market direction toward terminal/IDE/desktop multi-session provider-flexible agents.
