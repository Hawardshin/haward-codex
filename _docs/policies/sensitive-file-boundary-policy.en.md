# Sensitive File Boundary Policy

## Purpose

Sensitive files should be routed to one platform-visible place while remaining unavailable to AI agents by default.

## Core Rules

- Real sensitive files belong under `_private/sensitive/` or in an external secret manager.
- `_private/` is a git-ignored local-only vault and must not be used as requirements, history, evaluation, or knowledge-base evidence.
- Agents must not `find`, `rg`, `cat`, `sed`, summarize, embed, snapshot, or browser-capture `_private/` contents by default.
- The default handoff is for the user to provide the smallest needed redacted extract.
- Direct inspection requires explicit one-time permission for the exact path, operation, purpose, retention, and redaction rule.
- `.env`, key, certificate, keystore, and password-vault files must not be committed.
- Repository maps, Workspace Monitor snapshots, source collectors, public artifacts, and installers must not include `_private/` contents or raw secrets.

## Visible Locations

- Real local sensitive files: `_private/sensitive/` (ignored, default deny)
- Tracked security contract: `agent-platform/configs/security/sensitive-file-boundary.json`
- Operations guide: `_ops/security/README.ko.md`
- Validation tool: `_tools/privacy-audit/`

## Verification

```bash
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/security/sensitive-file-boundary.json
python3 _tools/privacy-audit/src/privacy_audit.py --check
python3 _tools/structure-audit/src/structure_audit.py --check
```

## Evidence

- OWASP Secrets Management Cheat Sheet recommends centralizing secret storage, provisioning, auditing, rotation, and access control.
- OWASP DevSecOps guidance recommends preventing secrets before they enter repository history.
- GitHub docs cover secret scanning and push protection for leak prevention.
- 1Password developer docs describe secret references and `op run` workflows that avoid storing plaintext in source control.
