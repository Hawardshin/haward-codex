# 검증: 발표 레퍼런스 수집 기반

## 예정 검증

- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.catalog presentation-agent/data/reference-index/starter-reference-catalog.json`
- `python3 /Users/shinjoungeun/.codex/skills/.system/skill-creator/scripts/quick_validate.py _skills/presentation-reference-curator`
- `PYTHONPATH=agent-platform/src python3 -m agent_platform.cli validate-skill _history/skill-validations/2026/2026-06-01-presentation-reference-curator.json`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `git diff --check`

## 검증 기준

- 카탈로그 필수 필드와 라이선스 게이트에 gap이 없어야 한다.
- PPTX 변환 테스트가 슬라이드 순서와 HTML 출력을 확인해야 한다.
- 스킬 검증이 트리거 예시, forward test, improvement idea를 확인해야 한다.

