# Traceability: pnpm Workspace Migration

| Requirement | Implementation Target | Verification |
| --- | --- | --- |
| REQ-WS-088 | `pnpm-workspace.yaml`, `pnpm-lock.yaml`, project `package.json` | `corepack pnpm install --frozen-lockfile` |
| REQ-WS-089 | root/project `packageManager` fields | `corepack pnpm --version` |
| REQ-WS-090 | README/config/script command updates | npm reference audit, pnpm test/check/build |

