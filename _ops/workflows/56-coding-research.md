# Coding Research Workflow

## Purpose

코딩 작업 전에 웹과 여러 검색 채널로 기술 근거를 모으고, 구현으로 넘어가기 위한 표준 질문까지 답한다.

## Sequence

1. Apply [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before local planning.
2. Write the coding research goal and the owning project or shared workspace boundary.
3. Choose one or more research types: `api_docs`, `library_selection`, `bug_root_cause`, `architecture`, `performance`, `security`, `migration`, `testing`, `open_source`, `implementation_pattern`.
4. Select reference configs and record them in `reference_config_paths`, usually `agent-platform/configs/research/source-registry.json` and `agent-platform/configs/research/coding-research-profile.json`.
5. Search the web for current external evidence.
6. Search at least one additional channel: repository docs, official docs, code, package registries, papers, or open-source repos.
7. Inspect relevant open-source repositories, reference implementations, well-structured source trees, examples, and tests before writing source code.
8. If installation is needed, follow [_docs/open-source-installation-policy.ko.md](../../_docs/open-source-installation-policy.ko.md) and [_ops/workflows/58-installation-record.md](58-installation-record.md), then record install scope, command, dependency path, installation record path, security/license review, verification, and rollback.
9. Record `code_reference_sources` with repository URLs, source file paths, test paths, example app paths, or code search results.
10. Record `code_reference_notes` explaining what structure, boundaries, API patterns, error handling, tests, or implementation details are worth adapting or rejecting.
11. Record `source_types` explicitly and use at least three distinct non-`other` source types.
12. Include at least one authoritative source type: `official`, `paper`, `standard`, or `open_source`.
13. Include at least one practical/adoption/contrary source type: `open_source`, `reference_implementation`, `tech_blog`, `analysis`, `community`, `social`, `news`, or `contrary`.
14. For broad or repeated research, apply [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md) and use `_tools/source-collector/` when useful.
15. Separate factual evidence from adoption signals such as stars, likes, comments, Hacker News points, Reddit activity, or LinkedIn reactions.
16. Validate any internal knowledge-base references with `knowledge-skeptic-agent`.
17. Synthesize findings into options, trade-offs, and a recommendation.
18. Answer all post-research questions:
    - `what_was_verified`
    - `best_option`
    - `why_this_option`
    - `alternatives_rejected`
    - `implementation_impact`
    - `risks_and_unknowns`
    - `validation_plan`
    - `reusable_knowledge`
    - `next_action`
19. Save the plan process under `_history/plans/YYYY/`.
20. Capture reusable research under `_research/` or promote repeatable assets into `_templates/`, `_tools/`, or `_skills/`.
21. Run `coding-research-agent` with `complete-coding-research`.
22. If the result is `more_research_required`, resolve the listed gaps before implementation.
23. If the result is `ready_to_implement`, proceed with the implementation plan and later close with `work-evaluator-agent`.

## Rule

Coding research is complete only when it records the source configs it used, inspects concrete code references, uses diverse source types, records any required installation review and installation audit path, produces a recommended next action, names validation steps, saves plan history, and answers the standard post-research questions.
