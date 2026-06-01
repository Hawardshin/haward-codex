# 검증 기록

## 예정 검증

- `npm run collect`
- `npm test`
- `npm run check`
- `npm run build`
- 로컬 Next.js 화면 브라우저 검증
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- config/memory/evaluation/grounding checks
- `git diff --check`

## 결과

- `npm run collect`: 통과. 최종 485개 문서를 `workspace-monitor/src/generated/workspace-snapshot.json`에 기록.
- `npm test`: 통과. 4 tests.
- `npm run check`: 통과.
- `npm run build`: 통과. Next.js 16.2.6 static build 성공.
- `npm audit --json`: `0 vulnerabilities` after Next 16.2.6 and PostCSS 8.5.10 override.
- `npm ls --depth=0`: direct dependency versions 확인.
- `npm ls postcss`: `postcss@8.5.10 overridden` 확인.
- 로컬 Next.js dev server: `http://127.0.0.1:3100`에서 HTTP 200 확인.
- HTML smoke check: `Workspace Monitor`, `Overview`, `Projects`, `Documents`, metric cards와 최근 히스토리 HTML이 렌더링됨을 확인.
- `out/index.html` static output smoke check: `Workspace Monitor`, 탭, metric cards, 최근 히스토리 렌더링 확인.
- `python3 _tools/workspace-index/src/workspace_index.py`: 통과. repository/prompt map 재생성.
- `python3 _tools/task-board/src/task_board.py`: 통과. coordination board 재생성.
- core `check-config-contract`: 통과. gap 없음.
- `check-memory-bootstrap`: `ready_to_bootstrap`.
- `check-grounding`: `ready_to_publish`.
- `evaluate-work`: `ready_to_close`.
- 최종 snapshot 포함 build: 통과. 평가 문서 추가 후 485개 문서 snapshot으로 재빌드.
- 제한: in-app Browser 도구가 이번 세션에서 노출되지 않아 실제 브라우저 screenshot 검증은 하지 못했고, HTTP/HTML 검증으로 대체했다.
