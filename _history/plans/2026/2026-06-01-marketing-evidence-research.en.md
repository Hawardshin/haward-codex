# Plan Record: Marketing, Survey, And Quantitative Evidence Research

## Goal

Create a research structure that can find marketer research material, theoretical book evidence, real survey evidence, and quantitative numerical support while preserving source provenance and numeric context.

## Work Mode

- `governance`

## Evidence Summary

- AAPOR and ESOMAR are suitable references for survey methodology and online sample quality checks.
- Pew and Gallup provide strong examples of public survey methodology disclosure.
- World Bank, OECD, FRED, Census, KOSIS, and ECOS are suitable official statistics and denominator sources for market sizing.
- CMO Survey, DataReportal, HubSpot, Salesforce, NielsenIQ, and Kantar are useful starting points for current market context and benchmarks, but need sponsor and methodology checks.
- Google Books, Open Library, and Crossref are useful for book and paper discovery, but metadata does not replace source contents.

## Decisions

- Add `agent-platform/configs/research/marketing-evidence-profile.json`.
- Add marketing-evidence source types to `source-registry.json`.
- Keep `source-discovery-registry.json` as search origins and recommended order; reopen exact sources before claims.
- Add the marketing evidence profile as a required warm anchor in memory bootstrap.
- Reflect `quantitative_evidence_fields` in operating rules.

## Artifacts

- `agent-platform/configs/research/marketing-evidence-profile.json`
- `_research/source-lists/marketing-evidence-sources.en.md`
- `_requirements/changes/2026-06-01-marketing-evidence-research.en.md`
- `_specs/workspace-platform/2026-06-01-marketing-evidence-research/`
- `_history/web-searches/2026/2026-06-01-marketing-evidence-research.en.md`

## Validation Plan

- Validate JSON syntax and config contract.
- Validate memory bootstrap readiness.
- Regenerate workspace monitor snapshot and operations maps.
- Run grounding and work evaluation to check gaps against the initial instruction.
