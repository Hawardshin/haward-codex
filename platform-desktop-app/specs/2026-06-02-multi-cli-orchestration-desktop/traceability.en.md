# Multi-CLI Orchestration Desktop Traceability

| Item | Path |
| --- | --- |
| Shared requirement | `_requirements/baselines/2026-05-31-workspace-platform.en.md` |
| Requirement change | `_requirements/changes/2026-06-02-multi-cli-desktop-orchestration.en.md` |
| Requirement review | `_requirements/reviews/2026-06-02-multi-cli-desktop-orchestration.en.md` |
| Project requirements | `platform-desktop-app/docs/requirements/2026-06-02-installable-desktop.en.md` |
| UX requirements | `platform-desktop-app/docs/requirements/2026-06-02-installable-user-flow.en.md` |
| Architecture | `platform-desktop-app/docs/architecture/multi-cli-orchestration-runtime.en.md` |
| CLI registry | `agent-platform/configs/integrations/cli-adapter-registry.json` |
| Desktop registry | `platform-desktop-app/configs/desktop-distribution-registry.json` |
| User-flow registry | `platform-desktop-app/configs/user-flow-registry.json` |
| View mode registry | `agent-platform/configs/access/view-mode-registry.json` |
| Tauri backend | `platform-desktop-app/src-tauri/src/lib.rs` |
| Desktop UI | `workspace-monitor/components/MonitorShell.tsx` |
| Web search record | `_history/web-searches/2026/2026-06-02-multi-cli-desktop-orchestration.en.md` |
| Evaluation input | `_history/evaluations/2026/2026-06-02-multi-cli-desktop-orchestration-evaluation-input.json` |

## Requirement Mapping

- `REQ-WS-085`: keep the four CLIs optional while the platform supervisor owns multi-execution and data accumulation.
- `PDA-REQ-014`: multi-CLI supervisor and process graph.
- `PDA-REQ-015`: question deferral and decision inbox.
- `PDA-REQ-016`: structured promotion of terminal output.
- `PDA-REQ-018`: allowlisted CLI detection and bounded health/version checks.
- `PDA-REQ-019`: browser fallback degradation.
- `PDA-REQ-020`: allowlisted CLI pipe sessions, stdin, defer, cancel, and human decision inbox append.
- `PDA-REQ-021`: workspace-scoped source file read/write and backup.
- `PDA-REQ-022`: CLI setup guide, work-mode presets, human decision inbox list/answer.
- `PDA-REQ-023`: answer-and-resume for decisions linked to active CLI sessions.
- `PDA-REQ-024`: applied reference-app UI surfaces.
- `PDA-REQ-025`: multi-file source editing draft queue, dirty state, save-all/revert/close, and backup result surface.
- `PDA-UX-009` - `PDA-UX-012`: UI flow and code editing surface.
- `PDA-UX-013`: Desktop tab shows runtime, CLI, terminal result, decision prompt, and source-editing readiness.
- `PDA-UX-014`: Desktop tab shows CLI session console, decision inbox item count, and scoped source editor.
- `PDA-UX-015`: Desktop tab shows setup guide, mode presets, and decision answer UI.
- `PDA-UX-016`: Desktop tab shows linked session status and `Answer & Resume` action.
- `PDA-UX-017`: Desktop tab shows command palette, capability cards, run board, process graph, terminal event rail, grouped decisions, replay, diff review, and evidence/promotion surface.
- `PDA-UX-018`: Desktop tab source-editing surface shows open draft queue, direct path open, indexed browser, dirty-file save/revert/close flow.

## Multi-File Source Editing Trace

- Requirements: `PDA-REQ-025`, `PDA-UX-018`
- Implementation: `workspace-monitor/components/MonitorShell.tsx`
- Styles: `workspace-monitor/app/globals.css`
- Regression test: `platform-desktop-app/tests/readiness.test.mjs`
- Validation: `npm --prefix workspace-monitor run check`, `npm --prefix platform-desktop-app test`, visual QA screenshot
