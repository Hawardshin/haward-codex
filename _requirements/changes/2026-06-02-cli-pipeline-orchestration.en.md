# Requirement Change: CLI Pipeline Orchestration

- Date: 2026-06-02
- Work mode: `governance`
- Added requirement: `REQ-WS-058`
- User request summary: The user wants one CLI action to run several internal CLI processes and use pipes or similar mechanisms to orchestrate multiple CLIs.

## Change

Added `REQ-WS-058` so multi-process CLI orchestration is managed as a checkable process graph instead of a shell string.

Required contract:

- process node: adapter, command, args, cwd, env allowlist, timeout, output bound
- pipe edge: stdout/stderr/stdin link
- safety control: adapter allowlist, argv, shell disabled, cwd boundary, redaction, permission, fallback, audit logging
- resource control: timeout, output limit, cancellation, cleanup, orphan process, backpressure
- source provenance, plan evidence, verification, rollback
- evaluator input: `cli_pipeline_occurred=true`, `cli_pipeline_targets`

## Impact

- `agent-platform` gets `cli-pipeline-agent` and the `check-cli-pipeline` command.
- The work evaluator treats missing `cli_pipeline_targets` as a close-out gap when CLI pipeline work occurred.
- Memory bootstrap, router, workflow, and prompt navigation must keep this structure discoverable for future sessions.
