# Human-Like Web Search Improvement Summary

## Purpose

Web search should become an iterative research process, not a single keyword pass. The core loop is `query expansion -> operator search -> source lane separation -> snowballing from strong seeds -> selective summaries of useful sources`.

## External References Checked

| Source | Type | What It Supports | Applied To |
| --- | --- | --- | --- |
| Google Search Help: https://support.google.com/websearch/answer/2466433 | official | Search refinement such as exact phrases, exclusion, and site constraints. | Operator search in `human-search-profile.json` |
| Google Search Central: https://developers.google.com/search/docs/monitor-debug/search-operators | official | Search operators such as `site:` and their limits. | Operators should be used with a stated purpose |
| Cochrane Handbook Chapter 4: https://training.cochrane.org/handbook/current/chapter-04 | standard | Systematic search needs multiple sources and documented search strategy. | Source lanes and search-record discipline |
| PRISMA-S: https://www.prisma-statement.org/prisma-s/ | standard | Search strategy reporting and reproducible search records. | Web search records and query ladder capture |
| Wohlin snowballing paper: https://www.wohlin.eu/ease14.pdf | paper | Backward and forward snowballing from seed papers. | Strong-seed snowballing rules |
| SIFT/lateral reading: https://hapgood.us/2019/06/19/sift-the-four-moves/ | analysis | Check source context through lateral reading. | Author, publisher, and incentive checks in source triage |

## Design Decisions

- Search-origin lists stay in `source-discovery-registry.json`.
- Search method rules live in the new `human-search-profile.json`.
- Repeated execution is supported by `_tools/source-collector/` through the `query-plan` command.
- Good-source summaries are selective: save them only when they change an answer, plan, risk model, or future reusable knowledge.

## Reuse Rules

- Research/governance work should run at least seed, synonym, operator, source-lane, and contrary searches.
- Deep research should pick 3-5 strong seeds, then follow references, cited-by links, authors, repositories, talks, and datasets.
- Community and social reactions are adoption signals, not factual proof.
- Summaries should preserve URL, access date, source type, key claim, reliability, limitation, and plan impact.
