# 검증 계획

- `corepack pnpm audit --prod=false`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter workspace-monitor run perf:budget`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`
- Static export Playwright smoke:
  - `tools` section exists in customer user navigation
  - Tool Studio shell click path measured at 391.2ms in Playwright static-export smoke, with the heavy Three.js chunk absent from initial requests and loaded only after Tools click
  - primary dropdown opens and has build/deploy/env/registry actions
  - context menu opens on tool card right click
  - shortcut changes active Tool Studio mode
  - 3D canvas has nonblank pixels
  - no horizontal overflow at 390px and 1280px
- `git diff --check`

## 검증 결과

- `corepack pnpm --filter workspace-monitor test`: pass, 31 tests.
- `corepack pnpm --filter workspace-monitor run check`: pass.
- `corepack pnpm --filter workspace-monitor run build:customer`: pass.
- `corepack pnpm --filter workspace-monitor run perf:budget`: pass, largest lazy chunk `16_-z~y~z7.7q.js` 723490 bytes, chunkCount 11.
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`: pass, customer bundle ready.
- `corepack pnpm --filter platform-desktop-app run check`: pass; public release warnings remain for signing/notarization/updater/clean-machine smoke and are outside this slice.
- `corepack pnpm audit --prod=false`: pass, no known vulnerabilities.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json`: pass.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-feature-registry.json`: pass.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../_ops/installations/registry.json`: pass.
- Browser/Playwright smoke: tools nav present, dropdown/context menu visible, `Control+Shift+E` changes mode to `environment`, initial lazy chunk count 0, click loads `16_-z~y~z7.7q.js`, desktop/mobile horizontal overflow 0, canvas pixelSum 1875.
- 스크린샷:
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-tool-studio-desktop.png`
  - `platform-desktop-app/renderer/workspace-monitor/artifacts/screenshots/2026-06-05-tool-studio-mobile.png`
- `git diff --check`: pass.
