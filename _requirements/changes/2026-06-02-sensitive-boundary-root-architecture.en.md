# Requirement Change: Sensitive Boundary And Root Architecture

## Request Summary

The user pointed out that the platform did not visibly show where sensitive files should be centralized while staying hidden from direct AI inspection. The user also noted that root folders were too numerous and not abstracted enough into operational and project concepts.

## Requirement Change

- Add `REQ-WS-074`.
- Real sensitive files belong under `_private/sensitive/` or an external secret manager.
- AI agents must not directly read or index `_private/` contents by default.
- Maps, monitor snapshots, source collectors, installers, and public artifacts must not include `_private/` contents or raw secrets.
- Root folders should be explained as logical layers rather than only a physical list.

## Evidence

- OWASP recommends centralized secret storage, provisioning, auditing, rotation, and access control.
- OWASP DevSecOps recommends preventing secrets before they enter repository history.
- GitHub provides secret scanning and push protection for leak prevention.
- 1Password supports secret references and `op run` workflows that avoid plaintext in source control.
- Nx describes planning monorepo folder structure and grouping projects by scope.
