# Task Board Tool

## Purpose

Read `_ops/coordination/status.json` and generate Markdown/HTML boards for active agents and parallel work.

## Command

Run from the repository root:

```bash
python3 _tools/task-board/src/task_board.py
```

Check only:

```bash
python3 _tools/task-board/src/task_board.py --check
```

## Input

- `_ops/coordination/status.json`

## Outputs

- `_ops/coordination/board.ko.md`
- `_ops/coordination/board.en.md`
- `_ops/coordination/board.html`
