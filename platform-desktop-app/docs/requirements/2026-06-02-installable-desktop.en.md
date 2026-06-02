# Installable Desktop App Requirements

## Scope

These are the first requirements for turning the platform into installable software, similar to a desktop application such as Visual Studio Code.

## Requirements

| ID | Requirement | Priority | Verification |
| --- | --- | --- | --- |
| PDA-REQ-001 | Installable app productization shall be owned by the `platform-desktop-app/` root project. | must | Project registry and structure audit |
| PDA-REQ-002 | Repository setup `install_mode` and end-user installer packaging shall be separated in docs and configs. | must | Product boundary docs and registry review |
| PDA-REQ-003 | The first desktop prototype should evaluate reuse of `workspace-monitor`. | should | Desktop distribution registry review |
| PDA-REQ-004 | Tauri, Electron, and native packaging options shall be compared before dependency installation or implementation. | must | Packaging strategy and spec traceability |
| PDA-REQ-005 | Release readiness shall require signing, notarization or OS trust, install/update/uninstall smoke tests, privacy review, and dependency/license review. | must | Release gate checklist |
| PDA-REQ-006 | Real tokens, webhook URLs, browser cookies, and private snapshots shall not be bundled in installers. | must | Privacy/security review |
| PDA-REQ-007 | The macOS executable structure shall distinguish developer local run, internal test `.app`, and public distribution app; it shall define the `.app` bundle/process model, workspace selection, optional CLI adapters, Developer ID signing, hardened runtime, notarization, stapling, update, and clean Mac smoke-test criteria. | must | `macos-execution-profile.json`, macOS execution docs, config contract |
| PDA-REQ-008 | The Windows executable structure shall distinguish developer local run, internal test installer, and public signed distribution; it shall define MSI/NSIS/MSIX, WebView2, code signing, SmartScreen, update, uninstall, and clean Windows smoke-test criteria. | must | `windows-execution-profile.json`, config contract |
| PDA-REQ-009 | The first implementation scaffold shall follow a Tauri v2/Rust desktop shell, `workspace-monitor` static UI, `agent-platform` Python layer, and optional external CLI adapter architecture. | must | `src-tauri/`, `package.json`, desktop distribution registry |
| PDA-REQ-010 | AI coding tools such as Codex, Claude Code, Cursor, and Antigravity shall be configurable optional capabilities, not required platform runtimes. | must | CLI adapter registry and desktop registry review |
| PDA-REQ-011 | Before installing Rust/Tauri dependencies or running desktop builds, the work shall record an installation audit, license/security review, and rollback plan. | must | Installation records and `planned_commands` review |
| PDA-REQ-012 | Public-ready or “just install it” wording is prohibited until macOS/Windows signing, notarization or code signing, clean-machine smoke tests, and update/uninstall/rollback tests pass. | must | Release gates and evaluation record |
| PDA-REQ-013 | The installable app shall expose Claude Code CLI, Gemini CLI, Codex CLI, and OpenCode as the first AI CLI adapter candidates, while making no single CLI required to open the app, view a workspace, or browse history. | must | CLI adapter registry, user-flow registry, readiness test |
| PDA-REQ-014 | Multi-AI-CLI execution shall be managed by a platform supervisor with process graph state, lane status, bounded terminal output, stdin policy, cancellation, orphan cleanup, and merge gates, not by simply opening several terminals. | must | multi-CLI architecture doc, CLI pipeline validation, resource check |
| PDA-REQ-015 | When a CLI asks a user question while the user is absent, the app shall send a safe defer message only when supported, pause only the dependent lane, store the decision in the decision inbox, and continue independent work. | must | `ai_cli_orchestration_flow`, human decision inbox, omission check |
| PDA-REQ-016 | Terminal output shall not be preserved only as raw scrollback; useful output shall become structured task events, process events, artifacts, decision packets, verification records, or reusable knowledge candidates with provenance, redaction, validation, and retention. | must | data accumulation contract, history/evaluation records |
| PDA-REQ-017 | Source-code editing shall prefer mature open-source editor surfaces such as Monaco Editor before custom editor work, and implementation shall validate file URI/model lifecycle, disposal, workers, and runtime constraints first. | should | architecture doc, dependency audit, UI prototype test |

## Current Status

- Status: baseline draft
- Actual desktop dependency installation: none
- Current selection: Tauri-first scaffold
- Next step: create an installation audit record for Rust/Tauri, then verify developer-local Tauri execution
