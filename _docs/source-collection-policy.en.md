# Source Collection Policy

## Purpose

Web search should not stop at a few search results. For decisions that benefit from research, collect many high-authority sources and practical adoption signals to improve judgment quality.

This policy extends [_docs/web-first-work-policy.en.md](web-first-work-policy.en.md). Every new instruction starts with web search, then source collection depth scales with the task.

## Source Priorities

| Priority | Source Type | Examples | Use |
| --- | --- | --- | --- |
| 1 | Official or primary sources | Official docs, standards, RFCs, product blogs, release notes, API docs | Primary factual evidence |
| 2 | Papers and academic sources | arXiv, ACL, NeurIPS, ACM, IEEE, academic PDFs | Methodology, performance, and limitations |
| 3 | Open-source source material | GitHub repo, issue, PR, release, README, docs | Implementation and maintenance evidence |
| 4 | International tech blogs | Engineering blogs, architecture posts, incident reviews, benchmark write-ups | Real-world patterns and tradeoffs |
| 5 | Research and analysis articles | Industry reports, surveys, benchmark articles, long-form analysis | Market, case, and comparison context |
| 6 | Community signals | Hacker News, Reddit, Stack Overflow, GitHub stars, article likes/bookmarks | Discovery and contrary signals |
| 7 | Social and expert signals | LinkedIn posts, author profiles, conference talks, newsletters | Practitioner reaction and adoption signals |

## Collection Rules

- Check official or primary sources first.
- Use both papers and technical blogs. Papers add rigor; blogs add field constraints and applied patterns.
- Actively include international tech blogs and foreign-language articles when useful.
- Likes, shares, comments, GitHub stars, Hacker News points, and LinkedIn reactions are popularity or adoption signals, not standalone factual proof.
- For LinkedIn posts, check author, affiliation, date, reactions, and linked primary sources.
- For analysis articles, check methodology, data sources, sponsorship, and advertising incentives.
- Do not treat search result titles as evidence; open the source when it matters.
- Record conflicting sources and avoid definitive conclusions until the conflict is resolved.

## Source Bundle Target

When research affects a plan or decision, try to collect:

- at least one official or primary source
- at least one paper, standard, or technical report
- at least two international tech blogs or field examples
- at least one open-source repository or implementation example
- at least one community or social signal
- at least one contrary opinion or failure case

Simple local tasks do not need the full bundle. Still run web-first intake and record when results are irrelevant.

When collecting or reporting many sources becomes repetitive, use `_tools/source-collector/`.

For general research and planning, use `research-insight-planner-agent` with `agent-platform/configs/research/research-agent-profile.json` to record source ranking, evidence extraction, synthesis, citation grounding, and skeptic review.

For coding research, run `coding-research-agent` before completion to check sources, `source_types`, `reference_config_paths`, `code_reference_sources`, `code_reference_notes`, options, recommendation, risks, validation plan, and standard post-research questions. Coding research needs at least three distinct non-`other` source types, must record the source settings it used through JSON configs under `agent-platform/configs/research/`, and must inspect relevant open-source structure, reference implementations, or well-written code/tests.

If open-source installation is needed, follow [_docs/open-source-installation-policy.en.md](open-source-installation-policy.en.md) and record install scope, command, dependency file, security/license review, verification, and rollback.

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
- key claim
- reliability judgment
- popularity or practitioner signal
- contrary signals
- plan impact

## Automation Tool

```bash
python3 _tools/source-collector/src/source_collector.py init /tmp/source-bundle.json --topic "topic" --purpose "purpose" --access-date YYYY-MM-DD
python3 _tools/source-collector/src/source_collector.py report /tmp/source-bundle.json --output /tmp/source-report.md --json-output /tmp/source-report.json
python3 _tools/source-collector/src/source_collector.py check /tmp/source-bundle.json --strict
```

## Related Files

- [_tools/source-collector/README.en.md](../_tools/source-collector/README.en.md)
- [_ops/workflows/05-web-first-intake.md](../_ops/workflows/05-web-first-intake.md)
- [_ops/workflows/55-research-insight-planning.md](../_ops/workflows/55-research-insight-planning.md)
- [_ops/workflows/56-coding-research.md](../_ops/workflows/56-coding-research.md)
- [_research/topics/agent-planning/2026-05-31-source-collection-policy.en.md](../_research/topics/agent-planning/2026-05-31-source-collection-policy.en.md)
