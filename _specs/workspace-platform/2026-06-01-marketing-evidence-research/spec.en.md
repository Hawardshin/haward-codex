# Spec: Marketing, Survey, And Quantitative Evidence Research

## Requirement

- `REQ-WS-029`

## Problem

Marketing research combines book-based theory, survey results, official statistics, market reports, and platform behavior signals. When those sources are mixed without separation, numeric base, geography, timeframe, methodology, and sponsor context disappear and plans become weakly grounded.

## Goals

- Provide a dedicated profile for marketing, market sizing, consumer insight, survey, book, and quantitative-evidence research.
- Make source groups and evidence lanes understandable from the config file alone.
- Standardize quantitative extraction fields and survey methodology checks.
- Link the new profile from research settings, source discovery, memory bootstrap, documentation, and history.

## Non-Goals

- Do not store paid reports or copyrighted book text.
- Do not create a specific marketing campaign strategy.
- Do not install a new external API client.

## Acceptance Criteria

- `agent-platform/configs/research/marketing-evidence-profile.json` exists.
- `source-registry.json`, `research-agent-profile.json`, `source-discovery-registry.json`, and README files reference the new profile.
- `_research/source-lists/marketing-evidence-sources.ko.md` and `.en.md` provide reusable source lists.
- The memory bootstrap manifest includes a required `marketing_evidence_profile` anchor.
- Config contract, memory bootstrap, grounding, and evaluation checks pass.
