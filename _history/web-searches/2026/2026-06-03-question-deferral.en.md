# Web Search Record: Question Deferral

## Purpose

Confirm the direction for an installable desktop app that controls external CLI stdin/stdout/stderr pipes and defers user questions into an explicit decision surface.

## Sources Checked

- Tauri v2 Shell plugin docs: https://v2.tauri.app/plugin/shell/
  - Finding: the shell plugin supports child process execution but requires permission/capability scope.
  - Plan impact: keep external CLIs as optional adapters and extend the current Rust command/session layer without global auto-installation.
- Node.js child_process docs: https://nodejs.org/api/child_process.html
  - Finding: stdin/stdout/stderr pipes are a standard child-process orchestration surface.
  - Plan impact: explicitly track pipe state, bounded output, and stdin defer writes in task pipe/session polling.
- WAI-ARIA Alert Dialog pattern: https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/
  - Finding: important user judgment should be exposed through a clear decision UI.
  - Plan impact: collect CLI questions in the decision inbox instead of approving them automatically.
- WAI-ARIA Dialog Modal pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
  - Finding: decision surfaces need clear focus and action paths.
  - Plan impact: preserve distinct answer-only and answer-and-resume actions after the user returns.

## Weak Sources Ignored

- Blog and community articles were not used as core implementation evidence. The implementation is grounded in official docs and repository-local validation.

## Uncertainty

- CLI-specific question phrasing varies, so detection is currently a conservative string heuristic.
- Public macOS distribution readiness remains incomplete until signing/notarization checks are done.
