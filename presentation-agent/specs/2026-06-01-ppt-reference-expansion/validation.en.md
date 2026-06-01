# Validation: PPT Reference Expansion

## Check Items

- `PYTHONPATH=src python3 -m presentation_agent.catalog data/reference-index/starter-reference-catalog.json` from `presentation-agent/`
- `python3 -m unittest discover -s tests` from `presentation-agent/`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-01-ppt-reference-expansion.json`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance`
- `git diff --check`

## Results

- `PYTHONPATH=src python3 -m presentation_agent.catalog data/reference-index/starter-reference-catalog.json`: pass, 82 records
- `python3 -m unittest discover -s tests`: pass, 10 tests
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../presentation-agent/configs/collection-policy.json ../presentation-agent/data/reference-index/starter-reference-catalog.json`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated
- `python3 _tools/workspace-health/src/workspace_health.py --category governance`: 7 checks passed
- `npm run build` from `workspace-monitor/`: passed
