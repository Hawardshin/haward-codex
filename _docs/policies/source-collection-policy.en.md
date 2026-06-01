# Source Collection Policy

## Purpose

Web search should not stop at a few search results. For decisions that benefit from research, collect many high-authority sources and practical adoption signals to improve judgment quality.

This policy extends [_docs/policies/web-first-work-policy.en.md](web-first-work-policy.en.md). Every new instruction starts with web search, then source collection depth scales with the task.

## Source Priorities

| Priority | Source Type | Examples | Use |
| --- | --- | --- | --- |
| 1 | Official or primary sources | Official docs, standards, RFCs, product blogs, release notes, API docs | Primary factual evidence |
| 2 | Papers, academic sources, and books/theory | arXiv, ACL, NeurIPS, ACM, IEEE, academic PDFs, textbooks, publisher pages, library catalogs | Methodology, theory, frameworks, and limitations |
| 3 | Official statistics, public data, and survey data | National statistics, World Bank/OECD, Census, KOSIS, Pew, Gallup, CMO Survey | Quantitative values, denominators, consumer/marketer attitudes |
| 4 | Open-source source material | GitHub repo, issue, PR, release, README, docs | Implementation and maintenance evidence |
| 5 | International tech blogs | Engineering blogs, architecture posts, incident reviews, benchmark write-ups | Real-world patterns and tradeoffs |
| 6 | Market/industry reports and research articles | Industry reports, survey reports, benchmark articles, long-form analysis | Market, case, and comparison context |
| 7 | Community signals | Hacker News, Reddit, Stack Overflow, GitHub stars, article likes/bookmarks | Discovery and contrary signals |
| 8 | Social and expert signals | LinkedIn posts, author profiles, conference talks, newsletters | Practitioner reaction and adoption signals |

## Collection Rules

- Check official or primary sources first.
- Use both papers and technical blogs. Papers add rigor; blogs add field constraints and applied patterns.
- Actively include international tech blogs and foreign-language articles when useful.
- When large-company engineering blogs, official research labs, architecture centers, or high-signal independent sources are useful, check `agent-platform/configs/research/enterprise-source-registry.json` first.
- When broader search origins are needed, check `agent-platform/configs/research/source-discovery-registry.json` for global engineering blogs, Korean big-tech blogs, India technology sources, and paper discovery sources.
- When search quality itself matters or more sources are needed, use `agent-platform/configs/research/human-search-profile.json` to create a seed, synonym, operator, source-lane, regional, community, contrary, and snowballing query ladder.
- Source summaries are selective. Save only sources that affect the answer, plan, risk model, or reusable knowledge, with URL, access date, key claim, reliability, limitation, and plan impact.
- When marketing, market sizing, consumer insight, brand strategy, go-to-market, survey-backed claims, book/theory grounding, or quantitative evidence is needed, use `agent-platform/configs/research/marketing-evidence-profile.json`.
- Marketing and market-sizing numbers must preserve value, unit, denominator/base, geography, timeframe, population, methodology, sample, sponsor/funder, access date, and comparability notes.
- Survey evidence should record population, sample size, sampling method, field dates, mode, weighting, sponsor/funder, and question wording or instrument when available. Missing methodology downgrades the source to weak evidence.
- For Korean user review or local-market decisions, prioritize Naver Map, Kakao Map, Naver Blog/Search, and official pages, then score candidate quality with `_tools/korean-local-review/`.
- For famous or method-critical papers, combine Semantic Scholar, OpenAlex, arXiv, Papers with Code, and Connected Papers to check influence, freshness, code/data availability, and contrary papers.
- Likes, shares, comments, GitHub stars, Hacker News points, and LinkedIn reactions are popularity or adoption signals, not standalone factual proof.
- For LinkedIn posts, check author, affiliation, date, reactions, and linked primary sources.
- For analysis articles, check methodology, data sources, sponsorship, and advertising incentives.
- Do not treat search result titles as evidence; open the source when it matters.
- Record conflicting sources and avoid definitive conclusions until the conflict is resolved.

## Source Bundle Target

When research affects a plan or decision, try to collect:

- at least one official or primary source
- at least one paper, standard, or technical report
- for marketing/market/consumer research, at least one book/theory or peer-reviewed marketing source
- for marketing/market/consumer research, at least one official statistics, public survey, or quantitative source with survey methodology
- at least two international tech blogs or field examples
- at least one open-source repository or implementation example
- at least one community or social signal
- at least one contrary opinion or failure case

Simple local tasks do not need the full bundle. Still run web-first intake and record when results are irrelevant.

When collecting many sources or creating query ladders, reports, or scoring becomes repetitive, use `_tools/source-collector/`. For Korean local reviews or Naver/Kakao-centered research, use `_tools/korean-local-review/`.

For general research and planning, use `research-insight-planner-agent` with `agent-platform/configs/research/research-agent-profile.json` to record source ranking, evidence extraction, synthesis, citation grounding, and skeptic review.

For marketing strategy, market sizing, consumer insight, books/theory, survey research, or quantitative evidence, include `marketing-evidence-profile.json` in `research_profile_paths`. Market sizing should triangulate at least three lanes: official statistics/public data, industry report evidence, and explicit assumptions or platform behavior data.

For coding research, run `coding-research-agent` before completion to check sources, `source_types`, `reference_config_paths`, `technology_stack`, `technology_official_docs`, `stack_version_constraints`, `issue_discussion_sources`, `issue_discussion_notes`, `community_signal_notes`, `language_options`, `selected_language`, `language_decision_notes`, `architecture_theory_sources`, `architecture_practitioner_sources`, `architecture_tradeoff_notes`, `folder_structure_options`, `folder_structure_decision_notes`, `folder_semantics_notes`, `maintainability_notes`, `code_reference_sources`, `code_reference_notes`, options, recommendation, risks, validation plan, and standard post-research questions. Coding research needs at least three distinct non-`other` source types, must check technology-specific official docs or standards for major stack items such as Java/Spring Boot, C, React, and Next.js, must record language/runtime maintainability, theory-vs-practitioner architecture evidence, folder meaning, and ownership boundaries, must record the source settings it used through JSON configs under `agent-platform/configs/research/`, and must inspect relevant open-source structure, reference implementations, or well-written code/tests. When enterprise/high-quality sources are used, also include `enterprise-source-registry.json` in `reference_config_paths`.

Community signals such as Stack Overflow votes/accepted answers, Reddit discussions, GitHub Issues/Discussions, and project forums are useful for finding repeated problems, adoption, edge cases, and dissenting views. Record them as discovery, adoption, or risk signals, not proof, and cross-check factual decisions against official docs, standards, papers, or maintained repositories.

For every material source value, configuration value, claim, review signal, or planning constraint, record `source_value_provenance` as “value <- exact URL/path, access date, extraction note.” Tie execution steps to supporting evidence through `plan_evidence`.

If open-source installation is needed, follow [_docs/policies/open-source-installation-policy.en.md](open-source-installation-policy.en.md) and record install scope, command, dependency file, installation audit record, security/license review, verification, and rollback. If installation actually occurs, update `_ops/installations/registry.json` and `_history/installations/YYYY/`.

## Evaluation Criteria

- Authority: is the author or publisher credible?
- Accuracy: are claims backed by evidence, data, code, or citations?
- Currency: is the date appropriate for the current decision?
- Relevance: does it affect this task directly?
- Independence: are sources independent from one another?
- Transparency: are methods, limits, and incentives visible?
- Practitioner signal: is there evidence of real use, discussion, reaction, or maintenance?

## Recording Format

Research notes and evaluation reports should record:

- URL or path
- source type
- access date
- source value provenance
- key claim
- reliability judgment
- popularity or practitioner signal
- contrary signals
- plan impact
- plan-step evidence

## Automation Tool

```bash
python3 _tools/source-collector/src/source_collector.py init /tmp/source-bundle.json --topic "topic" --purpose "purpose" --access-date YYYY-MM-DD
python3 _tools/source-collector/src/source_collector.py query-plan "topic" --depth deep --output /tmp/query-plan.md --json-output /tmp/query-plan.json
python3 _tools/source-collector/src/source_collector.py report /tmp/source-bundle.json --output /tmp/source-report.md --json-output /tmp/source-report.json
python3 _tools/source-collector/src/source_collector.py check /tmp/source-bundle.json --strict
python3 _tools/korean-local-review/src/korean_local_review.py query-plan --topic "topic" --region "region" --category "category"
python3 _tools/korean-local-review/src/korean_local_review.py score /tmp/korean-review.json --output /tmp/korean-review.md
```

## Related Files

- [_tools/source-collector/README.en.md](../../_tools/source-collector/README.en.md)
- [_tools/korean-local-review/README.en.md](../../_tools/korean-local-review/README.en.md)
- [_ops/workflows/05-web-first-intake.md](../../_ops/workflows/05-web-first-intake.md)
- [_ops/workflows/55-research-insight-planning.md](../../_ops/workflows/55-research-insight-planning.md)
- [_ops/workflows/56-coding-research.md](../../_ops/workflows/56-coding-research.md)
- [Enterprise and high-quality site list](../../_research/source-lists/enterprise-high-quality-sites.en.md)
- [Korean local review sources](../../_research/source-lists/korean-local-review-sources.en.md)
- [_research/topics/agent-planning/2026-05-31-source-collection-policy.en.md](../../_research/topics/agent-planning/2026-05-31-source-collection-policy.en.md)
