# 검증: 모델별 프롬프팅 전략

## 실행할 검증

- `python3 -m json.tool agent-platform/configs/usage/ai-usage-gap-profile.json`
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <grounding.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <evaluation-input.json>`
- `python3 _tools/work-timer/src/work_timer.py check <timing.json>`
- `git diff --check`

## 수동 검토

- 2-pass 규칙이 약한/비추론/불확실 모델과 고분산 작업에 제한되어 있는지 확인한다.
- 반복 호출 일치를 사실 증명으로 쓰지 않는다는 boundary가 남아 있는지 확인한다.
