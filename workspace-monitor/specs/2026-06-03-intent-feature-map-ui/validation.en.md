# Validation: Intent Feature Map UI

## Executed Checks

- `npm --prefix workspace-monitor run collect`: passed
- `npm --prefix workspace-monitor test`: passed
- `npm --prefix workspace-monitor run check`: passed
- `npm --prefix workspace-monitor run build`: passed
- `npm --prefix workspace-monitor run build:customer`: passed
- `npm --prefix workspace-monitor run perf:budget`: passed, largest initial chunk 227,537 bytes
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/access/view-mode-registry.json`: passed
- `curl http://127.0.0.1:3091/`: confirmed 200 response
- `curl http://127.0.0.1:3091/workspace-snapshot.json`: confirmed `themes=12`, `now=4`, and developer view allows `intent`

## Manual Checks

- Confirmed the customer snapshot has `documents=0`, `sourceFiles=0`, `intentFeatureMap.themes=0`, and `roadmap.now=0`.
- The in-app Browser MCP tool was not exposed in this session, so click/screenshot validation was replaced with HTTP smoke.
