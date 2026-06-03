# Validation: Workspace Monitor Language Mode Selector

## Verification Plan

- `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/language-mode-registry.json`
- `cd workspace-monitor && npm run collect`
- `cd workspace-monitor && npm test`
- `cd workspace-monitor && npm run check`
- `cd workspace-monitor && npm run build`

## Acceptance Criteria

- Generated snapshots include `languageModeCatalog`.
- The default language mode is `all`.
- The toolbar can select all-language, Korean-only, and English-only modes.
- Korean-only mode shows only `ko` documents, and English-only mode shows only `en` documents.
- `unknown` documents appear only in all-language mode.
- Language mode does not conflict with the source-code programming language filter.

## Results

- Passed: `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/language-mode-registry.json`
- Passed: `cd agent-platform && PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- Passed: core shared settings `check-config-contract`
- Passed: `cd workspace-monitor && npm run collect`
- Passed: `cd workspace-monitor && npm test`
- Passed: `cd workspace-monitor && npm run check`
- Passed: `cd workspace-monitor && npm run build`
- Passed: `npm run dev -- --port 3100`, then `curl` smoke check confirmed `전체`, `한국어만`, `English Only`, and `languageModeCatalog` rendering
