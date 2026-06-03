# Validation

## Plan

- `npm run collect`
- `npm run test`
- `npm run check`
- `npm run build`
- Snapshot smoke check for `historyDays`, `folderStructure`, and document counts
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- grounding/evaluation
- `git diff --check`

## Result

- `npm run collect`: passed. Generated snapshot data includes `historyDays` and `folderStructure`.
- `npm run test`: passed. Collector tests cover history date extraction and folder structure snapshot generation.
- `npm run check`: passed. No TypeScript errors.
- `npm run build`: passed. Next.js static build completed.
- Snapshot smoke check: confirmed generated `documents`, `historyDays`, `rootFolders`, `docsCategories`, `projectHomes`, and `historyRoots`.
- Static output smoke check: confirmed `History Days` and `Structure` render text.
- `python3 _tools/workspace-index/src/workspace_index.py`: passed.
- `python3 _tools/task-board/src/task_board.py`: passed.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: passed.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- `git diff --check`: passed.
