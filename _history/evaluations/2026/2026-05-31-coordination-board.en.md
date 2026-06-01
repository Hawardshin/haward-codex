# Work Evaluation Report: Coordination Board

## Initial Instruction

- There should be one place to see active agents and parallel work when work is happening in parallel with the current agent.

## Work Summary

- Added `_ops/coordination/` as the operations space for active agents and parallel work.
- Made `status.json` the source status data and generated `board.ko.md`, `board.en.md`, and `board.html`.
- Added `_tools/task-board/` to generate and check coordination boards.
- Added a coordination prompt and a parallel-work coordination workflow.
- Updated start/close workflows and persistent rules with coordination board check and refresh rules.

## References Checked

- `_ops/index.md`
- `_ops/workflows/00-start-here.md`
- `_ops/workflows/30-close-and-index.md`
- `_history/evaluations/README.ko.md`
- `_docs/instructions/persistent-instructions.ko.md`

## Changed Files

- `_ops/coordination/README.ko.md`
- `_ops/coordination/README.en.md`
- `_ops/coordination/status.json`
- `_ops/coordination/board.ko.md`
- `_ops/coordination/board.en.md`
- `_ops/coordination/board.html`
- `_tools/task-board/README.ko.md`
- `_tools/task-board/README.en.md`
- `_tools/task-board/src/task_board.py`
- `_ops/prompts/80-coordinate-work.md`
- `_ops/workflows/50-coordinate-parallel-work.md`
- `_templates/task-board/status.json`
- `AGENTS.md`
- `README.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/instructions/workspace-rules.md`
- `_history/evaluations/2026/2026-05-31-coordination-board.ko.md`
- `_history/evaluations/2026/2026-05-31-coordination-board.en.md`

## Verification

- `python3 _tools/task-board/src/task_board.py`: board files generated
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `python3 _tools/workspace-index/src/workspace_index.py`: maps generated
- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 -m unittest discover -s tests` in `agent-platform`: 11 tests OK
- `python3 -m unittest discover -s tests` in `_templates/python-agent-project`: 1 test OK
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/coordination-board-evaluation.json`: `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Requires rework: `false`
- Gaps: none
- Improvements: none
- Follow-up actions: none

## Rework Result

- No rework required.

## Report Files

- Korean: `_history/evaluations/2026/2026-05-31-coordination-board.ko.md`
- English: `_history/evaluations/2026/2026-05-31-coordination-board.en.md`
