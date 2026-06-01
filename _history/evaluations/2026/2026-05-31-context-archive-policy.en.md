# Work Evaluation Report: Context Archive Policy

## Initial Instruction

When you believe the context is getting full, summarize and archive it well, and structure things so you operate from documents.

## Work Summary

- Added `_history/context-archives/` as the long-context resume packet store.
- Added Korean and English context archive templates under `_templates/context-archive/`.
- Added `_docs/policies/context-archive-policy.ko.md` and `.en.md` with saturation signals, standard procedure, and what not to preserve.
- Added `_ops/workflows/45-context-archive.md` and strengthened `_ops/prompts/50-compress-context.md`.
- Added `context_archiving_occurred` and `context_archive_targets` to `work-evaluator-agent`.
- Added context archive policy as a warm required anchor in the memory bootstrap manifest.
- Saved web search records, research notes, plan records, and a context archive packet for this change set.

## References Checked

- [ReadAgent](https://huggingface.co/papers/2402.09727)
- [Evaluating Very Long-Term Conversational Memory of LLM Agents](https://arxiv.org/abs/2402.17753)
- [Active Context Compression](https://arxiv.org/abs/2601.07190)
- [Microsoft Agent Framework Memory and Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory)
- `_docs/operating-models/context-management.md`
- `_docs/policies/memory-bootstrap-policy.ko.md`

## Web Search Records

- `_history/web-searches/2026/2026-05-31-context-archive-policy.ko.md`
- `_history/web-searches/2026/2026-05-31-context-archive-policy.en.md`

## Context Archives

- `_history/context-archives/2026/2026-05-31-context-archive-policy.ko.md`
- `_history/context-archives/2026/2026-05-31-context-archive-policy.en.md`

## Changed Files

- `_docs/policies/context-archive-policy.ko.md`, `_docs/policies/context-archive-policy.en.md`
- `_history/context-archives/README.ko.md`, `_history/context-archives/README.en.md`
- `_templates/context-archive/context-archive.ko.md`, `_templates/context-archive/context-archive.en.md`
- `_ops/workflows/45-context-archive.md`
- `_ops/prompts/50-compress-context.md`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `agent-platform/tests/test_work_evaluator.py`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 51 tests OK
- `python3 -m json.tool configs/evaluation/work-evaluation-template.json`: OK
- `python3 -m json.tool configs/agents/work-evaluator-agent.json`: OK
- `python3 -m json.tool configs/memory/bootstrap-manifest.json`: OK
- `python3 -m json.tool _ops/coordination/status.json`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `git diff --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/context-archive-policy-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/context-archive-policy-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/context-archive-policy-eval.json`: `ready_to_close`

## Evaluation Status

- Status: `ready_to_close`
- Requires rework: `false`

## Gaps

- None.

## Improvement Ideas

- A future Python helper could generate context archive packets from recent git history, maps, and coordination status.

## Rework Result

- No rework required.

## Links

- Plan record: `_history/plans/2026/2026-05-31-context-archive-policy.en.md`
- Work summary: `_history/work-summaries/2026/2026-05-31.en.md`
- Research note: `_research/topics/agent-memory/2026-05-31-context-archive-policy.en.md`
