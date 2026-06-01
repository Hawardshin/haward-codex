# Web-First Work Policy Research

## Research Purpose

Record evidence and limits for the operating rule that every new user instruction starts with web search.

## Access Date

- 2026-05-31

## Sources

| Source | URL | Notes |
| --- | --- | --- |
| OpenAI Academy: Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | Reference for current information, detailed information, and reviewing linked sources |
| OpenAI Knowledge Retrieval blueprint | https://openai.com/solutions/blueprints/knowledge-retrieval/ | Reference architecture using grounded answers, citations, and evals together |
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html | Evidence for combining model memory with retrieved external memory |
| Anthropic: Reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | Reference for citation checks, uncertainty, and validating important information |

## Summary

- Web search is useful for quickly checking current information and external references.
- Search results can still be wrong, so source links should be reviewed before use.
- RAG research supports combining internal model knowledge with retrieved external knowledge for knowledge-intensive tasks.
- Hallucination prevention should combine search with citations, evals, claim grounding, and uncertainty labeling.

## Insights

- Follow the user's preference by starting every task with web-first intake, while varying search depth by task type.
- Simple local tasks can use a lightweight web search before continuing with repository verification.
- Policy, code, open-source, and current-information work should reflect search results in plans and evaluations.
- Save only reusable search findings under `_research/`; record irrelevant search briefly when useful.

## Plan Impact

- Add `_docs/web-first-work-policy.*.md`.
- Add `_ops/prompts/05-web-first-intake.md` and `_ops/workflows/05-web-first-intake.md`.
- Update start workflow and persistent instructions to require web search first.
- Keep risk-based search policy as the rule for search depth after web-first intake.

## Reliability Judgment

- The direction is well supported by OpenAI/Anthropic official materials and the NeurIPS RAG paper.
- Product-specific capabilities can change, so future tasks should search again.

## Uncertainty And Contrary Signals

- Requiring web search for every task can add latency and cost.
- Sensitive information must not be placed directly into search queries.
- For unrelated local tasks, files, tests, and command outputs may be stronger evidence than web results.

## Applicability

- Applies as the first step for every new user instruction.
- Applies to project-specific work while preserving project ownership boundaries.

## Related Work

- `_docs/policies/web-first-work-policy.en.md`
- `_ops/workflows/05-web-first-intake.md`
- `_ops/prompts/05-web-first-intake.md`

## Next Checks

- Add a source-quality evaluator in `agent-platform` if web search quality scoring becomes repetitive.
