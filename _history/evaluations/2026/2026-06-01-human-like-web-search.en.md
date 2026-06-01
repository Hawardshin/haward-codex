# Work Evaluation: Human-Like Web Search Improvement

## Conclusion

- Status: passed
- Work mode: `governance`
- Rework required: no

## Result Against Initial Request

- The request asked for better web search that behaves more like a careful human researcher, finds many more sources, and summarizes good reusable sources.
- The result adds `human-search-profile.json`, a human-like source discovery workflow/prompt, source collector `query-plan` support, policy/memory/research profile connections, and requirements/spec/history artifacts.
- The work separates source origins from search method and requires query ladders, source lanes, snowballing, source triage, and selective summary capture for broad research.

## Evidence Checked

- External references: Google Search Help, Google Search Central search operators, Cochrane Handbook, PRISMA-S, Wohlin snowballing, and SIFT/lateral reading.
- Internal references: `agent-platform/configs/research/human-search-profile.json`, `_ops/workflows/54-human-like-source-discovery.md`, `_ops/prompts/84-human-like-source-discovery.md`, and `_tools/source-collector/`.

## Verification

- `python3 -m unittest discover -s _tools/source-collector/tests`
- `python3 _tools/source-collector/src/source_collector.py query-plan "human-like web search" --depth deep`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-human-like-web-search-grounding.json`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`

## Improvement Candidates

- Add a provider-backed search adapter after repeated use proves the input/output contract.
- Add freshness and duplicate scoring if the source registry grows large enough to slow manual review.
