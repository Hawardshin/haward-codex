# Work Evaluation - Search Insight Planning

## Initial Instruction

> AI is good at simple probabilistic guessing, but I want to use web search and various search methods to derive the needed insights and create plans.

## Work Summary

- Added `research-insight-planner-agent` as a declarative agent.
- Added a Python helper and `plan-from-research` CLI to check search questions, search channels, sources, insights, plan steps, and validation steps.
- Added a structured planning input template and unit tests.
- Added search insight planning policy docs, a prompt, and a workflow.
- Researched RAG, ReAct, IRCoT, and official OpenAI search tool docs, then saved Korean and English research notes under `_research/`.
- Updated persistent instructions, workspace rules, the operations index, start workflow, research templates, and research capture policy with the search-to-insight-to-plan rule.

## References Checked First

- ReAct: https://arxiv.org/abs/2210.03629
- RAG: https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html
- IRCoT: https://arxiv.org/abs/2212.10509
- OpenAI Web Search docs: https://developers.openai.com/api/docs/guides/tools-web-search
- OpenAI File Search docs: https://developers.openai.com/api/docs/guides/tools-file-search
- `AGENTS.md`
- `README.md`
- `_docs/workspace-rules.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/workflows/60-capture-research.md`

## Knowledge Base Validation

Internal operating docs were validated with `knowledge-skeptic-agent` before being used as evidence.

- Status: `ready_to_reference`
- Internal sources checked: 6
- Contrary signals: none
- Conclusion: the internal references can support this structural change.

## Search-Backed Planning Validation

This work plan was checked with `research-insight-planner-agent`.

- Status: `ready_to_plan`
- Search questions: 2
- Search channels: 4
- Sources checked: 9
- Insights: 3
- Plan steps: 3
- Validation steps: 4

## Verification

- `python3 _tools/workspace-index/src/workspace_index.py --check` passed
- `python3 _tools/task-board/src/task_board.py --check` passed
- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 18 tests) passed
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) passed
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json` passed
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/search-insight-knowledge-validation.json` passed
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /private/tmp/search-insight-plan.json` passed
- `git diff --check` passed
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/search-insight-planning-evaluation.json` returned `ready_to_close`

Some Python commands printed Homebrew shellenv's `/bin/ps: Operation not permitted` warning, but tests and CLI results were unaffected.

## Evaluation Result

- Status: `ready_to_close`
- Rework required: no
- Gaps found: none
- Improvement idea: later connect the planner to an actual search runtime and add source reliability scoring once the platform runner exists.

## Conclusion

The repository now has an operating structure for deriving insights from web search and other search channels before creating plans, instead of relying only on the model's internal guess.
