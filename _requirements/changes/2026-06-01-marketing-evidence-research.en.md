# Requirement Change: Marketing, Survey, And Quantitative Evidence Research

## Change ID

- `REQ-WS-029`

## Source Request

- `UR-2026-06-01-012`

## Change

- Marketing strategy, consumer insight, market sizing, brand/GTM, book/theory, survey, and quantitative-evidence research shall use a dedicated profile.
- Evidence lanes shall be separated into theory/books/academic, survey methodology, public surveys, official statistics/public data, market/industry reports, and platform/behavioral data.
- Every number or percentage shall record value, unit, base, geography, timeframe, population, methodology, sample, sponsor, and comparability notes.
- Survey claims without methodology details such as sample, mode, field dates, weighting, and sponsor shall be downgraded to weak evidence.
- Books and classic theory may ground frameworks, but current market size or current facts require fresh data validation.

## Rationale

- The user asked for better ways to find marketer research material, theoretical book content, real survey evidence, and quantitative numerical support.
- Marketing research often mixes vendor reports, surveys, platform signals, and public statistics, so evidence roles need to be explicit.
- Numeric evidence without base and methodology can distort planning, so extraction fields need to be required by config.

## Verification

- `marketing-evidence-profile.json` shall pass the self-documenting config contract.
- `source-registry.json` shall include `book`, `official_statistics`, `survey_dataset`, and `market_report` source types.
- `source-discovery-registry.json` shall include a marketing evidence source group and recommended search sequence.
- The memory bootstrap manifest shall include the marketing evidence profile as a required warm anchor.
