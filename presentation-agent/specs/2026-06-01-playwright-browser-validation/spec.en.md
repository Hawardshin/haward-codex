# Spec: Playwright Browser Validation

## Goal

Automatically validate `presentation-agent` generated HTML decks in real Chromium.

## Requirements

- Add `REQ-PA-015`.
- Install Playwright Test and `@axe-core/playwright` as project-local devDependencies.
- Validate both Chromium desktop and mobile viewports.
- Treat only HTML files containing `.pa-slide` as deck test targets.
- Keep test result and report output out of git.
- Record installation audit and registry entries.

## Non-Goals

- Do not add visual regression screenshot baselines in this task.
- Do not install every browser engine such as WebKit and Firefox.
- Do not replace aesthetic presentation quality judgment with axe-core.

## Success Criteria

- `npm run test:browser` passes 20 browser/accessibility tests.
- `npm audit --json` reports 0 vulnerabilities.
- Existing Python tests and config/registry checks remain passing.
