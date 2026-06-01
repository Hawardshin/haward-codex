# CLI Pipeline File/Artifact Handoff Requirement Review

## Review Target

- `REQ-WS-059`
- Related existing requirements: `REQ-WS-053`, `REQ-WS-057`, `REQ-WS-058`

## Decision

This requirement extends, rather than replaces, `REQ-WS-058`. The existing requirement covers multi-CLI process graphs and pipe/fan-in merge gates. The new requirement adds path boundaries, cleanup/retention, provenance, and validation for file-based handoffs that could otherwise be implicit or unsafe.

## Acceptance Criteria

- `check-cli-pipeline` reads and validates `artifacts`.
- `mode=file` or `mode=artifact` pipe edges fail when `artifact_id` is missing or references an unknown artifact.
- Artifact paths must be workspace-relative and reject absolute paths, drive prefixes, backslashes, `~`, and `..`.
- Required artifacts need positive `max_bytes` and validation.
- Temporary/cache artifacts need `cleanup_policy`.
- Retained output/log/report/directory artifacts need `retention_policy`.

## Out Of Scope

- Implementing an actual multi-process runner
- Actually creating or deleting files
- Implementing per-CLI output parsers
