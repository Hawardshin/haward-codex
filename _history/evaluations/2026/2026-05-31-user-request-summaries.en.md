# 2026-05-31 Work Evaluation: User Request Summaries

## Initial Instruction Summary

The user asked to save summaries of their varied prompts and instructions in files, without needing to preserve the full original text.

## Result Summary

- Added `_history/user-requests/` as the dedicated user request summary layer.
- Saved 33 accumulated user requests from 2026-05-31 as bilingual meaning summaries.
- Added request-summary README files, templates, and policy docs.
- Added `user_request_summary_targets` to `work-evaluator-agent` so omissions require rework.
- Connected the request-summary layer to the memory bootstrap manifest, start/close workflows, work summaries, coordination board, and research records.

## References Checked

- `_history/work-summaries/README.ko.md`
- `_history/web-searches/README.ko.md`
- `_docs/context-archive-policy.ko.md`
- [Microsoft Agent Framework Memory & Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory)
- [Memory Matters](https://ojs.aaai.org/index.php/AAAI-SS/article/view/27688)
- [agentmemory.md](https://agentmemory.md/)
- [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)

## Verification

- `python3 -m json.tool _ops/coordination/status.json`: passed
- `python3 -m json.tool agent-platform/configs/memory/bootstrap-manifest.json`: passed
- `python3 -m json.tool agent-platform/configs/evaluation/work-evaluation-template.json`: passed
- `python3 -m json.tool _templates/work-evaluation/input.json`: passed
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 52 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/memory/bootstrap-manifest.json`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: passed
- `python3 _tools/task-board/src/task_board.py --check`: passed
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/user-request-summaries-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/user-request-summaries-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/user-request-summaries-eval.json`: `ready_to_close`

## Evaluation Result

- Status: `ready_to_close`
- Requires rework: no
- Gaps: none
- Improvement idea: later add quality checks for semantic completeness, not only target presence.

## Related Artifacts

- `_history/user-requests/2026/2026-05-31.ko.md`
- `_history/user-requests/2026/2026-05-31.en.md`
- `_docs/user-request-summary-policy.ko.md`
- `_templates/user-request-summary/user-request-summary.ko.md`
- `_history/web-searches/2026/2026-05-31-user-request-summaries.ko.md`
- `_research/topics/agent-memory/2026-05-31-user-request-summaries.ko.md`
- `_history/plans/2026/2026-05-31-user-request-summaries.ko.md`
