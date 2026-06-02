# Security Operations

## What Goes Where

| Kind | Location | Tracked by git | AI default access |
| --- | --- | --- | --- |
| Real sensitive files | `_private/sensitive/` | No | Deny |
| Temporary sensitive work | `_private/tmp/` | No | Deny |
| Redacted extracts | `_private/redacted-extracts/` or direct user handoff | No | Only what the user provides |
| Security policy/contract | `agent-platform/configs/security/sensitive-file-boundary.json` | Yes | Allow |
| Operations guide | `_docs/policies/sensitive-file-boundary-policy.ko.md` | Yes | Allow |
| Validation tool | `_tools/privacy-audit/` | Yes | Allow |

## Principle

- `_private/` is not an invisible scratch folder. It is a visible protected boundary whose contents are not read.
- If an agent thinks it needs sensitive content, it first asks for a redacted extract.
- Direct inspection requires explicit one-time user permission.
- Monitor snapshots, repository maps, source collectors, installers, and public artifacts must not include `_private/` contents.

## Verification

```bash
python3 _tools/privacy-audit/src/privacy_audit.py --check
```
