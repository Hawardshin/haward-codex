# Work Evaluation Report: Hallucination Prevention Structure

## Initial Instruction

- "할루시네이션이 안 나도록 하는 방법도 역시 다해줘."

## Result Summary

- Added Korean and English hallucination prevention policy docs.
- Saved reusable research notes under `_research/topics/agent-reliability/`.
- Added a prompt and workflow for grounding factual claims in final outputs.
- Added Python-based `hallucination-guard-agent` and `check-grounding` CLI to `agent-platform`.
- Added `grounding_checks` to `work-evaluator-agent` input so evaluation reports can track factual grounding checks.
- Updated persistent instructions, workspace rules, operating philosophy, operations index, and maps.

## References Checked

- OpenAI ChatGPT and fake citations: https://help.openai.com/en/articles/8313428-chatgpt-and-fake-citations
- OpenAI Structured Outputs: https://platform.openai.com/docs/guides/structured-outputs
- OpenAI File Search docs: https://developers.openai.com/api/docs/guides/tools-file-search
- OpenAI Web Search docs: https://developers.openai.com/api/docs/guides/tools-web-search
- Anthropic Reduce hallucinations: https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- RAG paper: https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html
- Chain-of-Verification: https://arxiv.org/abs/2309.11495
- SelfCheckGPT: https://aclanthology.org/2023.emnlp-main.557/
- Self-RAG: https://arxiv.org/abs/2310.11511
- Plan history: `_history/plans/2026/2026-05-31-hallucination-prevention.en.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/hallucination-prevention-grounding.json`
- Result: `ready_to_publish`
- Claims: 3
- Evidence items: 5
- Gaps: none

## Verification

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23 tests passed
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/hallucination-prevention-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/hallucination-prevention-evaluation.json`: `ready_to_close`
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated

Some Python commands emitted a Homebrew shellenv `/bin/ps: Operation not permitted` warning, but the commands succeeded.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- Instruction alignment: hallucination prevention was added across shared rules, prompt/workflow, Python agent, and evaluation input.

## Gaps

- None

## Improvements

- Future high-risk domain projects can add stricter source policies and domain-specific evaluation sets.

## Follow-Up Actions

- No blocking follow-up remains for this change.

## Rework Result

- The first unit test run failed because a caveated uncertainty test used an inappropriate `external_fact` claim type.
- The test was corrected to use `inference`, then the full test suite passed.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-hallucination-prevention.en.md`
- Created: 2026-05-31
