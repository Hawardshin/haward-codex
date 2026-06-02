# Traceability

| Requirement | Output | Verification |
| --- | --- | --- |
| `REQ-WS-074` | `agent-platform/configs/security/sensitive-file-boundary.json` | `check-config-contract` |
| `REQ-WS-074` | `_docs/policies/sensitive-file-boundary-policy.en.md`, `_ops/security/README.en.md` | `docs-audit` |
| `REQ-WS-074` | `_tools/privacy-audit/` | `privacy-audit --check` |
| `REQ-WS-074` | `_tools/workspace-index/src/workspace_index.py`, `workspace-monitor/scripts/collect-workspace.mjs` | `privacy-audit`, `workspace-index`, `npm run build` |
| `REQ-WS-074` | `_ops/projects/root-structure-policy.json` | `structure-audit`, `repository-map` |
