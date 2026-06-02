# Multi-CLI Orchestration Runtime

## Purpose

This document defines the runtime shape for making `platform-desktop-app` a platform-first host runtime that launches before Claude Code CLI, Gemini CLI, Codex CLI, OpenCode, and future AI CLIs, then uses those tools as guest adapter lanes without depending on any single one.

Core conclusions:

- The desktop app is not a CLI wrapper. It is the platform-first supervisor that owns workspace context, task state, decisions, artifacts, history, validation, and reusable data.
- CLIs are guest adapter-backed execution providers on top of the platform. If one is missing, the result is `capability_missing`, and the app still opens.
- Multi-CLI work is a supervised process graph with lane state, output bounds, cancellation, cleanup, and merge gates, not several unrelated terminal windows.
- If a CLI asks a user question while the user is absent, only the dependent lane pauses; the decision goes to the decision inbox and independent lanes continue.
- Terminal output is visible evidence, but durable platform state is stored as structured records.

## Runtime Layers

```text
Platform-first host runtime
  -> Tauri desktop shell
  -> workspace-monitor / future desktop UI
      -> command center
      -> run timeline
      -> decision inbox
      -> terminal lane panels
      -> source editor
  -> platform supervisor boundary
      -> adapter registry
      -> process graph planner
      -> PTY/stream supervisor
      -> decision deferral router
      -> artifact/log/data retention manager
      -> validation and evaluation runner
  -> external AI CLI guest adapters
      -> Claude Code CLI
      -> Gemini CLI
      -> Codex CLI
      -> OpenCode
```

## Candidate Technology

| Area | Preferred Candidate | Reason | Check Before Implementation |
| --- | --- | --- | --- |
| Desktop shell | Tauri v2/Rust | The existing scaffold and macOS/Windows profiles are Tauri-first. | Rust/Tauri installation audit, shell permissions, sidecar, signing gates |
| Terminal UI | xterm.js | Standard web terminal emulator candidate for a browser-based UI. | addons, theme, accessibility, output bounding, mobile non-goal |
| PTY/process | Tauri shell plugin, sidecar, separate supervisor candidates | Tauri shell provides scoped process execution, and sidecars support packaged local services. | Real interactive PTY needs a separate POC. Node `node-pty` is an Electron/Node-supervisor candidate, not the default Tauri choice. |
| Code editing | Monaco Editor | Browser-based editor from VS Code; avoids custom editor work first. | file URIs, model lifecycle, disposal, workers, schema/LSP linkage, dependency audit |
| editor-agent protocol | Agent Client Protocol | Future candidate for decoupling editors and coding agents. | Defer until editor interoperability is a stronger bottleneck than CLI supervision |
| long-running supervisor | Go or Python sidecar | Go is a future process-supervisor candidate; Python owns current agent-platform policy and validation. | measured bottleneck, lifecycle cleanup, packaging, signing, rollback |

## Multi-CLI Execution Contract

1. The user enters goal, project, and output type.
2. Preflight checks Claude Code, Gemini CLI, Codex CLI, and OpenCode availability, version, auth/session, and permission scope.
3. Each selected CLI becomes a process node.
4. A task pipe preset creates stdin init pipes for several optional CLI lanes from one task intake.
5. Fan-out/fan-in work declares merge gates.
6. Each lane has cwd, env allowlist, timeout, output bound, cancellation, and cleanup policy.
7. Terminal output is visible in lane panels, while meaningful events become structured records.
8. If a CLI asks a question, the adapter sends a short defer message only when safe, then pauses only the dependent lane.
9. The decision packet is stored in the decision inbox.
10. After the user answers, work resumes from a checkpoint.
11. Merge gates separate accepted, rejected, conflicting, and deferred evidence before releasing downstream results.

## Data Accumulation

| Data | Storage Direction | Durable Promotion Condition |
| --- | --- | --- |
| raw terminal scrollback | product-local runtime log, bounded retention | usually not promoted |
| terminal output summary | task run record | redaction, source lane, timestamp |
| CLI process event | process event record | adapter, version, cwd, exit, duration |
| artifact | owning project `artifacts/` or task artifact store | path boundary, provenance, validation |
| user question | decision inbox | decision impact, blocked/unblocked work, resume action |
| accepted learning | project docs, `_research/`, requirement/spec, reusable asset | provenance, freshness, validation, ambiguity handling |
| large historical corpus | packaged archive, index, optional vector DB | after volume, latency, and retrieval measurements |

Vector DB is not the default. File-system indexes and structured JSON/Markdown come first. Packaging, vector DB, or hybrid search should be compared only after retrieval volume and latency become measured bottlenecks.

## Permissions And Security

- Local command execution from the desktop shell requires command allowlists, args policy, workspace path scope, stdin-write scope, timeout, and kill permission.
- API keys, tokens, browser cookies, and provider session secrets must not enter installers or durable logs.
- Interactive stdin write is enabled only when the adapter records that it is safe.
- Public macOS readiness cannot be claimed without Developer ID signing, hardened runtime, notarization, stapling when applicable, and clean Mac smoke tests.
- Raw CLI output storage is allowed only when size, sensitivity, and retention are explicit.

## MVP Slices

1. Adapter status UI: show availability, version, and setup-later state for the four CLIs.
2. Run timeline model: model process lanes, artifacts, decisions, and validation records.
3. Single-CLI supervised prototype: run one CLI with bounded output, cancel, and cleanup.
4. Decision deferral prototype: route a CLI question to the decision inbox and pause only the dependent lane.
5. Multi-CLI fan-out/fan-in: add process graph validation and merge gates.
6. Source editor: implement Monaco-based read/write scope, diff/review, and save policy.
7. Data quality layer: validate terminal-derived records before promoting them to reusable knowledge candidates.

## Implementation Status: Supervisor MVP 1

As of 2026-06-02, the first real implementation is a constrained version of slice 1.

- `platform-desktop-app/src-tauri/src/lib.rs` allowlists `claude`, `gemini`, `codex`, and `opencode` and detects them on PATH.
- Tauri exposes `list_cli_adapters`, `run_cli_adapter_health`, and `run_all_cli_adapter_health`.
- Health checks run only each CLI's `--version`.
- stdin is closed, output is bounded by `MAX_HEALTH_OUTPUT_BYTES`, and runtime is bounded by `HEALTH_TIMEOUT_MS`.
- Missing CLIs are reported as `capability_missing` and do not block the desktop UI.
- The Workspace Monitor `Desktop` tab runs the real health checks when connected to Tauri and shows an unavailable fallback in a regular browser.
- Question-like health output is surfaced as a decision prompt candidate. In the session MVP, `send_cli_adapter_defer_message` sends the stdin defer message and stores detected questions in `_ops/coordination/human-decision-inbox.json`.

## Implementation Status: Pipe Session / Source Editor MVP 2

The 2026-06-02 follow-up implementation adds pipe-based execution and scoped file editing without installing new dependencies.

- The Tauri backend exposes `start_cli_adapter_session`, `poll_cli_adapter_session`, `list_cli_adapter_sessions`, `write_cli_adapter_stdin`, `send_cli_adapter_defer_message`, and `cancel_cli_adapter_session`.
- Execution is limited to the `ADAPTERS` allowlist. No shell plugin permission was added.
- Each session captures stdout/stderr into bounded buffers and applies a size limit to stdin input.
- `send_cli_adapter_defer_message` writes a fixed defer message to stdin, stores detected questions in `_ops/coordination/human-decision-inbox.json` without duplicating the same session prompt, and reflects the stored inbox item count in the session report.
- `cancel_cli_adapter_session` kills and waits for the child process, then keeps the report visible.
- The Tauri backend exposes `read_workspace_text_file` and `write_workspace_text_file`.
- File operations allow only workspace-root-relative paths and block `_private/`, `outputs/`, paths outside the workspace, and symlink escapes.
- Saves create backups under `platform-desktop-app/artifacts/source-editor-backups/`.
- The Workspace Monitor `Desktop` tab shows a CLI session console and textarea-based scoped editor.

## Implementation Status: User Controls MVP 3

The 2026-06-02 additional improvement makes setup, mode selection, and deferred decision handling available from one user-facing surface.

- The Tauri backend exposes `list_human_decision_inbox` and `answer_human_decision`.
- `answer_human_decision` sets the selected decision `status` to `answered` and persists an answer payload plus a `decision_history` item.
- The Workspace Monitor `Desktop` tab shows setup hints, verification commands, and official reference links for each CLI adapter. It does not auto-install tools.
- The session launcher provides `User Task`, `Platform Improvement`, `Knowledge Accumulation`, and `Review & Verify` mode presets that fill the prompt.
- The decision inbox panel shows open/answered/total counts, decision list, answer type/text controls, and saved answer state.

## Implementation Status: Task Pipe Init MVP 4

The 2026-06-02 additional implementation moves beyond single CLI session start and adds task-intake-based multi-CLI lane initialization.

- The Tauri backend exposes `list_cli_task_pipeline_presets` and `start_cli_task_pipeline`.
- Presets include `platform_improvement_pipe`, `knowledge_accumulation_pipe`, and `review_verify_pipe`.
- Each lane uses only allowlisted adapters, and a missing CLI marks only that lane as `capability_missing`.
- The init report returns pipe edges for `task_intake -> lane stdin`, `lane stdout/stderr -> platform_event_store`, `lane question_events -> human_decision_inbox`, and `lane accepted_summary -> merge_gate`.
- The Workspace Monitor `Desktop` tab shows presets, task intake, lane state, pipe edges, and merge gate in the `Task Pipe Init` panel.

## Implementation Status: Decision Resume MVP 4

The next 2026-06-02 improvement adds an explicit resume path that reinjects a saved decision answer into the linked active CLI session.

- The Tauri backend exposes `answer_and_resume_human_decision`.
- The command first saves the decision answer and `decision_history`; only when decision metadata points to a currently active session does it send the same answer text to session stdin.
- If the session is missing, finished, or lacks stdin, the saved answer remains and the command returns resume status/detail explaining why resume did not happen.
- The Workspace Monitor `Desktop` tab shows linked session id/status and distinguishes plain `Answer` from `Answer & Resume`.
- On successful resume, the session report is refreshed and the `defer_message_sent` presentation is cleared so the lane appears running again.

## Non-Scope

- This MVP does not implement a PTY-based terminal.
- Autonomous source-affecting CLI execution and merge-gate release are not implemented yet.
- Rust/Tauri, xterm.js, Monaco, and PTY dependencies are not installed before installation audit.
- The app does not own provider authentication for users.
- This does not claim public installer readiness.
