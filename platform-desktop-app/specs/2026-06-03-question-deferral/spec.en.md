# Question Deferral Spec

## Purpose

When the installable platform runs external AI CLIs as guest lanes, CLI questions that require user decisions should be deferred into the decision inbox instead of blocking the whole task.

## Scope

- `platform-desktop-app` Tauri backend pipe-based CLI session commands
- `workspace-monitor` Desktop tab session, task pipe, and decision inbox UI
- readiness checks and regression tests

## Requirements

- Running sessions shall detect question candidates in stdout/stderr.
- Sessions with automatic deferral enabled shall send a defer message to CLI stdin when a new question candidate appears.
- Deferred questions shall be stored in `_ops/coordination/human-decision-inbox.json` with `deferred` status.
- Duplicate storage of the same session question shall be avoided through a session prompt key.
- Users shall be able to defer all detected questions and manually defer an individual session.
- Deferred decisions shall flow into the existing answer-only and answer-and-resume paths.
- Missing optional CLIs shall still degrade as `capability_missing` instead of failing the whole platform.

## Non-Scope

- CLI-specific semantic question classification models
- Public macOS signing/notarization
- Global automatic CLI installation

## Acceptance

- The `defer_all_cli_adapter_questions` Tauri command is registered.
- `start_cli_adapter_session` and `start_cli_task_pipeline` accept `autoDeferQuestions`.
- The Desktop UI shows `Auto-defer questions` and `Defer detected questions`.
- Active sessions can trigger automatic deferral through UI polling.
- tests/readiness/check/build/performance validation pass.
