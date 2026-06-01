# 검증: AI 사용 격차와 간극 해소

## 필수 검증

- `python3 -m json.tool agent-platform/configs/usage/ai-usage-gap-profile.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py`
- `python3 _tools/task-board/src/task_board.py`
- `hallucination-guard-agent` grounding check
- `work-evaluator-agent`

## 수동 검토

- profile이 사용자를 비난하지 않고 gap을 작업 구조 문제로 분류하는가.
- workflow/prompt가 실제로 bridge intervention을 실행할 수 있는가.
- 외부 출처는 최신성/신뢰도/한계를 기록했는가.
