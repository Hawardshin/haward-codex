# Desktop Product Folder Restructure Validation

## Results

- `corepack pnpm install --lockfile-only`: passed.
- `corepack pnpm install --frozen-lockfile`: passed. Re-linked workspace package symlinks after the move.
- `corepack pnpm --filter workspace-monitor run check`: passed.
- `corepack pnpm --filter workspace-monitor run build:customer`: passed. Generated customer public snapshot and static export.
- `corepack pnpm --filter workspace-monitor test`: passed. 16 tests passed.
- `corepack pnpm --filter workspace-monitor run perf:budget`: passed. Largest chunk 227542 bytes.
- `corepack pnpm --filter platform-desktop-app test`: passed. 14 tests passed.
- `corepack pnpm --filter platform-desktop-app run runtime:contract`: passed.
- `corepack pnpm --filter platform-desktop-app run check`: passed. Internal service readiness score 94; public blockers remain signing/notarization/updater/clean-machine smoke.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: passed.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: passed. Root `workspace-monitor/` is no longer a registered project and `platform-desktop-app/renderer` is part of the platform project home.
- `python3 _tools/workspace-index/src/workspace_index.py --check`: passed.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: changed desktop/project config self-documenting checks passed.

## Remaining Gates

- Public macOS/Windows release still requires Developer ID/code signing, notarization, signed updater, and clean-machine smoke before any public-ready claim.
