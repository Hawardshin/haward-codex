# Web Search Records

This folder tracks web searches performed before every new user instruction and reusable prompt execution.

## Purpose

- Persist the fact that web search was performed before work started.
- Track queries, checked sources, weak sources ignored, and the planning impact.
- Record public evidence and decision summaries without exposing private raw reasoning.

## Path Convention

```text
_history/web-searches/YYYY/YYYY-MM-DD-<slug>.ko.md
_history/web-searches/YYYY/YYYY-MM-DD-<slug>.en.md
```

## Required Content

- User instruction summary
- Search time and queries
- Sources checked and source types
- Insights that changed the plan
- Irrelevant or weak sources ignored
- Public decision summary
- Links to related work summary, plan, and evaluation report

## Close-Out Rule

Meaningful work must include `web_search_record_targets` in `work-evaluator-agent` input. If web search failed due to tooling/network issues or the latest user instruction explicitly forbade search, record the reason and the stronger local verification used instead.
