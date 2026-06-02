# Validation: Intent Feature Map Source Structure Refactor

## Planned Commands

- `npm --prefix workspace-monitor test`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run check`
- `npm --prefix workspace-monitor run build`
- `npm --prefix workspace-monitor run build:customer`
- `npm --prefix workspace-monitor run check:intent-map:customer`
- `npm --prefix workspace-monitor run collect`
- `npm --prefix workspace-monitor run check:intent-map`
- `npm --prefix workspace-monitor run perf:budget`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`

## Result

- `npm --prefix workspace-monitor test`: passed, 16 tests passed.
- `node --check workspace-monitor/scripts/collect-workspace.mjs && node --check workspace-monitor/scripts/lib/intent-feature-map.mjs`: passed.
- `npm --prefix workspace-monitor run collect`: passed, developer snapshot generated.
- `npm --prefix workspace-monitor run check:intent-map`: passed, 155 intents and 12 feature themes verified.
- `npm --prefix workspace-monitor run check`: passed.
- `npm --prefix workspace-monitor run build`: passed.
- `npm --prefix workspace-monitor run build:customer`: passed.
- `npm --prefix workspace-monitor run check:intent-map:customer`: passed, customer snapshot has 0 intent-map items.
- `npm --prefix workspace-monitor run collect`: passed, developer snapshot restored.
- `npm --prefix workspace-monitor run check:intent-map`: passed.
- `npm --prefix workspace-monitor run perf:budget`: passed, largest initial chunk 227537 bytes.
- `python3 _tools/docs-audit/src/docs_audit.py --check`: passed.
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: passed.
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`: passed.
