# Validation: Prompt And Instruction Quality Gate

## Required Checks

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

## Manual Review

- Confirm that the instruction rewrite rule covers bad instruction types and probabilistic LLM assumptions.
- Confirm Korean and English documents preserve the same meaning.
