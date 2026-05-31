# Coding Research Workflow

## Purpose

코딩 작업 전에 웹과 여러 검색 채널로 기술 근거를 모으고, 구현으로 넘어가기 위한 표준 질문까지 답한다.

## Sequence

1. Apply [_ops/workflows/05-web-first-intake.md](05-web-first-intake.md) before local planning.
2. Write the coding research goal and the owning project or shared workspace boundary.
3. Choose one or more research types: `api_docs`, `library_selection`, `bug_root_cause`, `architecture`, `performance`, `security`, `migration`, `testing`, `open_source`, `implementation_pattern`.
4. Select reference configs and record them in `reference_config_paths`, usually `agent-platform/configs/research/source-registry.json`, `agent-platform/configs/research/source-discovery-registry.json` when broader global/Korean/India/paper/local-review origins are useful, `agent-platform/configs/research/enterprise-source-registry.json` when high-quality source seeds are useful, and `agent-platform/configs/research/coding-research-profile.json`.
5. Search the web for current external evidence.
6. Search at least one additional channel: repository docs, official docs, code, package registries, papers, or open-source repos.
7. Record `technology_stack` with languages, runtimes, frameworks, major libraries, and standards involved.
8. For each major known technology, record stack-specific official docs or standards in `technology_official_docs`, such as Spring Boot reference docs, ISO C, React docs, or Next.js docs.
9. Record `stack_version_constraints` with current/target versions, standards, compatibility ranges, or explicit unknowns.
10. Search high-signal issue and discussion channels where applicable: Stack Overflow high-vote or accepted answers, Reddit discussions, GitHub Issues/Discussions, project forums, and unresolved issue threads.
11. Record `issue_discussion_sources`, `issue_discussion_notes`, and `community_signal_notes`; treat votes, likes, reactions, and comments as adoption/discovery/risk signals, not proof.
12. Before writing source code, search for best-fit architecture patterns, reference architectures, and architecture documentation frameworks such as well-architected frameworks, C4, arc42, SEI views, ADRs, or strong project `docs/architecture` examples.
13. Record `architecture_reference_sources`, `architecture_options`, and `architecture_decision_notes`; compare at least two architecture options before implementation.
14. Inspect relevant open-source repositories, reference implementations, well-structured source trees, examples, and tests before writing source code.
15. If installation is needed, follow [_docs/open-source-installation-policy.ko.md](../../_docs/open-source-installation-policy.ko.md) and [_ops/workflows/58-installation-record.md](58-installation-record.md), then record install scope, command, dependency path, installation record path, security/license review, verification, and rollback.
16. Record `code_reference_sources` with repository URLs, source file paths, test paths, example app paths, or code search results.
17. Record `code_reference_notes` explaining what structure, boundaries, API patterns, error handling, tests, or implementation details are worth adapting or rejecting.
18. Record `source_types` explicitly and use at least three distinct non-`other` source types.
19. Include at least one authoritative source type: `official`, `paper`, `standard`, or `open_source`.
20. Include at least one practical/adoption/contrary source type: `open_source`, `reference_implementation`, `tech_blog`, `analysis`, `community`, `social`, `news`, or `contrary`.
21. For broad or repeated research, apply [_docs/source-collection-policy.ko.md](../../_docs/source-collection-policy.ko.md) and use `_tools/source-collector/` when useful.
22. Check `enterprise-source-registry.json` for large-company engineering, official research-lab, architecture-center, or high-signal independent sources, then re-open exact pages before citing claims.
23. For Korean user-facing or local-market behavior, use Naver Map, Kakao Map, Naver Blog/Search, official pages, and `_tools/korean-local-review/` scoring outputs when applicable.
24. Record `source_value_provenance` for material source values, config values, versions, benchmarks, risks, claims, review signals, and assumptions.
25. Record `plan_evidence` to connect recommendations, architecture choices, implementation steps, and validation steps to checked evidence.
26. Separate factual evidence from adoption signals such as stars, likes, comments, Hacker News points, Reddit activity, or LinkedIn reactions.
27. Validate any internal knowledge-base references with `knowledge-skeptic-agent`.
28. Synthesize findings into options, trade-offs, and a recommendation.
29. Answer all post-research questions:
    - `what_was_verified`
    - `best_option`
    - `why_this_option`
    - `alternatives_rejected`
    - `implementation_impact`
    - `risks_and_unknowns`
    - `validation_plan`
    - `reusable_knowledge`
    - `next_action`
30. Save the plan process under `_history/plans/YYYY/`.
31. Capture reusable research under `_research/` or promote repeatable assets into `_templates/`, `_tools/`, or `_skills/`.
32. Run `coding-research-agent` with `complete-coding-research`.
33. If the result is `more_research_required`, resolve the listed gaps before implementation.
34. If the result is `ready_to_implement`, proceed with the implementation plan and later close with `work-evaluator-agent`.

## Rule

Coding research is complete only when it records the source configs it used, records technology stack details with stack-specific official docs or standards and version constraints, records issue/discussion sources and community signal interpretation, records source value provenance and plan evidence, compares architecture options from credible architecture references, inspects concrete code references, uses diverse source types, records any required installation review and installation audit path, produces a recommended next action, names validation steps, saves plan history, and answers the standard post-research questions.
