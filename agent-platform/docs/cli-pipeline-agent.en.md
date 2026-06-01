# CLI Pipeline Agent

## Purpose

`cli-pipeline-agent` validates plans that launch multiple CLI processes, connect stdout/stderr/stdin streams, hand off files/temporary files/artifacts/logs/caches/reports, or merge fan-out results before implementation or close-out.

This agent is not a command runner. It first turns execution into a checkable process graph so pipes and file paths are explicit `processes`, `pipes`, and `artifacts`, not hidden inside shell strings or implicit temp paths.

## When To Use

- One user action needs to launch several CLIs.
- CLI A stdout needs to feed CLI B stdin.
- CLI A output needs to be handed to CLI B through a file, temp file, cache, log, or report.
- Research fan-out results need a fan-in merge gate.
- A desktop shell, monitor, local daemon, or agent workflow wants to run multiple external CLIs.
- Close-out evaluation needs `cli_pipeline_occurred=true`.

## Input

Use `agent-platform/configs/integrations/cli-pipeline-template.json` as the base shape.

- `processes`: CLI process nodes
- `pipes`: stdout/stderr/stdin graph edges. `mode=file` or `mode=artifact` requires `artifact_id`.
- `artifacts`: file, temp file, directory, cache, log, or report handoff contracts with path, producer, consumers, size limit, format, cleanup/retention, provenance, and validation
- `execution_policy`: shell usage, argv execution, adapter allowlist, explicit cwd
- `safety_controls`: allowlist, secret redaction, permission scope, audit logging, and related controls
- `resource_controls`: timeout, output bound, cancellation, cleanup, orphan-process, and backpressure policy
- `source_provenance`: sources for command-execution assumptions and design
- `plan_evidence`: evidence explaining why this pipeline structure is needed
- `verification`: dry-run, contract check, or smoke-test evidence

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-cli-pipeline configs/integrations/cli-pipeline-template.json
```

For real work, save a task-specific JSON under `_history/evaluations/YYYY/` or the owning project's history area instead of using the template directly.

## Result

- `pipeline_ready`: no blocking gap was found.
- `rework_required`: a required process graph, pipe, artifact, allowlist, timeout, output bound, cleanup, retention, provenance, or verification item is missing.

File and artifact paths must be workspace-relative and must not contain absolute paths, drive prefixes, backslashes, `~`, or `..`. Temp files and caches need `cleanup_policy`; retained outputs, logs, and reports need `retention_policy`.

`work-evaluator-agent` blocks close-out when `cli_pipeline_occurred=true` but `cli_pipeline_targets` is missing.
