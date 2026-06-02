# 검증: pnpm workspace migration

## 예정 명령

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

## 결과

- `corepack pnpm --version`: 통과, `10.34.1`.
- `corepack pnpm install --frozen-lockfile`: 통과. `sharp@0.34.5` install script completed.
- `corepack pnpm audit --prod=false`: 통과, `No known vulnerabilities found`.
- `corepack pnpm --filter workspace-monitor test`: 통과, 16 tests.
- `corepack pnpm --filter workspace-monitor check`: 통과.
- `corepack pnpm --filter workspace-monitor build`: 통과.
- `corepack pnpm --filter workspace-monitor perf:budget`: 통과, largest chunk 227542 bytes.
- `corepack pnpm --filter workspace-monitor check:intent-map`: 통과, developer 155 intents / 12 themes.
- `corepack pnpm --filter workspace-monitor check:intent-map:customer`: 통과, customer 0 intents / 0 themes after customer build.
- `corepack pnpm --filter platform-desktop-app test`: 통과, 13 tests.
- `corepack pnpm --filter platform-desktop-app check`: 통과, internal service ready and public blockers retained.
- `corepack pnpm --filter platform-desktop-app monitor:build`: 통과, customer bundle ready.
- `corepack pnpm --filter presentation-agent-browser-validation test:browser`: 통과, 26 browser tests.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: 통과.
- `check-install-modes`, `check-config-contract`, `check-philosophy-trace`: 통과.
