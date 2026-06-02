# Request Trace: Language Mode Selector

## Request

- ID: `UR-2026-06-02-032`
- Summary: Add Korean and English modes so Workspace Monitor and document browsers can show only Korean or only English documents.

## Requirements

- `REQ-WS-072`
- `REQ-WM-015`

## Result

- Added the shared `language_mode` concept.
- Kept the default as `all` and added `ko` and `en` single-language modes.
- Added `전체`, `한국어만`, and `English Only` to the Workspace Monitor toolbar.
- Applied the same language lens to documents, history, recent history, and summary metrics.
- Kept `language_mode` separate from `view_mode`, `work_mode`, `install_mode`, and source-code language filters.
- Documented that the selector is not redaction or a security boundary.

## Artifacts

- `agent-platform/configs/access/language-mode-registry.json`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- `workspace-monitor/scripts/collect-workspace.mjs`
- `workspace-monitor/lib/snapshot.ts`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/tests/collector.test.mjs`
- `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`
- `workspace-monitor/specs/2026-06-02-language-mode-selector/`
- `_requirements/baselines/2026-05-31-workspace-platform.en.md`
- `_docs/instructions/persistent-instructions.en.md`
- `AGENTS.md`

## Verification

- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/language-mode-registry.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- core shared settings `check-config-contract`
- `npm run collect`
- `npm test`
- `npm run check`
- `npm run build`
- `npm run dev -- --port 3100`, then `curl` smoke check

## Evaluation

- `_history/evaluations/2026/2026-06-02-language-mode-selector.ko.md`

## Commit

- To be recorded after close-out.
