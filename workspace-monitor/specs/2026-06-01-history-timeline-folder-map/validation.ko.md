# 검증

## 계획

- `npm run collect`
- `npm run test`
- `npm run check`
- `npm run build`
- snapshot smoke check: `historyDays`, `folderStructure`, `documents` 수 확인
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- grounding/evaluation
- `git diff --check`

## 결과

- `npm run collect`: 통과. `historyDays`와 `folderStructure`를 포함한 generated snapshot을 생성했다.
- `npm run test`: 통과. collector tests가 history date extraction과 folder structure snapshot을 검증한다.
- `npm run check`: 통과. TypeScript check 오류 없음.
- `npm run build`: 통과. Next.js static build 오류 없음.
- snapshot smoke check: `documents`, `historyDays`, `rootFolders`, `docsCategories`, `projectHomes`, `historyRoots`가 모두 생성됨을 확인했다.
- static output smoke check: `History Days`, `Structure` 렌더링 문구를 확인했다.
- `python3 _tools/workspace-index/src/workspace_index.py`: 통과.
- `python3 _tools/task-board/src/task_board.py`: 통과.
- `python3 _tools/structure-audit/src/structure_audit.py --check`: 통과.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- `git diff --check`: 통과.
