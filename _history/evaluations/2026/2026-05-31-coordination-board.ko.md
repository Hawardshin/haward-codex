# 작업 평가 보고서: 작업 조율 보드

## 초기 지시

- 현재 진행 중인 에이전트와 병렬로 작업들이 이뤄지고 있다면 그런 것들을 한 곳에서 볼 수 있는 곳도 필요하다.

## 작업 요약

- `_ops/coordination/`을 진행 중인 에이전트와 병렬 작업을 확인하는 운영 공간으로 추가했다.
- `status.json`을 원본 상태 데이터로 두고, `board.ko.md`, `board.en.md`, `board.html`을 생성하도록 했다.
- `_tools/task-board/`를 추가해 조율 보드를 생성하고 `--check`로 검증할 수 있게 했다.
- 조율 프롬프트와 병렬 작업 조율 워크플로를 추가했다.
- 시작/종료 워크플로와 지속 규칙에 조율 보드 확인 및 갱신 규칙을 반영했다.

## 확인한 레퍼런스

- `_ops/index.md`
- `_ops/workflows/00-start-here.md`
- `_ops/workflows/30-close-and-index.md`
- `_history/evaluations/README.ko.md`
- `_docs/instructions/persistent-instructions.ko.md`

## 변경 파일

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

## 검증

- `python3 _tools/task-board/src/task_board.py`: board files generated
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `python3 _tools/workspace-index/src/workspace_index.py`: maps generated
- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 -m unittest discover -s tests` in `agent-platform`: 11 tests OK
- `python3 -m unittest discover -s tests` in `_templates/python-agent-project`: 1 test OK
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/coordination-board-evaluation.json`: `ready_to_close`

## 평가 결과

- Status: `ready_to_close`
- Requires rework: `false`
- Gaps: none
- Improvements: none
- Follow-up actions: none

## 재작업 결과

- 재작업 필요 없음.

## 보고서 파일

- 한국어: `_history/evaluations/2026/2026-05-31-coordination-board.ko.md`
- 영어: `_history/evaluations/2026/2026-05-31-coordination-board.en.md`
