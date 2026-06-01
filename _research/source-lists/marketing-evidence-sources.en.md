# Marketing, Survey, And Quantitative Evidence Source List

## Purpose

Reusable source bundle for marketing strategy, market sizing, consumer insight, brand/content strategy, go-to-market planning, survey-backed claims, theory/book grounding, and quantitative evidence.

This list is a search starting point. Before using a claim, open the original source, method page, data table, or report and record access date plus numeric context.

## Core Configs

- `agent-platform/configs/research/marketing-evidence-profile.json`
- `agent-platform/configs/research/source-registry.json`
- `agent-platform/configs/research/source-discovery-registry.json`

## Theory, Books, And Academic Evidence

| Source | URL | Use | Caution |
| --- | --- | --- | --- |
| Journal of Marketing Research | https://www.ama.org/journal-of-marketing-research/ | Marketing research methods and empirical research | Check paper content and method |
| Journal of Marketing | https://www.ama.org/journal-of-marketing/ | Marketing strategy and market-facing academic research | Current market claims still need current data |
| Google Books API | https://developers.google.com/books/docs/v1/using | Book, author, ISBN, and subject discovery | Metadata is not full-text evidence |
| Open Library APIs | https://openlibrary.org/developers/api | Book, author, work, and edition metadata | Metadata is not proof of the book's claims |
| Crossref REST API | https://www.production.crossref.org/documentation/retrieve-metadata/rest-api/ | DOI and scholarly metadata discovery | DOI metadata and paper content are separate |

## Survey Method Quality Standards

| Source | URL | Use | Caution |
| --- | --- | --- | --- |
| AAPOR Transparency Initiative | https://aapor.org/standards-and-ethics/transparency-initiative/ | Survey disclosure checklist | Use as a quality screen for marketing surveys |
| AAPOR Best Practices | https://aapor.org/standards-and-ethics/best-practices/ | Survey design and analysis best practices | Treat nonprobability samples carefully |
| ESOMAR/GRBN Online Sample Quality | https://api.esomar.org/what-we-do/code-guidelines/esomargrbn-guideline-on-online-sample-quality | Online panel quality, fraud, validation, weighting | Use for online panel/vendor survey checks |
| Pew Research Center Methods | https://www.pewresearch.org/our-methods/ | Public survey methodology examples | Check the method page for each survey |
| Gallup Methodology Center | https://www.gallup.com/178685/methodology-center.aspx | Polling and trend-data methodology | Check survey-specific sample/mode/field dates |

## Public Survey And Consumer Insight

| Source | URL | Use | Caution |
| --- | --- | --- | --- |
| Pew Research Center | https://www.pewresearch.org/ | Public opinion, media, technology, and social trend surveys | Often U.S.-centered; check geography fit |
| Gallup | https://www.gallup.com/ | Public opinion, workplace, and global trend surveys | Check public availability and methodology |
| The CMO Survey | https://cmosurvey.org/ | CMO/marketing leader metrics, budgets, analytics, strategy | Check wave, sample, and questions |
| Deloitte CMO Survey | https://www.deloitte.com/us/en/programs/chief-marketing-officer/articles/cmo-survey.html | CMO Survey reporting and marketing leader trends | Separate Deloitte interpretation from primary survey |
| OpenSurvey Blog | https://blog.opensurvey.co.kr/ | Korean consumer trend and survey-backed reports | Check sample and field period |

## Official Statistics And Public Data

| Source | URL | Use | Caution |
| --- | --- | --- | --- |
| World Bank Indicators API | https://datahelpdesk.worldbank.org/knowledgebase/articles/889392 | Country population/economic denominators | Check indicator definition and latest year |
| OECD Data | https://data.oecd.org/ | OECD country statistics | Check country coverage and measurement |
| FRED | https://fred.stlouisfed.org/ | Economic time series | Check source and seasonal adjustment |
| U.S. Census Data | https://data.census.gov/ | U.S. population, household, and business data | Do not apply directly to non-U.S. markets |
| KOSIS | https://kosis.kr/ | Korean official statistics | Check indicator definition, region, and period |
| Bank of Korea ECOS | https://ecos.bok.or.kr/ | Korean macroeconomic and financial time series | Check unit and release frequency |

## Market And Industry Reports

| Source | URL | Use | Caution |
| --- | --- | --- | --- |
| DataReportal | https://datareportal.com/ | Digital, social, ecommerce, and ad statistics | Check source and methodology |
| HubSpot State of Marketing | https://www.hubspot.com/state-of-marketing | Marketing teams, content, automation, channels | Vendor report; record sponsor context |
| Salesforce State of Marketing | https://www.salesforce.com/resources/research-reports/state-of-marketing/ | CRM, AI, customer engagement, marketing ops | Vendor report; record sponsor context |
| NielsenIQ Insights | https://nielseniq.com/global/en/insights/ | CPG, retail, shopper, and category trends | Check public scope and method |
| Kantar Inspiration | https://www.kantar.com/inspiration | Brand, media, and consumer insight | Record commercial research context |

## Platform And Behavioral Data

| Source | URL | Use | Caution |
| --- | --- | --- | --- |
| Google Trends | https://trends.google.com/ | Relative search interest, seasonality, topic comparison | Not absolute search volume |
| Google Ads Keyword Planner | https://ads.google.com/home/tools/keyword-planner/ | Keyword volume and ad planning signals | Requires access; values are estimates/ranges |
| Meta Ads Library | https://www.facebook.com/ads/library/ | Competitor ads, creative discovery, transparency | Coverage varies by category and country |
| TikTok Creative Center | https://ads.tiktok.com/business/creativecenter/ | Short-form creative and platform trend signals | Use as platform-internal signal only |

## Quantitative Extraction Checklist

- Value and unit: e.g. 37%, 1.2B USD, monthly search volume 10K-100K
- Denominator/base: all respondents, segment, households, firms
- Geography: global, U.S., Korea, city/region
- Timeframe: field period, base year, publication date
- Population: consumers, B2B decision makers, CMOs, age group
- Method: sampling, panel, online survey, administrative statistics, modeled estimate
- Sample: sample size, subgroup base, weighting
- Sponsor/funder: vendor, association, university, government agency
- Comparability: method consistency across waves or countries
- Limitations: paywall, sample ambiguity, modeled estimate, vendor bias

## Recommended Search Order

1. Narrow the question: market, geography, period, target, decision purpose.
2. Use books/theory and peer-reviewed sources to choose frameworks.
3. Use official statistics for population and market denominators.
4. Use public surveys and CMO/consumer surveys for attitude and behavior evidence.
5. Use industry reports and platform data for current trends and benchmarks.
6. For Korea, separately check KOSIS, OpenSurvey, Naver/Kakao, and Korean community signals.
7. Store every number using `marketing-evidence-profile.json` `quantitative_evidence_fields`.
