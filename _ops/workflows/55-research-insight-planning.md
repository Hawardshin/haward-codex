# Research Insight Planning Workflow

## Purpose

웹 검색과 여러 검색 채널을 통해 근거를 모으고, 그 근거에서 인사이트를 도출한 뒤 실행 가능한 계획을 만든다.

## Sequence

1. Write the planning objective.
2. Write the search questions that must be answered before execution.
3. Search the web for current or external evidence.
4. Search at least one additional channel: repository docs, official docs, papers, code, package registries, or prior work.
5. Prefer primary sources and official references when available.
6. For research-heavy work, apply [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md): include official sources, papers, international tech blogs, open-source repos, analysis articles, community/social signals, and contrary examples.
7. Record popularity and adoption signals separately from factual evidence.
8. If source volume is high or repeated, normalize the source bundle with `_tools/source-collector/`.
9. If internal knowledge-base content is used, validate it with `knowledge-skeptic-agent`.
10. Turn source findings into concise insights that affect the plan.
11. Create plan steps and validation steps.
12. Choose a plan history path under `_history/plans/YYYY/`.
13. Save the planning process using `_templates/plan-history/`.
14. Record risks, unknowns, and whether reusable research should be captured under `_research/`.
15. Run `research-insight-planner-agent` or use its prompt with `plan_history_targets` set.
16. If the result is `more_research_required`, resolve the listed gaps before execution.
17. If the plan changes during execution, update the same plan history file with the change and reason.

## Rule

Search is not the final answer. Search is raw input for insight extraction, planning, validation, and future documentation.

The planning process is also an artifact. Do not leave important plans only in chat or transient scratch files.
