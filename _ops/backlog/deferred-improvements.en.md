# Deferred Improvements

## Purpose

This file keeps track of improvements that should not block quick or `ship_first` work but must not be forgotten.

## Status

| ID | Status | Owning Scope | Improvement | Reason Deferred | Revisit Trigger | Related Artifacts |
| --- | --- | --- | --- | --- | --- | --- |
| DI-2026-05-31-001 | completed | `_ops`, `agent-platform` | Reviewed 219 real mode-selection records and checked whether `quick`/`ship_first` criteria needed tuning. No repeated evaluator gap justified a registry change, so the item is closed without config churn. | The mode system needed real usage data before tuning. | Completed: 219 records under `_history/mode-selections/2026/` checked | `_history/mode-selections/2026/2026-06-08-work-mode-usage-tuning-review.ko.md` |
| DI-2026-06-01-001 | completed | `workspace-monitor`, `agent-platform` | Collect open `clarification_needed` questions from `reconcile-spec` outputs and show them as a waiting-for-answer panel in the workspace monitor Decision Inbox. | The alert format and CLI operating rules landed first; the UI panel remained separate. | Completed: collector, snapshot type, UI panel, and tests added | `platform-desktop-app/renderer/workspace-monitor/components/features/ClarificationQueuePanel.tsx`, `platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs` |
| DI-2026-06-03-001 | blocked_external_gate | `platform-desktop-app` | Clean macOS account smoke and Windows msi/nsis build lanes need external OS/account/signing environments. Monaco/xterm now have lazy/runtime boundaries and audit surfaces, so remaining public readiness stays an external release gate. | Public distribution readiness cannot be verified from this local implementation environment alone. | Developer ID/notarization credentials, Windows host, and clean-machine test account become available | `_history/evaluations/2026/2026-06-08-deferred-implementation-closure.ko.md`, `platform-desktop-app/configs/macos-execution-profile.json` |

## Usage Rules

- When closing an item, link the related requirement, spec, evaluation, or work summary.
- `ship_first` evaluator input should include this file, or an equivalent project-specific file, in `deferred_improvement_targets`.
