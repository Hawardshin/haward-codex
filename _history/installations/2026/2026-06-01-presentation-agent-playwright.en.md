# 2026-06-01 Installation Record: presentation-agent Playwright browser validation

## Status

- Status: installed
- Target: `@playwright/test`, `@axe-core/playwright`, Chromium browser binary
- Owning project/tool: `presentation-agent`
- Scope: project
- Environment path: `presentation-agent/node_modules/`, Playwright browser cache

## Rationale

- The user asked to install Playwright validation because the previous work said browser validation was not yet available.
- Generated HTML decks need real browser render, keyboard navigation, presenter notes, and automated accessibility checks.

## Pre-Install Research

| Source | Checked | Used For |
| --- | --- | --- |
| https://playwright.dev/docs/intro | 2026-06-01 | Confirm npm-based Playwright Test installation and execution |
| https://playwright.dev/docs/browsers | 2026-06-01 | Confirm Chromium browser installation path |
| https://playwright.dev/docs/accessibility-testing | 2026-06-01 | Confirm `@axe-core/playwright` accessibility scan pattern |
| https://playwright.dev/docs/test-snapshots | 2026-06-01 | Confirm that visual regression should wait for stable rendering environment rules |
| `presentation-agent/configs/evaluation/harness-candidates.json` | 2026-06-01 | Confirm prior harness review marked Playwright/axe-core as near-term candidates |

## Installation Plan

- Exact install command:
  - `npm install --save-dev --save-exact @playwright/test @axe-core/playwright`
  - `npx playwright install chromium`
- Dependency record file:
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
- Lock/SBOM status: npm lock file expected.
- Expected changed files:
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
  - `presentation-agent/playwright.config.ts`
  - `presentation-agent/tests/browser/html-deck.spec.ts`
  - `.gitignore`
- Permission approval needed: yes, for network dependency and browser binary downloads.

## Security/License Review

- Security review: keep packages as project-local npm devDependencies and run `npm audit --json` after installation.
- License review: `@playwright/test` is expected to be Apache-2.0 family; `@axe-core/playwright` and `axe-core` are expected to be MPL-2.0 family. Confirm with package metadata after install.
- Maintenance/community signal: Playwright and axe-core are official, widely used automation/accessibility testing ecosystems.
- Known risks: browser download size, screenshot flake from host OS/font differences, and limits of automated accessibility scanning.

## Post-Install Result

- Command executed:
  - `npm install --save-dev --save-exact @playwright/test @axe-core/playwright`
  - `npx playwright install chromium`
- Installed version:
  - `@playwright/test@1.60.0`
  - `@axe-core/playwright@4.11.3`
  - `axe-core@4.11.4`
  - Chrome for Testing `148.0.7778.96` (`playwright chromium v1223`)
  - Chrome Headless Shell `148.0.7778.96` (`playwright chromium-headless-shell v1223`)
  - FFmpeg `playwright ffmpeg v1011`
- Files changed:
  - `.gitignore`
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
  - `presentation-agent/playwright.config.ts`
  - `presentation-agent/tests/browser/html-deck.spec.ts`
- Lock files created/updated: `presentation-agent/package-lock.json`
- Verification commands and results:
  - `npm ls --depth=0`: `@axe-core/playwright@4.11.3`, `@playwright/test@1.60.0`
  - `npm audit --json`: 0 vulnerabilities
  - `npx playwright --version`: `Version 1.60.0`
  - `npm run test:browser`: 20 Playwright browser/accessibility tests passed
  - Default sandbox execution failed on macOS Mach port permissions; approved external execution passed.

## Rollback

- Removal command:
  - `npm uninstall @playwright/test @axe-core/playwright`
  - `npx playwright uninstall chromium`
- Files to revert:
  - `presentation-agent/package.json`
  - `presentation-agent/package-lock.json`
  - `presentation-agent/playwright.config.ts`
  - `presentation-agent/tests/browser/html-deck.spec.ts`
  - `.gitignore`
- Recovery verification:
  - `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`

## Links

- Installation registry: `_ops/installations/registry.json`
- Work summary: `_history/work-summaries/2026/2026-06-01.en.md`
- Evaluation report: `_history/evaluations/2026/2026-06-01-presentation-agent-playwright-validation.en.md`
- Commit: pending
