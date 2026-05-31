# Work Coordination Board

This folder is the central place for viewing active agents, parallel tasks, blockers, and next actions.

## Key Files

- `status.json`: source data for agents and tasks
- `board.ko.md`: Korean work board
- `board.en.md`: English work board
- `board.html`: browser-viewable work board

## Update Command

Run from the repository root:

```bash
python3 _tools/task-board/src/task_board.py
```

Check only:

```bash
python3 _tools/task-board/src/task_board.py --check
```

## Operating Rules

- When parallel work starts, add the task and responsible agent to `status.json`.
- When status changes, update `status.json` and regenerate the boards.
- When work completes, record the completed status and evaluation report path.
- To understand current work, start with `board.ko.md` or `board.html`.
