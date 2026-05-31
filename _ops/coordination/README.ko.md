# 작업 조율 보드

이 폴더는 현재 진행 중인 에이전트, 병렬 작업, 차단 요소, 다음 행동을 한 곳에서 보기 위한 운영 공간이다.

## 주요 파일

- `status.json`: 에이전트와 작업 상태의 원본 데이터
- `board.ko.md`: 한국어 작업 보드
- `board.en.md`: 영어 작업 보드
- `board.html`: 브라우저로 볼 수 있는 작업 보드

## 갱신 명령

저장소 루트에서 실행한다.

```bash
python3 _tools/task-board/src/task_board.py
```

검증만 할 때:

```bash
python3 _tools/task-board/src/task_board.py --check
```

## 운영 규칙

- 병렬 작업을 시작하면 `status.json`에 작업과 담당 에이전트를 추가한다.
- 작업 상태가 바뀌면 `status.json`을 갱신하고 보드를 재생성한다.
- 작업이 끝나면 완료 상태와 평가 보고서 경로를 남긴다.
- 진행 중인 작업을 파악할 때는 먼저 `board.ko.md` 또는 `board.html`을 본다.
