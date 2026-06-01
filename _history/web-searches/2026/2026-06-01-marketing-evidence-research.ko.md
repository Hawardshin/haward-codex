# 웹 검색 기록: 마케팅/설문/정량 근거 조사

## 검색 목적

- 마케터 자료조사, 책/이론 근거, 실제 설문조사, 정량 수치 근거를 많이 찾기 위한 반복 가능한 source discovery 구조를 만들었다.
- 설문 claim의 품질 기준과 숫자 근거의 provenance 필드를 정하기 위해 공식 방법론 출처와 데이터 출처를 우선 확인했다.

## 검색 쿼리

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

## 확인한 출처

| 출처 | URL | 확인 내용 | 신뢰도 | 적용 |
| --- | --- | --- | --- | --- |
| Journal of Marketing Research | https://www.ama.org/journal-of-marketing-research/ | 마케팅 연구와 방법론을 찾기 위한 peer-reviewed 출처군. | 높음, 학회/저널 | theory/academic evidence lane |
| JMR Research Transparency Policy | https://www.ama.org/journal-of-marketing-research-policy-for-research-transparency/ | 마케팅 연구의 방법론/자료 공개 기대를 확인하는 기준. | 높음, 저널 정책 | research transparency reference |
| AAPOR Transparency Initiative | https://aapor.org/standards-and-ethics/transparency-initiative/ | 설문 공개 항목과 방법론 투명성 기준. | 높음, 전문기관 | survey methodology checks |
| AAPOR Best Practices | https://aapor.org/standards-and-ethics/best-practices/ | 설문 설계/분석의 품질 체크 기준. | 높음, 전문기관 | survey evidence downgrade rule |
| ESOMAR/GRBN Online Sample Quality | https://api.esomar.org/what-we-do/code-guidelines/esomargrbn-guideline-on-online-sample-quality | 온라인 패널, sample quality, fraud, respondent validation, weighting 기준. | 높음, 산업 표준 | online survey quality checks |
| Pew Research Center Methods | https://www.pewresearch.org/our-methods/ | 공개 survey method page의 좋은 예시. | 높음, 연구기관 | method disclosure reference |
| Pew U.S. Survey Methodology | https://www.pewresearch.org/u-s-survey-methodology/ | survey error, probability-based panel 등 설문 방법론 참고. | 높음, 연구기관 | survey quality example |
| Gallup Methodology Center | https://www.gallup.com/178685/methodology-center.aspx | 여론조사/트렌드 survey method reference. | 높음, 연구기관 | method disclosure reference |
| The CMO Survey | https://cmosurvey.org/ | CMO/마케팅 리더 설문과 marketing trend data. | 중간에서 높음, survey source | marketing survey dataset origin |
| Deloitte CMO Survey | https://www.deloitte.com/us/en/programs/chief-marketing-officer/articles/cmo-survey.html | CMO Survey 해석과 최신 리포트 접근점. | 중간, sponsor 맥락 필요 | market report context |
| DataReportal | https://datareportal.com/ | 국가별/글로벌 디지털, SNS, ecommerce 통계 탐색. | 중간, 원출처 확인 필요 | market report source |
| World Bank Indicators API | https://datahelpdesk.worldbank.org/knowledgebase/articles/889392 | 국가별 공식 지표 API와 시장 분모 후보. | 높음, 공식 데이터 | official statistics lane |
| OECD Data | https://data.oecd.org/ | OECD 통계 탐색. | 높음, 공식 데이터 | official statistics lane |
| FRED | https://fred.stlouisfed.org/ | 경제 시계열 탐색. | 높음, 공식/준공식 데이터 | economic denominator context |
| U.S. Census Data | https://data.census.gov/ | 미국 인구/사업체 데이터. | 높음, 공식 데이터 | U.S. market sizing denominator |
| KOSIS | https://kosis.kr/ | 한국 공식 통계. | 높음, 공식 데이터 | Korean market denominator |
| Bank of Korea ECOS | https://ecos.bok.or.kr/ | 한국 경제/금융 시계열. | 높음, 공식 데이터 | Korean macro context |
| Google Books API | https://developers.google.com/books/docs/v1/using | 책 검색과 bibliographic metadata. | 높음, 공식 API | book/theory discovery |
| Open Library APIs | https://openlibrary.org/developers/api | open book/author metadata. | 중간에서 높음, metadata | book discovery supplement |
| Crossref REST API | https://www.production.crossref.org/documentation/retrieve-metadata/rest-api/ | DOI와 논문 metadata 탐색. | 높음, DOI metadata | paper discovery |
| HubSpot State of Marketing | https://www.hubspot.com/state-of-marketing | vendor survey/report source. | 중간, sponsor 맥락 필요 | market report context |
| Salesforce State of Marketing | https://www.salesforce.com/resources/research-reports/state-of-marketing/ | vendor survey/report source. | 중간, sponsor 맥락 필요 | market report context |
| NielsenIQ Insights | https://nielseniq.com/global/en/insights/ | consumer/category insight source. | 중간, 상업 리서치 | industry report context |
| Kantar Inspiration | https://www.kantar.com/inspiration | brand/media/consumer insight source. | 중간, 상업 리서치 | industry report context |
| Google Trends | https://trends.google.com/ | 상대 검색 관심도와 시즌성. | 중간, 절대량 아님 | platform signal |
| Meta Ads Library | https://www.facebook.com/ads/library/ | 광고 creative와 경쟁 광고 탐색. | 중간, platform signal | advertising signal |
| TikTok Creative Center | https://ads.tiktok.com/business/creativecenter/ | 숏폼 creative trend 탐색. | 중간, platform signal | creative signal |
| OpenSurvey Blog | https://blog.opensurvey.co.kr/ | 한국 소비자 트렌드/설문 리포트 탐색. | 중간, 방법론 확인 필요 | Korean consumer survey context |

## 약한 출처 또는 보류한 출처

- 무단 PDF, ebook mirror, 출처 불명 책 PDF는 사용하지 않았다. 책 내용은 API metadata만으로 사실 근거가 되지 않는다.
- Vendor report는 유용하지만 sponsor, 표본, 조사 기간, 질문 wording, methodology를 확인하기 전에는 강한 사실 근거로 쓰지 않는다.
- 플랫폼 데이터는 행동 신호로 유용하지만 절대 시장 규모나 대표성 증거로 직접 사용하지 않는다.

## 계획에 준 영향

- `marketing-evidence-profile.json`을 새 core profile로 추가했다.
- `source-registry.json`에 `book`, `official_statistics`, `survey_dataset`, `market_report` source type을 추가했다.
- `source-discovery-registry.json`에 marketing evidence source group과 `marketing_evidence_or_market_sizing` 검색 순서를 추가했다.
- 숫자 근거는 값, 단위, base, 지역, 기간, 모집단, 방법론, 표본, 스폰서, 비교 가능성까지 저장하도록 했다.
- 설문 claim은 방법론 공개가 부족하면 weak evidence로 downgrade하도록 했다.

## 불확실성

- 일부 상업 리포트는 무료 공개 범위와 methodology 공개 수준이 바뀔 수 있다.
- Google Books/Open Library/Crossref는 metadata discovery source이며, 책이나 논문의 실제 내용을 증명하지 않는다.
- 국가별 통계는 지표 정의와 기준 연도가 달라 비교 가능성 메모가 필요하다.

## 공개 판단 요약

마케팅 조사는 검색 소스를 많이 모으는 것보다 evidence role을 분리하는 것이 핵심이다. 책과 논문은 프레임워크, survey는 태도와 자기보고 행동, 공식 통계는 시장 분모, 산업 리포트와 플랫폼 데이터는 최신 context와 benchmark로 쓰되, 모든 숫자에는 base와 방법론을 붙여야 한다.
