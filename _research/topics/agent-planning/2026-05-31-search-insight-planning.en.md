# Search Insight Planning

## Research Purpose

- Record evidence for an operating rule that avoids planning from the model's internal probabilistic guess alone and instead derives insights from web search and multiple search channels.

## Access Date

- 2026-05-31

## Sources

| Source | URL | Notes |
| --- | --- | --- |
| ReAct: Synergizing Reasoning and Acting in Language Models | https://arxiv.org/abs/2210.03629 | Agent pattern that interleaves reasoning and tool/search actions |
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html | Foundation for combining model memory with external retrieval |
| Interleaving Retrieval with Chain-of-Thought Reasoning for Knowledge-Intensive Multi-Step Questions | https://arxiv.org/abs/2212.10509 | Evidence that one-shot retrieval can be insufficient for multi-step questions |
| OpenAI Web Search API docs | https://developers.openai.com/api/docs/guides/tools-web-search | Implementation reference for web search tools, sources, domain filters, and live access |
| OpenAI File Search API docs | https://developers.openai.com/api/docs/guides/tools-file-search | Implementation reference for document/file search channels |

## Key Summary

- RAG-style systems avoid relying only on parametric model knowledge and use external retrieval to improve knowledge-intensive work.
- ReAct treats reasoning and tool actions as an interleaved process, allowing the agent to gather external information while solving a task.
- IRCoT argues that multi-step work may need retrieval after intermediate reasoning because each step can change what should be searched next.
- OpenAI's official docs show web and file search as tool channels and highlight controls such as sources and domain filters.

## Derived Insights

- A planning agent should not treat search as the final answer; it should record questions, sources, reliability, freshness, and contrary signals, then synthesize insights.
- Complex plans fit an iterative search, interpretation, additional search, and planning loop better than one-shot retrieval.
- Web search should be paired with repository search, official docs, papers, code search, or package registry search.
- Repository research notes must still be validated with `knowledge-skeptic-agent` because they can become stale or wrong.

## Planning Impact

- `research-insight-planner-agent` requires web search plus at least one other search channel.
- Planning inputs must include `sources_checked`, `insights`, `plan_steps`, `validation_steps`, and `risks_or_unknowns`.
- If internal knowledge-base sources are used, `knowledge_validation_status=ready_to_reference` is required.
- Reusable external references should be saved under `_research/topics/`.

## Reliability Assessment

- The evidence is strong because it relies on papers and official documentation.
- OpenAI API details can change quickly, so implementation work must recheck the current official docs.

## Uncertainty And Contrary Signals

- Specific search APIs or model names may change over time.
- Research results can vary by task, model, and retrieval quality.
- More search does not automatically create a better plan; source quality and insight extraction matter.

## Applicability

- Agent platform planning
- Open-source or tool selection
- Work requiring current docs or external examples
- Work that reuses prior research notes

## Related Work

- `agent-platform/configs/agents/research-insight-planner-agent.json`
- `_ops/workflows/55-research-insight-planning.md`
- `_docs/search-insight-planning-policy.en.md`

## Follow-Up Checks

- Before wiring real web search APIs into the platform runtime, compare the current OpenAI docs and alternative search APIs again.
- Consider adding a source reliability scoring schema for search results.
