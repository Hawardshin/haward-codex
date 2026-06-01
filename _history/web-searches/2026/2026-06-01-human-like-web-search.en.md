# Web Search Record: Human-Like Web Search

## User Instruction Summary

Improve web search so it finds many more sources like a human researcher would, then summarizes useful sources when they are worth keeping.

## Search Date

- 2026-06-01

## Queries

- `best practices web search strategy query expansion source discovery snowballing research workflow`
- `systematic literature search snowballing backward forward citation chaining best practices`
- `OSINT search techniques source evaluation query operators site search best practices`
- `AI research agent search strategy source ranking synthesis citation grounding best practices`
- `PRISMA-S extension search strategy reporting checklist`
- `Wohlin guidelines for snowballing in systematic literature studies software engineering`
- `Google Search help search operators exact match site filetype OR after before`
- `SIFT lateral reading source evaluation`

## Sources Checked

| Source | Type | Applied To |
| --- | --- | --- |
| https://support.google.com/websearch/answer/2466433 | official | exact phrase, exclusion, site-like refinement |
| https://developers.google.com/search/docs/monitor-debug/search-operators | official | operator search purpose and limits |
| https://training.cochrane.org/handbook/current/chapter-04 | standard | multi-source searching and records |
| https://www.prisma-statement.org/prisma-s/ | standard | search strategy reporting |
| https://www.wohlin.eu/ease14.pdf | paper | backward/forward snowballing |
| https://hapgood.us/2019/06/19/sift-the-four-moves/ | analysis | lateral reading and source triage |

## Weak Sources Ignored

- General search-tip blogs written mainly for SEO or promotion.
- Pages that list operators without source evaluation or search record discipline.
- AI-search marketing pages without methodology or primary links.

## Plan Impact

- Separate search-origin lists from search-method rules.
- Manage the method through `human-search-profile.json` with query ladders and snowballing.
- Automate repeated execution with `_tools/source-collector/` query-plan.
- Summarize good sources selectively when they have reuse value and plan impact.

## Public Decision Summary

This change does not merely add more source lists. It promotes a reusable method for finding better sources and preserving only useful summaries.
