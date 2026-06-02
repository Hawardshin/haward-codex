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
- `PDA-UX-009` - `PDA-UX-012`: UI flow and code editing surface.
- `PDA-UX-013`: Desktop tab shows runtime, CLI, terminal result, decision prompt, and source-editing readiness.
