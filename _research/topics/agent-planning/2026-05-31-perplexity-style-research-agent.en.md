# Perplexity-Style Core Research Agent

## Purpose

This note captures Perplexity-style answer-engine, RAG, and citation-verification references for making the research agent a core platform capability. The target is not a search-summary agent; it is a pipeline for search, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review.

## Sources Checked

| Source | Type | Checked | Reusable Point |
| --- | --- | --- | --- |
| [Perplexity Sonar API](https://docs.perplexity.ai/docs/sonar/quickstart) | official docs | 2026-05-31 | Web-grounded responses, search options, streaming, API compatibility |
| [Perplexity API Platform Help](https://www.perplexity.ai/help-center/en/articles/10354842-what-is-the-perplexity-api-platform) | official docs | 2026-05-31 | Large-scale retrieval, ranked structured results, cited answers, source customization |
| [Perplexity Agent API Presets](https://docs.perplexity.ai/docs/agent-api/presets) | official docs | 2026-05-31 | Direct answers, inline citations, search before answering, claim-level citation rules |
| [Self-RAG](https://arxiv.org/abs/2310.11511) | paper | 2026-05-31 | Retrieve when needed and critique generated content through self-reflection |
| [MA-RAG](https://arxiv.org/abs/2505.20096) | paper | 2026-05-31 | Planner, Extractor, and QA role separation for ambiguous and multi-hop research |
| [Provenance RAG Fact Checker](https://arxiv.org/abs/2411.01022) | paper | 2026-05-31 | Trace generated claims back to context chunks for factuality checking |
| [RAGTruth](https://arxiv.org/abs/2401.00396) | paper/benchmark | 2026-05-31 | RAG can still produce unsupported or contradictory claims |
| [The Atlantic: Generative AI Can't Cite Its Sources](https://www.theatlantic.com/technology/archive/2024/06/chatgpt-citations-rag/678796/) | analysis article | 2026-05-31 | Citations and links can fail to support the exact generated claim |

## Insights

- A Perplexity-like answer engine is built around source-grounded answers, visible references, source control, and inspectability, not a plain result list.
- The research agent should start with web search, then add repository, official docs, papers, open-source/code, and community signals as needed.
- Search results are raw inputs. The durable workflow should include query understanding, retrieval, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review.
- Citations are verification handles, not proof. The agent must check whether each cited source supports the exact claim.
- RAG and answer engines can still produce hallucinations, unsupported claims, and citation mismatches, so `hallucination-guard-agent` and `knowledge-skeptic-agent` remain necessary.
- Role separation is useful for complex research: Planner defines questions and search plan, Extractor pulls evidence, Synthesizer creates the answer or plan, and Skeptic checks contradictions and citation gaps.

## Platform Impact

- New config: `agent-platform/configs/research/research-agent-profile.json`
- General research readiness fields:
  - `research_profile_paths`
  - `answer_engine_stages`
  - `citation_requirements`
- Required stages:
  - `query_understanding`
  - `search_retrieval`
  - `source_ranking`
  - `evidence_extraction`
  - `synthesis`
  - `citation_grounding`
  - `skeptic_review`
- The research profile belongs in memory-bootstrap hot context so future sessions do not forget the core research-agent rules.

## Caveats

- Perplexity's internal ranking algorithm is not fully public, so this platform should borrow only public, documented patterns.
- Inline citation formats vary by product. This repository treats claim-to-source grounding as more important than the final citation style.
- Citation verification should combine claim extraction, reverse source checks, and `hallucination-guard-agent`; full automation alone is not enough yet.
