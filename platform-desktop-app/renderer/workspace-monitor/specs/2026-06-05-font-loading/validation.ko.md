# 검증 계획

- `corepack pnpm audit --prod=false`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`
- 정적 export Playwright smoke:
  - body computed font-family에 `Pretendard Variable` 포함
  - network entry에 `PretendardVariable.subset.*.woff2` 포함
  - 한글 텍스트가 first viewport에서 overflow 없이 표시
- `git diff --check`
