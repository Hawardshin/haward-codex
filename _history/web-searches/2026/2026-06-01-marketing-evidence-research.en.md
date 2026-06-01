# Web Search Record: Marketing, Survey, And Quantitative Evidence Research

## Search Purpose

- Build a repeatable source-discovery structure for marketer research material, book/theory evidence, real survey evidence, and quantitative numerical support.
- Prioritize official methodology and data sources before defining survey quality checks and numeric provenance fields.

## Search Queries

- `official marketing research survey data sources Pew Gallup CMO Survey marketing quantitative evidence`
- `marketing academic research books survey data Google Scholar Journal of Marketing official sources`
- `market research data sources government statistics OECD World Bank Census marketing evidence`
- `ESOMAR market research guidelines survey quality official`
- `The CMO Survey official Duke AMA Deloitte marketing data survey`
- `DataReportal digital 2026 global digital reports methodology marketing statistics`
- `Pew Research Center methods survey methodology official`
- `World Bank Data API official indicators market consumer data`
- `Google Books API official book search documentation`
- `WorldCat Search API official books documentation`
- `Open Library Search API books official documentation`
- `Crossref REST API works citation references official documentation`
- `American Marketing Association marketing research definition quantitative research official`
- `AMA Journal of Marketing Research official American Marketing Association`
- `Journal of Marketing Research official AMA research methods data sources`
- `Survey Research Methods AAPOR transparency initiative official methodology`
- `official marketing research quantitative evidence survey methodology AAPOR ESOMAR Pew Gallup CMO Survey World Bank Google Books Crossref`

## Sources Checked

| Source | URL | What Was Checked | Reliability | Applied To |
| --- | --- | --- | --- | --- |
| Journal of Marketing Research | https://www.ama.org/journal-of-marketing-research/ | Peer-reviewed source family for marketing research and methods. | High, association journal | theory/academic evidence lane |
| JMR Research Transparency Policy | https://www.ama.org/journal-of-marketing-research-policy-for-research-transparency/ | Method and material disclosure expectations for marketing research. | High, journal policy | research transparency reference |
| AAPOR Transparency Initiative | https://aapor.org/standards-and-ethics/transparency-initiative/ | Survey disclosure and methodology transparency criteria. | High, professional association | survey methodology checks |
| AAPOR Best Practices | https://aapor.org/standards-and-ethics/best-practices/ | Quality checks for survey design and analysis. | High, professional association | survey evidence downgrade rule |
| ESOMAR/GRBN Online Sample Quality | https://api.esomar.org/what-we-do/code-guidelines/esomargrbn-guideline-on-online-sample-quality | Online panel, sample quality, fraud, respondent validation, and weighting checks. | High, industry standard | online survey quality checks |
| Pew Research Center Methods | https://www.pewresearch.org/our-methods/ | Strong public survey methodology examples. | High, research organization | method disclosure reference |
| Pew U.S. Survey Methodology | https://www.pewresearch.org/u-s-survey-methodology/ | Survey error and probability-based panel methodology. | High, research organization | survey quality example |
| Gallup Methodology Center | https://www.gallup.com/178685/methodology-center.aspx | Polling and trend survey methodology references. | High, research organization | method disclosure reference |
| The CMO Survey | https://cmosurvey.org/ | CMO and marketing leader survey data. | Medium-high, survey source | marketing survey dataset origin |
| Deloitte CMO Survey | https://www.deloitte.com/us/en/programs/chief-marketing-officer/articles/cmo-survey.html | CMO Survey interpretation and current report access. | Medium, sponsor context needed | market report context |
| DataReportal | https://datareportal.com/ | Global and country-level digital, social, and ecommerce statistics discovery. | Medium, original sources needed | market report source |
| World Bank Indicators API | https://datahelpdesk.worldbank.org/knowledgebase/articles/889392 | Country-level official indicators and market denominator candidates. | High, official data | official statistics lane |
| OECD Data | https://data.oecd.org/ | OECD statistics discovery. | High, official data | official statistics lane |
| FRED | https://fred.stlouisfed.org/ | Economic time series discovery. | High, official/semi-official data | economic denominator context |
| U.S. Census Data | https://data.census.gov/ | U.S. population and business data. | High, official data | U.S. market sizing denominator |
| KOSIS | https://kosis.kr/ | Korean official statistics. | High, official data | Korean market denominator |
| Bank of Korea ECOS | https://ecos.bok.or.kr/ | Korean economic and financial time series. | High, official data | Korean macro context |
| Google Books API | https://developers.google.com/books/docs/v1/using | Book search and bibliographic metadata. | High, official API | book/theory discovery |
| Open Library APIs | https://openlibrary.org/developers/api | Open book and author metadata. | Medium-high, metadata | book discovery supplement |
| Crossref REST API | https://www.production.crossref.org/documentation/retrieve-metadata/rest-api/ | DOI and scholarly metadata discovery. | High, DOI metadata | paper discovery |
| HubSpot State of Marketing | https://www.hubspot.com/state-of-marketing | Vendor survey/report source. | Medium, sponsor context needed | market report context |
| Salesforce State of Marketing | https://www.salesforce.com/resources/research-reports/state-of-marketing/ | Vendor survey/report source. | Medium, sponsor context needed | market report context |
| NielsenIQ Insights | https://nielseniq.com/global/en/insights/ | Consumer and category insight source. | Medium, commercial research | industry report context |
| Kantar Inspiration | https://www.kantar.com/inspiration | Brand, media, and consumer insight source. | Medium, commercial research | industry report context |
| Google Trends | https://trends.google.com/ | Relative search interest and seasonality. | Medium, not absolute volume | platform signal |
| Meta Ads Library | https://www.facebook.com/ads/library/ | Advertising creative and competitor ad discovery. | Medium, platform signal | advertising signal |
| TikTok Creative Center | https://ads.tiktok.com/business/creativecenter/ | Short-form creative trend discovery. | Medium, platform signal | creative signal |
| OpenSurvey Blog | https://blog.opensurvey.co.kr/ | Korean consumer trend and survey report discovery. | Medium, methodology needed | Korean consumer survey context |

## Weak Or Deferred Sources

- Unauthorized PDFs, ebook mirrors, and unidentified book PDFs were not used. Book metadata alone does not prove book content.
- Vendor reports are useful, but should not support strong factual claims until sponsor, sample, field period, question wording, and methodology are checked.
- Platform data is useful as behavior signal, but should not be used directly as absolute market size or representative evidence.

## Impact On Plan

- Added `marketing-evidence-profile.json` as a new core profile.
- Added `book`, `official_statistics`, `survey_dataset`, and `market_report` source types to `source-registry.json`.
- Added a marketing evidence source group and `marketing_evidence_or_market_sizing` search sequence to `source-discovery-registry.json`.
- Required numeric evidence to store value, unit, base, geography, timeframe, population, methodology, sample, sponsor, and comparability notes.
- Required survey claims with weak methodology disclosure to be downgraded to weak evidence.

## Uncertainty

- Some commercial report availability and methodology disclosure can change.
- Google Books, Open Library, and Crossref are metadata discovery sources; they do not prove the contents of a book or paper by themselves.
- Country statistics often use different indicator definitions and reference years, so comparability notes are required.

## Public Decision Summary

For marketing research, the important move is not just collecting more sources, but separating evidence roles. Books and papers ground frameworks, surveys support attitudes and self-reported behavior, official statistics provide market denominators, and industry reports or platform data provide current context and benchmarks. Every number needs its base and methodology attached.
