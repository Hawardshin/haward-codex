# 검증: 질문/지시 품질 게이트

## 필수 검증

- `python3 -m json.tool agent-platform/configs/usage/ai-usage-gap-profile.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/usage/ai-usage-gap-profile.json configs/memory/bootstrap-manifest.json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json --root ..`
- `python3 _tools/docs-audit/src/docs_audit.py --check`
- `python3 _tools/naming-audit/src/naming_audit.py --check`
- `python3 _tools/structure-audit/src/structure_audit.py --check`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `python3 _tools/workspace-health/src/workspace_health.py --category governance --json`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding ../_history/evaluations/2026/2026-06-01-prompt-instruction-quality-grounding.json`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work ../_history/evaluations/2026/2026-06-01-prompt-instruction-quality-evaluation-input.json`
- `python3 _tools/work-timer/src/work_timer.py check _history/work-timings/2026/2026-06-01-prompt-instruction-quality.json`
- `git diff --check`

## 수동 검토

- 지시 재작성 규칙이 나쁜 지시 유형과 LLM 확률적 가정을 모두 다루는지 확인한다.
- 한국어/영어 문서가 같은 의미를 유지하는지 확인한다.
