# Plan Record: Language Mode Selector

## Request

- ID: `UR-2026-06-02-032`
- Summary: Add Korean-only, English-only, and all-language viewing modes for Workspace Monitor and platform document display.

## Mode Selection

- Selected mode: `governance`
- Reason: The task changes durable platform behavior across shared config, memory bootstrap, persistent instructions, requirements baseline, and monitor snapshot/UI.

## Evidence

- Next.js official i18n docs: route-level locale support exists, but this request is repository snapshot data filtering rather than URL routing.
- Next.js official static export docs: collector-generated data lenses are simpler for the current static monitor than request-dependent behavior.
- W3C BCP 47 guidance: document language ids should use standard primary tags such as `ko` and `en`.
- Existing collector behavior: `.ko.md`, `.en.md`, `.ko.json`, and `.en.json` language detection already exists.

## Execution Plan

1. Add `language-mode-registry.json` as a self-documenting shared config.
2. Include `languageModeCatalog` in the Workspace Monitor snapshot.
3. Add a language selector to the UI toolbar.
4. Apply the same filter to documents, history, recent history, and metric counts.
5. Update requirements, specs, persistent instructions, memory bootstrap, and README.
6. Run config contract, memory bootstrap, collector test, type check, build, and local smoke check.

## Decision

- Default mode: `all`
- Mode ids: `all`, `ko`, `en`
- `unknown` documents in single-language modes: hidden
- Security interpretation: display lens only, not redaction or authorization
