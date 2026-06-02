# Traceability

| 요구사항 | 산출물 | 검증 |
| --- | --- | --- |
| `REQ-WS-074` | `agent-platform/configs/security/sensitive-file-boundary.json` | `check-config-contract` |
| `REQ-WS-074` | `_docs/policies/sensitive-file-boundary-policy.ko.md`, `_ops/security/README.ko.md` | `docs-audit` |
| `REQ-WS-074` | `_tools/privacy-audit/` | `privacy-audit --check` |
| `REQ-WS-074` | `_tools/workspace-index/src/workspace_index.py`, `workspace-monitor/scripts/collect-workspace.mjs` | `privacy-audit`, `workspace-index`, `npm run build` |
| `REQ-WS-074` | `_ops/projects/root-structure-policy.json` | `structure-audit`, `repository-map` |
