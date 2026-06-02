# Validation: pnpm Workspace Migration

## Planned Commands

- `corepack pnpm --version`
- `corepack pnpm install --frozen-lockfile`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor check`
- `corepack pnpm --filter workspace-monitor build`
- `corepack pnpm --filter workspace-monitor perf:budget`
- `corepack pnpm --filter workspace-monitor check:intent-map`
- `corepack pnpm --filter workspace-monitor check:intent-map:customer`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app check`
- `corepack pnpm --filter platform-desktop-app monitor:build`
- `git diff --check`

## Results

- `corepack pnpm --version`: passed, `10.34.1`.
- `corepack pnpm install --frozen-lockfile`: passed. `sharp@0.34.5` install script completed.
- `corepack pnpm audit --prod=false`: passed, `No known vulnerabilities found`.
- `corepack pnpm --filter workspace-monitor test`: passed, 16 tests.
- `corepack pnpm --filter workspace-monitor check`: passed.
- `corepack pnpm --filter workspace-monitor build`: passed.
- `corepack pnpm --filter workspace-monitor perf:budget`: passed, largest chunk 227542 bytes.
- `corepack pnpm --filter workspace-monitor check:intent-map`: passed, developer 155 intents / 12 themes.
- `corepack pnpm --filter workspace-monitor check:intent-map:customer`: passed, customer 0 intents / 0 themes after customer build.
- `corepack pnpm --filter platform-desktop-app test`: passed, 13 tests.
- `corepack pnpm --filter platform-desktop-app check`: passed, internal service ready with public blockers retained.
- `corepack pnpm --filter platform-desktop-app monitor:build`: passed, customer bundle ready.
- `corepack pnpm --filter presentation-agent-browser-validation test:browser`: passed, 26 browser tests.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: passed.
- `check-install-modes`, `check-config-contract`, and `check-philosophy-trace`: passed.
