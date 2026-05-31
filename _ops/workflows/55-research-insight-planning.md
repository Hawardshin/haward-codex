# Research Insight Planning Workflow

## Purpose

웹 검색과 여러 검색 채널을 통해 근거를 모으고, 그 근거에서 인사이트를 도출한 뒤 실행 가능한 계획을 만든다.

## Sequence

1. Write the planning objective.
2. Write the search questions that must be answered before execution.
3. Record `agent-platform/configs/research/research-agent-profile.json` and the source registry in `research_profile_paths`.
4. Run the answer-engine stages: `query_understanding`, `search_retrieval`, `source_ranking`, `evidence_extraction`, `synthesis`, `citation_grounding`, and `skeptic_review`.
5. Search the web for current or external evidence.
6. Search at least one additional channel: repository docs, official docs, papers, code, package registries, or prior work.
7. Prefer primary sources and official references when available.
8. For research-heavy work, apply [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md): include official sources, papers, international tech blogs, open-source repos, analysis articles, community/social signals, and contrary examples.
9. Rank sources by authority, freshness, independence, relevance, methodology, and fit to the claim type.
10. Record popularity and adoption signals separately from factual evidence.
11. Extract only the evidence, contradictions, examples, and constraints that change the plan.
12. Record `citation_requirements` for how material factual claims will be grounded to checked sources.
13. If source volume is high or repeated, normalize the source bundle with `_tools/source-collector/`.
14. If internal knowledge-base content is used, validate it with `knowledge-skeptic-agent`.
15. Turn source findings into concise insights that affect the plan.
16. Create plan steps and validation steps.
17. Choose a plan history path under `_history/plans/YYYY/`.
18. Save the planning process using `_templates/plan-history/`.
19. Record risks, unknowns, and whether reusable research should be captured under `_research/`.
20. Run `research-insight-planner-agent` or use its prompt with `plan_history_targets` set.
21. If the result is `more_research_required`, resolve the listed gaps before execution.
22. If the plan changes during execution, update the same plan history file with the change and reason.

For coding-specific research, route through [_ops/workflows/56-coding-research.md](56-coding-research.md) after the general search-to-insight step so the standard post-research questions are answered before implementation.

## Rule

Search is not the final answer. Search is raw input for insight extraction, planning, validation, and future documentation.

Citation is not proof by itself. It is a handle for verification, so check that the source actually supports the claim before relying on it.

The planning process is also an artifact. Do not leave important plans only in chat or transient scratch files.
