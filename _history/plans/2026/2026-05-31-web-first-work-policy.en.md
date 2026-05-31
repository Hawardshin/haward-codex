# Web-First Work Policy Plan

## Initial Request

- "앞으로 내가 하는 모든 지시는 다 웹 검색을 먼저 하고 하는거야."

## Plan Purpose

- Persist a rule that every new user instruction starts with web search.
- Avoid conflict with earlier risk-based search policy by always running web-first intake, then varying search depth by task risk.

## Search Questions

- What supports starting work with web search?
- What are the limits and safeguards of always searching first?
- How should this connect to search-backed planning, hallucination prevention, and evaluation?

## Search Channels

- Web search
- Official documentation
- Research paper review
- Repository search

## Sources Checked

| Source | URL or Path | Notes |
| --- | --- | --- |
| OpenAI Academy: Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | Current/detailed information and need to review linked sources |
| OpenAI Knowledge Retrieval blueprint | https://openai.com/solutions/blueprints/knowledge-retrieval/ | Combining grounded answers, citations, and evals |
| RAG NeurIPS paper | https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html | Evidence for retrieval-augmented knowledge |
| Anthropic Reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | Citation checks, uncertainty, validation of important information |
| Existing operating docs | `AGENTS.md`, `_docs/search-insight-planning-policy.ko.md`, `_docs/hallucination-prevention-policy.ko.md`, `_ops/workflows/00-start-here.md` | Existing search and verification structure |

## Knowledge-Base Validation

- Internal operating docs are used as evidence, so validate them with `knowledge-skeptic-agent`.
- Validation targets: `AGENTS.md`, `README.md`, `_docs/search-insight-planning-policy.ko.md`, `_docs/hallucination-prevention-policy.ko.md`, `_ops/workflows/00-start-here.md`
- Expected result: `ready_to_reference`

## Insights

- The user's new instruction is a stronger operating preference than the earlier "search when needed" rule.
- Always start with web search, but keep search depth light for simple local tasks.
- If results are irrelevant or search fails, record that and strengthen local verification.
- If results are useful, save reusable findings under `_research/` and include them in `references_checked`.

## Plan Steps

1. Add `_docs/web-first-work-policy.ko.md` and `.en.md`.
2. Add `_ops/prompts/05-web-first-intake.md` and `_ops/workflows/05-web-first-intake.md`.
3. Update `AGENTS.md`, `README.md`, persistent instructions, workspace rules, platform operating model, start workflow, and prompt router.
4. Update search insight planning and hallucination prevention policies with the web-first rule.
5. Save research notes under `_research/topics/agent-planning/`.
6. Add a later-policy-change note to the hallucination research note so earlier risk-based guidance remains search-depth guidance only.
7. Update maps, history, and evaluation reports.
8. Verify, commit, and push.

## Excluded Or Deferred Options

- Do not add a separate Python agent yet. Operating policy and workflow are the immediate need.
- Do not search with sensitive information verbatim.

## Risks And Uncertainty

- Mandatory search for every task can add latency.
- For unrelated local tasks, files, tests, and command outputs can be stronger evidence than web results.
- Network failures should not silently skip the rule; record failure and strengthen local verification.

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
| 2026-05-31 | Chose to add a separate web-first intake workflow | Make the first step explicit for every task |
