# 검증: 플랫폼 발표 팩

## 예정 검증

- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck ...`
- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`
- `git diff --check`

## 결과

- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.html_deck ...`: 4개 발표 덱 HTML 생성 완료
- `python3 -m json.tool`: 4개 deck-spec JSON 유효성 확인
- `node -e` slide count 확인: 전체 플랫폼 15장, `agent-platform` 8장, `workspace-monitor` 7장, `presentation-agent` 8장
- HTML speaker notes 확인: 4개 덱 모두 발표자 노트 관련 markup 포함
- `PYTHONPATH=presentation-agent/src python3 -m unittest discover -s presentation-agent/tests`: 10개 테스트 통과
- `PYTHONPATH=presentation-agent/src python3 -m presentation_agent.catalog presentation-agent/data/reference-index/starter-reference-catalog.json`: 62개 reference record 검증 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/workspace-index/src/workspace_index.py`: repository/prompt map 갱신
- `python3 _tools/task-board/src/task_board.py`: coordination board 갱신
- `python3 _tools/workspace-health/src/workspace_health.py --include-build`: 19개 check 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-platform-presentation-pack-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-platform-presentation-pack-evaluation-input.json`: `ready_to_close`
