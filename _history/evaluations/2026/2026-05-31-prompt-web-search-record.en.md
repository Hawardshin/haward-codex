# Work Evaluation Report: Prompt-Level Web Search Records

## Initial Instruction

Always run web search for every prompt, and put that reasoning/search process into text.

## Work Summary

- Added `_ops/prompts/README.ko.md` and `.en.md` as the common web-search contract for every reusable prompt.
- Added the common contract link and web-search record rule to every `_ops/prompts/*.md` prompt.
- Added `_history/web-searches/` and `_templates/web-search-record/` for prompt/task-level queries, sources, weak sources ignored, plan impact, and public decision summaries.
- Added `web_search_record_targets` to `work-evaluator-agent`; missing targets are now blocking gaps.
- Added the web search record policy anchor to the memory bootstrap manifest.
- Updated research notes, plan records, work summaries, operating docs, maps, and coordination board.

## References Checked

- [OpenAI Web search docs](https://platform.openai.com/docs/guides/tools-web-search)
- [Anthropic Search results docs](https://docs.anthropic.com/en/docs/build-with-claude/search-results)
- [Firebase AI Logic: Grounding with Google Search](https://firebase.google.com/docs/ai-logic/grounding-google-search)
- `_docs/policies/web-first-work-policy.ko.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `agent-platform/docs/work-evaluator-agent.md`

## Web Search Records

- `_history/web-searches/2026/2026-05-31-prompt-web-search-record.ko.md`
- `_history/web-searches/2026/2026-05-31-prompt-web-search-record.en.md`

## Changed Files

- `_ops/prompts/README.ko.md`, `_ops/prompts/README.en.md`
- `_history/web-searches/README.ko.md`, `_history/web-searches/README.en.md`
- `_templates/web-search-record/web-search-record.ko.md`, `.en.md`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `agent-platform/tests/test_work_evaluator.py`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- Related operating, history, research, map, and coordination docs

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 49 tests OK
- `python3 -m json.tool configs/evaluation/work-evaluation-template.json`: OK
- `python3 -m json.tool configs/memory/bootstrap-manifest.json`: OK
- `python3 -m json.tool _ops/coordination/status.json`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/prompt-web-search-record-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/prompt-web-search-record-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/prompt-web-search-record-eval.json`: `ready_to_close`

## Evaluation Status

- Status: `ready_to_close`
- Requires rework: `false`

## Gaps

- None.

## Improvement Ideas

- A future runtime could automate web search record creation directly from search tool metadata.

## Rework Result

- No rework required.

## Links

- Plan record: `_history/plans/2026/2026-05-31-prompt-web-search-record.en.md`
- Work summary: `_history/work-summaries/2026/2026-05-31.en.md`
- Research note: `_research/topics/agent-planning/2026-05-31-prompt-web-search-records.en.md`
