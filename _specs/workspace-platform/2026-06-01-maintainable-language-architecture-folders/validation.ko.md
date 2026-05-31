# 검증 계획

## 실행할 검증

- `python3 -m json.tool` for changed JSON configs
- `PYTHONPATH=src python3 -m unittest tests/test_coding_research.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`
- `python3 _tools/task-board/src/task_board.py --check`
- `git diff --check`

## 성공 기준

- 새 필드 누락 시 `complete-coding-research`가 gap을 반환한다.
- 템플릿은 새 필드를 포함하고 ready 상태를 통과한다.
- 문서와 설정 JSON은 자기 설명 계약을 통과한다.
