# Research Insight Planning Workflow

## Purpose

웹 검색과 여러 검색 채널을 통해 근거를 모으고, 그 근거에서 인사이트를 도출한 뒤 실행 가능한 계획을 만든다.

## Sequence

1. Write the planning objective.
2. Write the search questions that must be answered before execution.
3. Search the web for current or external evidence.
4. Search at least one additional channel: repository docs, official docs, papers, code, package registries, or prior work.
5. Prefer primary sources and official references when available.
6. If internal knowledge-base content is used, validate it with `knowledge-skeptic-agent`.
7. Turn source findings into concise insights that affect the plan.
8. Create plan steps and validation steps.
9. Record risks, unknowns, and whether reusable research should be captured under `_research/`.
10. Run `research-insight-planner-agent` or use its prompt.
11. If the result is `more_research_required`, resolve the listed gaps before execution.

## Rule

Search is not the final answer. Search is raw input for insight extraction, planning, validation, and future documentation.
