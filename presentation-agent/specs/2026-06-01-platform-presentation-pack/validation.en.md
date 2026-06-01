# Validation: Platform Presentation Pack

## Planned Checks

- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck ...`
- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`
- `git diff --check`

## Results

- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck ...`: generated four HTML decks
- `python3 -m json.tool`: all four deck-spec JSON files are valid
- `node -e` slide count check: overall platform 15, `agent-platform` 8, `workspace-monitor` 7, `presentation-agent` 8
- HTML speaker notes check: all four decks include speaker-note related markup
- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`: 10 tests passed
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.catalog presentation-agent/data/reference-index/starter-reference-catalog.json`: 62 reference records validated
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py`: repository and prompt maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: 19 checks passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-platform-presentation-pack-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-platform-presentation-pack-evaluation-input.json`: `ready_to_close`
