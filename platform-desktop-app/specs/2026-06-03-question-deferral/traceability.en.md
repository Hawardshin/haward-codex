# Question Deferral Traceability

| Requirement | Implementation | Validation |
| --- | --- | --- |
| PDA-UX-006 | Store CLI questions in the decision inbox | readiness/test, inbox command checks |
| PDA-UX-011 | Include blocked/unblocked/resume metadata for deferred questions | `append_session_decisions_to_inbox` |
| PDA-UX-014 | Session console can write stdin, defer, and cancel | Desktop session card/actions |
| PDA-UX-016 | Answer-only and answer-and-resume paths | Existing decision resume command remains |
| PDA-UX-020 | Task pipe lane question deferral | `start_cli_task_pipeline(autoDeferQuestions)` |
| PDA-UX-021 | Automatic/manual/bulk question deferral | `auto_defer_session_questions_locked`, `defer_all_cli_adapter_questions`, Workspace Monitor UI |

## Evidence

- Tauri shell docs: child process execution requires explicit permission and scope.
- Node child process docs: stdin/stdout/stderr pipes are a standard child-process orchestration boundary.
- WAI-ARIA dialog/alertdialog patterns: user decisions should be collected in an explicit, predictable decision surface.
