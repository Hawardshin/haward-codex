# Work Evaluation Report: Web-First Work Policy

## Initial Instruction

- "앞으로 내가 하는 모든 지시는 다 웹 검색을 먼저 하고 하는거야."

## Result Summary

- Added Korean and English policy docs requiring every new user instruction to start with web search.
- Added a web-first intake prompt and workflow under `_ops/`.
- Saved Korean and English research notes under `_research/topics/agent-planning/`.
- Updated `AGENTS.md`, `README.md`, persistent instructions, workspace rules, platform operating model, start workflow, prompt router, search insight planning policy, hallucination prevention policy, and philosophy docs.
- Marked the older risk-based search insight in the hallucination research note as search-depth guidance under the newer web-first policy.

## References Checked

- OpenAI Academy Web search: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/
- OpenAI Knowledge Retrieval blueprint: https://openai.com/solutions/blueprints/knowledge-retrieval/
- RAG NeurIPS paper: https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html
- Anthropic Reduce hallucinations: https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Plan history: `_history/plans/2026/2026-05-31-web-first-work-policy.en.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/web-first-grounding.json`
- Result: `ready_to_publish`
- Gaps: none

## Verification

- Web search was performed before local file edits.
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/web-first-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/web-first-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/web-first-evaluation.json`: `ready_to_close`
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23 tests passed
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated

Some Python commands emitted a Homebrew shellenv `/bin/ps: Operation not permitted` warning, but the commands succeeded.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- Instruction alignment: the web-first rule is now persisted in policy, prompt, workflow, and start sequence.

## Gaps

- None

## Improvements

- If web search quality evaluation becomes repetitive, add a source-quality evaluator to `agent-platform`.

## Follow-Up Actions

- No blocking follow-up remains.

## Rework Result

- No rework required.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-web-first-work-policy.en.md`
- Created: 2026-05-31
