# Work Evaluation Report: Source Collection Policy

## Initial Instruction

- "웹 검색의 경우 공신력이 높은 자료들을 최대한 많이 모아서 진행하고 특히 외국 기술블로그 그런 것들 조사 아티클 조사 좋아요 수가 많은 아티클이나 링크드인 논문등이나 그런 것들도 있지 그런걸 모으는거야."

## Result Summary

- Added Korean and English source collection policy docs for collecting high-authority evidence and practitioner signals during web search.
- Defined source bundle targets: official sources, papers, open-source repositories, international tech blogs, analysis articles, community/social signals, and contrary examples.
- Added a rule that likes, shares, comments, GitHub stars, Hacker News points, Reddit activity, and LinkedIn reactions are adoption/discovery signals, not standalone factual evidence.
- Updated web-first intake and research insight planning prompts/workflows.
- Saved research notes, plan history, and evaluation reports.

## References Checked

- Harvard Evaluating Web Sources: https://usingsources.fas.harvard.edu/evaluating-web-sources-0
- Google E-E-A-T update: https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t
- Google Helpful Reliable Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Multivocal literature review guidelines: https://arxiv.org/abs/1707.02553
- OpenAI Academy Web Search: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/
- Plan history: `_history/plans/2026/2026-05-31-source-collection-policy.en.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/source-collection-grounding.json`
- Result: `ready_to_publish`
- Gaps: none

## Verification

- Web search was performed before local file edits.
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/source-collection-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/source-collection-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/source-collection-evaluation.json`: `ready_to_close`
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23 tests passed
- `python3 _tools/workspace-index/src/workspace_index.py`: maps regenerated
- `python3 _tools/task-board/src/task_board.py`: coordination boards regenerated

Some Python commands emitted a Homebrew shellenv `/bin/ps: Operation not permitted` warning, but the commands succeeded.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- Instruction alignment: the broad-source collection rule is now persisted in policy, prompts, workflows, and durable instructions.

## Gaps

- None

## Improvements

- If source scoring becomes repetitive, add a source-quality evaluator to `agent-platform`.

## Follow-Up Actions

- No blocking follow-up remains.

## Rework Result

- No rework required.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-source-collection-policy.en.md`
- Created: 2026-05-31
