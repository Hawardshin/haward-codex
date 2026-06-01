# Perplexity-Style Core Research Agent Plan

## Initial Instruction

The user said the research agent is a core capability and asked to reference structures such as Perplexity.

## Objective

Strengthen `research-insight-planner-agent` from a search-summary helper into a core Perplexity-style answer-engine research agent.

## Search Questions

- How do Perplexity/Sonar structure search-grounded answers and citations?
- What verification stages reduce citation hallucination in RAG and answer engines?
- What config, fields, and documentation rules should be added so future sessions do not forget this research-agent structure?

## Search Channels

- Web search
- Perplexity official docs
- arXiv/paper search
- Repository search
- Existing policy and history review

## Key Sources Checked

- [Perplexity Sonar API](https://docs.perplexity.ai/docs/sonar/quickstart)
- [Perplexity API Platform Help](https://www.perplexity.ai/help-center/en/articles/10354842-what-is-the-perplexity-api-platform)
- [Perplexity Agent API Presets](https://docs.perplexity.ai/docs/agent-api/presets)
- [Self-RAG](https://arxiv.org/abs/2310.11511)
- [MA-RAG](https://arxiv.org/abs/2505.20096)
- [Provenance RAG Fact Checker](https://arxiv.org/abs/2411.01022)
- [RAGTruth](https://arxiv.org/abs/2401.00396)
- [The Atlantic: Generative AI Can't Cite Its Sources](https://www.theatlantic.com/technology/archive/2024/06/chatgpt-citations-rag/678796/)
- `agent-platform/src/agent_platform/planning/research_insight_planner.py`
- `agent-platform/configs/research/source-registry.json`
- `_docs/policies/search-insight-planning-policy.ko.md`
- `AGENTS.md`

## Insights

- The important Perplexity-like pattern is not just "search then answer"; it is retrieval, source ranking, source customization, citation, and inspectability.
- RAG and citations can still produce unsupported claims and citation mismatches, so grounding and skeptic review need dedicated stages.
- General research should record which profile/config shaped the plan, similar to coding research.
- The rule belongs in memory-bootstrap hot context because future sessions need it at startup.

## Plan Steps

1. Add `research-agent-profile.json` as a self-documenting answer-engine config with stage, source-ranking, and citation-grounding rules.
2. Add `research_profile_paths`, `answer_engine_stages`, and `citation_requirements` to `research-insight-planner-agent` input and readiness checks.
3. Update the planning template, agent spec, docs, prompts, workflows, persistent rules, and memory bootstrap manifest.
4. Save Korean and English research notes about the Perplexity-style research structure.
5. Run verification, save evaluation reports, update history/maps, commit, and push.

## Validation Plan

- `agent-platform` unit tests
- `plan-from-research` readiness check
- `check-config-contract` for memory/source/research/coding configs
- `check-memory-bootstrap`
- JSON syntax checks
- source collector/tool template tests
- workspace map and task board checks
- `hallucination-guard-agent`, `knowledge-skeptic-agent`, and `work-evaluator-agent`

## Risks And Unknowns

- Perplexity's internal ranking algorithm is not fully public, so the implementation only uses publicly documented patterns.
- Citation verification starts with claim-level grounding rules and evaluators rather than full automation.

## Change History

- 2026-05-31: Initial plan. Chose to promote the research agent into a core answer-engine profile.
