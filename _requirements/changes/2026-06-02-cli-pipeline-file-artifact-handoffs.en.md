# CLI Pipeline File/Artifact Handoff Requirement Change

## Change ID

- `REQ-WS-059`
- Date: 2026-06-02
- Source request: `UR-2026-06-02-014`
- Work mode: `governance`

## Summary

After the previous pipe-oriented CLI orchestration request, the user added “files and etc.” This is interpreted as a requirement to explicitly manage files, temp files, directories, caches, logs, reports, and other artifact handoffs in addition to stdout/stderr/stdin pipes.

## Requirement

When a CLI pipeline hands data off through a file or artifact, each handoff must record:

- `artifact_id`
- kind
- workspace-relative path
- producer/consumer process
- size bound
- format
- cleanup or retention policy
- provenance
- validation

`mode=file` or `mode=artifact` pipe edges must reference `artifact_id`. Paths with absolute paths, drive prefixes, backslashes, `~`, or `..` require rework.

## Evidence

- Python `tempfile` official docs describe high-level temporary file/directory APIs with context managers and cleanup, while lower-level APIs require manual cleanup.
- Node.js `fs` official docs describe file stream/write behavior and write sequencing risks.
- OWASP Path Traversal and CWE-22 describe absolute path, `../`, separator, and path input validation risks.

## Affected Files

- `agent-platform/src/agent_platform/integrations/cli_pipeline.py`
- `agent-platform/configs/integrations/cli-pipeline-template.json`
- `agent-platform/docs/cli-pipeline-agent.en.md`
- `_ops/workflows/71-cli-pipeline-orchestration.md`
- `_ops/prompts/101-cli-pipeline-orchestration.md`
