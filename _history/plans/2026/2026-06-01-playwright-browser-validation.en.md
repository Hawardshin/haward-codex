# Plan: Playwright Browser Validation Install

## Purpose

Make `presentation-agent` generated HTML decks verifiable in real Chromium.

## Decisions

- Work mode: `standard`
- Install scope: `presentation-agent` project-local npm devDependency
- Selected technology: TypeScript Playwright Test + `@axe-core/playwright`
- Browser: Chromium only

## Steps

1. Check web search and official docs.
2. Draft installation audit.
3. Add `package.json`, `playwright.config.ts`, and `tests/browser/html-deck.spec.ts`.
4. Run `npm install --save-dev --save-exact @playwright/test @axe-core/playwright`.
5. Run `npx playwright install chromium`.
6. Run `npm run test:browser` for desktop/mobile Chromium validation.
7. Record sandbox permission failure and successful external execution in the installation record.
8. Update requirements, workflow, registry, history, and evaluation.

## Validation Scope

- HTML deck rendering
- `.pa-slide` presence and nonblank content
- Keyboard navigation
- Progress count
- Presenter notes toggle
- axe-core automated accessibility violations

## Deferred

- Screenshot baselines
- Playwright webServer-based dev-server tests
- LLM prompt regression
