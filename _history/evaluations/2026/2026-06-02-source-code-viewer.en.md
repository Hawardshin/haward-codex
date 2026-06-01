# Evaluation: Source Code Viewer

## Result

- Status: `ready_to_close`
- Rework required: none
- Work mode: `governance`

## Request Alignment

- Request: make source code viewable from the installable/monitoring platform.
- Result: added a read-only `Source` section to Workspace Monitor.
- The generated snapshot now includes `sourceFiles`, and the UI provides project/language filters, a file list, and a source viewer.
- The `user` view does not include the Source section; `developer` and `superadmin_developer` do.
- The platform desktop user-flow config and docs now include developer/superadmin source-code browsing.

## Verification

- `check-omissions`: `coverage_ready`
- `check-grounding`: `ready_to_publish`
- `evaluate-work`: `ready_to_close`
- `check-view-modes`: passed
- `workspace-monitor` tests, collection, type check, and build: passed
- `agent-platform` unit tests: passed
- Snapshot smoke check: confirmed `sourceFiles` and view-mode Source-section visibility

## Evidence

- Web search record: `_history/web-searches/2026/2026-06-02-source-code-viewer.en.md`
- Research note: `_research/topics/workspace-monitor/2026-06-02-source-code-viewer.en.md`
- Spec: `workspace-monitor/specs/2026-06-02-source-code-viewer/`
- Request trace: `_history/request-traces/2026/2026-06-02-source-code-viewer.en.md`
- Timing record: `_history/work-timings/2026/2026-06-02-source-code-viewer.json`

## Limits And Follow-Up

- The Source section is read-only and does not edit, save, diff, or execute code.
- Before public deployment, add a public/private snapshot profile that excludes or restricts `sourceFiles`.
- Shiki/Monaco was not installed in this change. Reconsider syntax highlighting or a read-only editor if code inspection becomes a core workflow.
- Browser/Playwright visual verification was not run because the tool/project dependency was unavailable in this session; static build and data smoke checks were used instead.
