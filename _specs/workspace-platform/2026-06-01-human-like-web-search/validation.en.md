# Validation: Human-Like Web Search

## Required Checks

- `python3 -m unittest discover -s _tools/source-collector/tests`
- `python3 _tools/source-collector/src/source_collector.py query-plan "human-like web search" --depth deep`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/research/human-search-profile.json configs/research/source-discovery-registry.json configs/research/research-agent-profile.json configs/research/deep-research-profile.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `work-evaluator-agent` and `hallucination-guard-agent`

## Result

- Status: passed
- `python3 -m unittest discover -s _tools/source-collector/tests`: 6 tests OK
- `python3 _tools/source-collector/src/source_collector.py query-plan "human-like web search" --depth deep`: query ladder rendered
- `python3 -m json.tool agent-platform/configs/research/human-search-profile.json`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: passed
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`: `passed`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ...human-like-web-search-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ...human-like-web-search-evaluation-input.json`: `ready_to_close`
