# Security Configs

This folder stores settings for sensitive-file, secret, and private-file boundaries.

## Files

- `sensitive-file-boundary.json`: source of truth for routing sensitive files to `_private/sensitive/` or external secret managers while denying AI default access to `_private/`.

## Verification

```bash
cd agent-platform
PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/security/sensitive-file-boundary.json
cd ..
python3 _tools/privacy-audit/src/privacy_audit.py --check
```
