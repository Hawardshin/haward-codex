# 작업 보드 생성 도구

## 목적

`_ops/coordination/status.json`을 읽어 진행 중인 에이전트와 병렬 작업을 보여주는 Markdown/HTML 보드를 생성한다.

## 명령

저장소 루트에서 실행한다.

```bash
python3 _tools/task-board/src/task_board.py
```

검증만 할 때:

```bash
python3 _tools/task-board/src/task_board.py --check
```

## 입력

- `_ops/coordination/status.json`

## 출력

- `_ops/coordination/board.ko.md`
- `_ops/coordination/board.en.md`
- `_ops/coordination/board.html`
