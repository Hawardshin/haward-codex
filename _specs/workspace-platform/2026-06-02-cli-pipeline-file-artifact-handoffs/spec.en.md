# CLI Pipeline File/Artifact Handoff Spec

## Purpose

When CLI orchestration uses files, temp files, directories, caches, logs, or reports in addition to pipes, the platform needs explicit artifact contracts so implicit paths and temporary outputs do not bypass validation.

## Requirement Links

- `REQ-WS-059`
- Related: `REQ-WS-053`, `REQ-WS-057`, `REQ-WS-058`

## Scope

- Add `artifacts` to `CliPipelineInput`.
- Add `artifact_id` to `PipelinePipe`.
- Require `mode=file` or `mode=artifact` pipes to reference an existing artifact.
- Validate artifact kind, path, producer/consumer, size bound, format, cleanup/retention, provenance, and validation.
- Require workspace-relative artifact paths and reject absolute paths, drive prefixes, backslashes, `~`, and `..`.

## Out Of Scope

- Actual CLI process runner
- Actual file I/O execution
- File parser implementation
- Runtime path resolution outside the workspace
