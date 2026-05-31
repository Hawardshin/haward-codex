# Validation: Presentation Reference Collection Foundation

## Planned Checks

- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.catalog presentation-agent/data/reference-index/starter-reference-catalog.json`
- `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/presentation-reference-curator`
- `PYTHONPATH=agent-platform/src python3 -m agent_platform.cli validate-skill _history/skill-validations/2026/2026-06-01-presentation-reference-curator.json`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `git diff --check`

## Acceptance Criteria

- The catalog has no missing required fields or license-gate gaps.
- PPTX conversion tests verify slide order and HTML output.
- Skill validation covers trigger examples, forward tests, and improvement ideas.

