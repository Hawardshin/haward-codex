# Requirement Review: Sensitive Boundary And Root Architecture

## Review Result

- Status: approved
- Requirement: `REQ-WS-074`
- Scope: `agent-platform`, `_ops`, `_docs`, `_tools`, `workspace-monitor`

## Acceptance Criteria

- Sensitive boundary config is self-documenting.
- `_private/` contents are excluded from git, workspace index, and monitor snapshots.
- Privacy audit validates the boundary without reading `_private/`.
- Start workflow and prompt router expose sensitive-file handling.
- Root folders are explained through logical layers.

## Risks And Controls

- Risk: if `_private/` is only a location without AI access denial, it becomes a sensitive collection point.
- Control: default deny, redacted extract first, explicit one-time permission, privacy audit, and snapshot/public release gates.
