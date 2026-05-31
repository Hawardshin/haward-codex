# 검증: 스택별 코딩 조사

## 검증 항목

- `PYTHONPATH=src python3 -m unittest tests/test_coding_research.py`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`
- `python3 -m json.tool` for changed JSON configs
- `check-config-contract`, `check-memory-bootstrap`, `validate-knowledge`, `check-grounding`, `evaluate-work`
- task board/workspace index 생성 또는 확인
- `git diff --check`

## 기대 결과

- 모든 테스트 통과
- coding research template은 `ready_to_implement`
- evaluator는 `ready_to_close`
