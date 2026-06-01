# Search Insight Planning Policy

## Purpose

Every new instruction starts with web search. Important plans should not be created from the model's internal probabilistic guess alone. Gather evidence through web search, repository search, official docs, papers, code/package references, and other search channels, then convert that evidence into insights before creating the execution plan.

The research agent is a core platform capability. Its default shape is a Perplexity-style answer engine: it does not merely summarize search results, but moves through query understanding, search/retrieval, source ranking, evidence extraction, synthesis, citation grounding, and skeptic review.

The philosophical basis lives in [_philosophy/agent-operating-philosophy.en.md](../../_philosophy/agent-operating-philosophy.en.md). This document turns that philosophy into an execution policy.

## Principles

- Start every new user instruction with web search.
- For current information or external facts, review source content and record the access date.
- Use web search plus at least one other search channel.
- The default research profile is `agent-platform/configs/research/research-agent-profile.json`.
- Use `agent-platform/configs/research/source-discovery-registry.json` for broader search origins.
- For marketing, market sizing, consumer insight, books/theory, surveys, or quantitative evidence, include `agent-platform/configs/research/marketing-evidence-profile.json` in `research_profile_paths`.
- For Korean user reviews or local-market decisions, prioritize Naver Map, Kakao Map, Naver Blog/Search, and official pages, then score candidate quality with `_tools/korean-local-review/`.
- Planning input must record `research_profile_paths`, `answer_engine_stages`, and `citation_requirements`.
- Record material source values, config values, claims, review signals, assumptions, and planning constraints in `source_value_provenance`.
- Connect each material execution plan step to checked sources, repository evidence, or explicit assumptions through `plan_evidence`.
- `answer_engine_stages` must include `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, and `skeptic_review`.
- Do not copy search results directly into a plan; turn evidence into decision-relevant insights.
- Rank sources by authority, freshness, independence, relevance, methodology, and fit to the claim type.
- Treat citations as verification handles, not proof; check that each cited source supports the exact claim.
- Validate internal knowledge-base references with `knowledge-skeptic-agent`.
- Save reusable external references under `_research/`.
- Save the planning process under `_history/plans/YYYY/`.
- Include both execution steps and validation steps in the plan.
- For coding research, use `coding-research-agent` after general insight planning to answer implementation close-out questions before coding.

## Search Channels

- Web search: current information, current docs, external examples
- Repository search: existing policy, history, project docs
- Official documentation search: APIs, libraries, product specs
- Paper or technical reference search: agent design and retrieval/reasoning patterns
- Book, academic, survey, and statistics search: theory frameworks, marketing research, public surveys, official statistics, and market-size evidence
- Code/package search: implementation examples, maintenance status, licenses

## Output

Before execution, record:

- objective
- search questions
- search channels used
- sources checked
- research profile paths
- answer engine stages
- citation requirements
- source value provenance
- plan evidence
- insights
- plan steps
- validation steps
- remaining uncertainty
- reusable research capture target
- plan history target

## Command

Run from `agent-platform/`.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json
PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json
```

## Plan History

Save the planning process under:

```text
_history/plans/YYYY/YYYY-MM-DD-<slug>.ko.md
```

If the plan changes during execution, record the reason in the same file's change history.
