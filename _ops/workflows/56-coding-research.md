# Coding Research Workflow

## Purpose

코딩 작업 전에 웹과 여러 검색 채널로 기술 근거를 모으고, 구현으로 넘어가기 위한 표준 질문까지 답한다.

## Sequence

1. Apply [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before local planning.
2. Write the coding research goal and the owning project or shared workspace boundary.
3. Choose one or more research types: `api_docs`, `library_selection`, `bug_root_cause`, `architecture`, `performance`, `security`, `migration`, `testing`, `open_source`, `implementation_pattern`.
4. Search the web for current external evidence.
5. Search at least one additional channel: repository docs, official docs, code, package registries, papers, or open-source repos.
6. Record `source_types` explicitly and use at least three distinct non-`other` source types.
7. Include at least one authoritative source type: `official`, `paper`, `standard`, or `open_source`.
8. Include at least one practical/adoption/contrary source type: `open_source`, `tech_blog`, `analysis`, `community`, `social`, `news`, or `contrary`.
9. For broad or repeated research, apply [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md) and use `_tools/source-collector/` when useful.
10. Separate factual evidence from adoption signals such as stars, likes, comments, Hacker News points, Reddit activity, or LinkedIn reactions.
11. Validate any internal knowledge-base references with `knowledge-skeptic-agent`.
12. Synthesize findings into options, trade-offs, and a recommendation.
13. Answer all post-research questions:
    - `what_was_verified`
    - `best_option`
    - `why_this_option`
    - `alternatives_rejected`
    - `implementation_impact`
    - `risks_and_unknowns`
    - `validation_plan`
    - `reusable_knowledge`
    - `next_action`
14. Save the plan process under `_history/plans/YYYY/`.
15. Capture reusable research under `_research/` or promote repeatable assets into `_templates/`, `_tools/`, or `_skills/`.
16. Run `coding-research-agent` with `complete-coding-research`.
17. If the result is `more_research_required`, resolve the listed gaps before implementation.
18. If the result is `ready_to_implement`, proceed with the implementation plan and later close with `work-evaluator-agent`.

## Rule

Coding research is complete only when it uses diverse source types, produces a recommended next action, names validation steps, saves plan history, and answers the standard post-research questions.
