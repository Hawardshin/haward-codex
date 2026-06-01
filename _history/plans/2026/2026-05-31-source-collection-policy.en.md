# Source Collection Policy Plan

## Initial Request

- "웹 검색의 경우 공신력이 높은 자료들을 최대한 많이 모아서 진행하고 특히 외국 기술블로그 그런 것들 조사 아티클 조사 좋아요 수가 많은 아티클이나 링크드인 논문등이나 그런 것들도 있지 그런걸 모으는거야."

## Plan Purpose

- Add a rule for collecting many high-authority sources, international tech blogs, analysis articles, papers, LinkedIn/community signals, and popularity signals during web search.
- Separate social/popularity signals from factual evidence by treating them as adoption or discovery signals.

## Search Questions

- What criteria evaluate web source authority and credibility?
- What supports using technical blogs and grey literature alongside papers in software engineering?
- How should likes, LinkedIn reactions, stars, and popularity signals be used?

## Search Channels

- Web search
- Official docs and university guides
- Research papers
- Repository search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| Harvard Evaluating Web Sources | https://usingsources.fas.harvard.edu/evaluating-web-sources-0 | Authority, accuracy, corroboration, currency |
| Google E-E-A-T update | https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t | Experience, expertise, authority, trust |
| Google Helpful Reliable Content | https://developers.google.com/search/docs/fundamentals/creating-helpful-content | Sourcing and author/site background |
| MLR guidelines in software engineering | https://arxiv.org/abs/1707.02553 | Combining grey literature and formal literature |
| OpenAI Academy Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | Current information and source review |

## Knowledge-Base Validation

- Internal operating docs are used as evidence, so validate them with `knowledge-skeptic-agent`.
- Validation targets: `_docs/policies/web-first-work-policy.ko.md`, `_ops/workflows/05-web-first-intake.md`, `_ops/workflows/55-research-insight-planning.md`, `AGENTS.md`, `README.md`
- Expected result: `ready_to_reference`

## Insights

- Official docs and papers alone can miss practitioner adoption and field constraints.
- Technical blogs and analysis articles provide applied context, but need quality assessment and corroboration.
- Likes, shares, comments, LinkedIn, GitHub stars, and HN points are popularity or adoption signals, not standalone factual evidence.

## Plan Steps

1. Add `_docs/policies/source-collection-policy.ko.md` and `.en.md`.
2. Update web-first policy, web-first prompt/workflow, and research insight prompt/workflow with source bundle guidance.
3. Update persistent instructions, workspace rules, README, AGENTS, and ops index.
4. Save research notes under `_research/topics/agent-planning/`.
5. Save plan, evaluation, and history records.
6. Regenerate maps, run tests/evaluators, commit, and push.

## Excluded Or Deferred Options

- Do not implement a source-quality evaluator yet. Add it to `agent-platform` if scoring becomes repetitive.
- Do not automate social scraping yet. First persist search and manual evaluation criteria.

## Risks And Uncertainty

- Collecting many sources increases research time.
- Popularity signals are vulnerable to marketing and platform bias.
- Some good sources may sit behind paywalls.

## Verification Methods

- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input.json>`
- `git diff --check`

## Plan Change History

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | Split source collection into a dedicated policy | Keep web-first intake and source-quality criteria reusable |
