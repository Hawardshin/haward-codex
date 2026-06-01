# Web Search Record: Playwright Browser Validation Install

## Request

Install and configure Playwright so browser validation can actually run.

## Work Mode

`standard`

## Search Date

2026-06-01

## Search Queries

- `Playwright official installation npm @playwright/test install chromium`
- `Playwright official accessibility testing @axe-core/playwright`
- `Playwright official visual comparisons test snapshots toHaveScreenshot`
- `Playwright official configuration webServer file URLs html testing`

## Key Sources Checked

- Playwright Getting Started: https://playwright.dev/docs/intro
- Playwright Browsers: https://playwright.dev/docs/browsers
- Playwright Accessibility Testing: https://playwright.dev/docs/accessibility-testing
- Playwright Visual Comparisons: https://playwright.dev/docs/test-snapshots
- Playwright GitHub: https://github.com/microsoft/playwright
- axe-core Playwright package: https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright
- Playwright MachPort issue search: https://github.com/microsoft/playwright/issues?q=MachPortRendezvousServer

## Judgment

- Playwright Test fits `presentation-agent` HTML output because the project needs real browser DOM, viewport, keyboard navigation, and accessibility scan validation.
- `@axe-core/playwright` fits the same browser page flow and is installed together.
- Screenshot baselines are supported by Playwright, but are deferred because OS/browser/font differences can affect results.
- Chromium failed inside the Codex sandbox due macOS Mach port permissions, but passed under approved external execution.

## Plan Impact

- Add `presentation-agent/package.json`, `package-lock.json`, `playwright.config.ts`, and `tests/browser/html-deck.spec.ts`.
- Validate only actual `.pa-slide` decks in Chromium desktop/mobile viewports.
- Update installation records and installation registry.

## Uncertainty

- Other machines need `cd presentation-agent && npm install && npm run install:browsers`.
- Automated accessibility scans do not guarantee presentation quality, persuasion, or narrative flow.
