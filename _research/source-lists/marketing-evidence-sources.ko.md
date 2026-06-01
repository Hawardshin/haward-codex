# 마케팅/설문/정량 근거 소스 목록

## 목적

마케팅 전략, 시장 규모, 소비자 인사이트, 브랜드/콘텐츠 전략, GTM, 설문 기반 주장, 이론/책 근거, 정량 수치 근거를 찾을 때 반복해서 참고할 출처 묶음이다.

이 목록은 검색 출발점이며, 실제 주장에 쓰기 전에는 원문, 방법론, 접근일, 수치 맥락을 확인해야 한다.

## 핵심 설정

- `agent-platform/configs/research/marketing-evidence-profile.json`
- `agent-platform/configs/research/source-registry.json`
- `agent-platform/configs/research/source-discovery-registry.json`

## 이론/책/학술 근거

| 출처 | URL | 용도 | 주의 |
| --- | --- | --- | --- |
| Journal of Marketing Research | https://www.ama.org/journal-of-marketing-research/ | 마케팅 리서치 방법론, 실증 연구 | 논문 원문/초록/방법론 확인 |
| Journal of Marketing | https://www.ama.org/journal-of-marketing/ | 마케팅 전략, 시장/고객 관련 학술 연구 | 현재 시장 수치에는 최신 데이터 필요 |
| Google Books API | https://developers.google.com/books/docs/v1/using | 책, 저자, ISBN, 주제 검색 | 책 내용 인용은 접근 가능한 원문 범위 확인 |
| Open Library APIs | https://openlibrary.org/developers/api | 책/저자/edition 메타데이터 검색 | 메타데이터는 원문 내용 증거가 아님 |
| Crossref REST API | https://www.production.crossref.org/documentation/retrieve-metadata/rest-api/ | DOI, 논문 메타데이터, 출판 정보 | DOI 메타데이터와 논문 내용은 분리 |

## 설문 방법론 품질 기준

| 출처 | URL | 용도 | 주의 |
| --- | --- | --- | --- |
| AAPOR Transparency Initiative | https://aapor.org/standards-and-ethics/transparency-initiative/ | 설문 공개 기준, 방법론 체크리스트 | 마케팅 설문 품질 검토 기준으로 사용 |
| AAPOR Best Practices | https://aapor.org/standards-and-ethics/best-practices/ | 설문 설계/분석 모범 관행 | nonprobability sample은 별도 주의 |
| ESOMAR/GRBN Online Sample Quality | https://api.esomar.org/what-we-do/code-guidelines/esomargrbn-guideline-on-online-sample-quality | 온라인 패널 품질, fraud, respondent validation, weighting | 온라인 설문/패널 리포트 검토에 사용 |
| Pew Research Center Methods | https://www.pewresearch.org/our-methods/ | 공개 설문 방법론 예시 | 조사별 method page 확인 |
| Gallup Methodology Center | https://www.gallup.com/178685/methodology-center.aspx | 여론조사/트렌드 조사 방법론 | 조사별 sample/mode/field date 확인 |

## 공개 설문/소비자 인사이트

| 출처 | URL | 용도 | 주의 |
| --- | --- | --- | --- |
| Pew Research Center | https://www.pewresearch.org/ | 여론, 미디어, 기술, 사회 트렌드 설문 | 미국 중심 데이터가 많으므로 지역 적합성 확인 |
| Gallup | https://www.gallup.com/ | 여론, 직장, 글로벌 트렌드 | 무료 공개 범위와 방법론 확인 |
| The CMO Survey | https://cmosurvey.org/ | CMO/마케팅 리더 지표, 예산, 분석, 전략 | 조사 wave, 표본, 질문 기준 확인 |
| Deloitte CMO Survey | https://www.deloitte.com/us/en/programs/chief-marketing-officer/articles/cmo-survey.html | CMO Survey 해석과 최신 마케팅 리더 동향 | Deloitte 관점/후원 맥락 분리 |
| OpenSurvey Blog | https://blog.opensurvey.co.kr/ | 한국 소비자 트렌드, 설문 기반 리포트 | 보고서별 표본과 조사 기간 확인 |

## 공식 통계/공공 데이터

| 출처 | URL | 용도 | 주의 |
| --- | --- | --- | --- |
| World Bank Indicators API | https://datahelpdesk.worldbank.org/knowledgebase/articles/889392 | 국가별 인구/경제/소득 등 시장 분모 | 지표 정의와 최신 연도 확인 |
| OECD Data | https://data.oecd.org/ | OECD 국가 통계 | 국가 범위와 측정 방식 확인 |
| FRED | https://fred.stlouisfed.org/ | 경제 시계열 | 원출처와 계절조정 여부 확인 |
| U.S. Census Data | https://data.census.gov/ | 미국 인구/가구/사업체 데이터 | 미국 외 시장에는 직접 적용 금지 |
| KOSIS | https://kosis.kr/ | 한국 공식 통계 | 지표 정의, 지역, 기간 확인 |
| Bank of Korea ECOS | https://ecos.bok.or.kr/ | 한국 경제/금융 시계열 | 통계표 단위와 발표 주기 확인 |

## 시장/산업 리포트

| 출처 | URL | 용도 | 주의 |
| --- | --- | --- | --- |
| DataReportal | https://datareportal.com/ | 디지털, SNS, 이커머스, 광고 관련 국가별/글로벌 통계 | 원출처와 methodology를 같이 확인 |
| HubSpot State of Marketing | https://www.hubspot.com/state-of-marketing | 마케팅 팀/콘텐츠/자동화/채널 동향 | vendor report이므로 영업 관점과 분리 |
| Salesforce State of Marketing | https://www.salesforce.com/resources/research-reports/state-of-marketing/ | CRM, AI, 고객 참여, 마케팅 운영 동향 | vendor report이므로 sponsor/context 기록 |
| NielsenIQ Insights | https://nielseniq.com/global/en/insights/ | 소비재, 리테일, shopper/category 동향 | 무료 공개 범위와 조사 방법 확인 |
| Kantar Inspiration | https://www.kantar.com/inspiration | 브랜드, 미디어, 소비자 인사이트 | 상업 리서치 맥락 확인 |

## 플랫폼/행동 데이터

| 출처 | URL | 용도 | 주의 |
| --- | --- | --- | --- |
| Google Trends | https://trends.google.com/ | 상대 검색 관심도, 시즌성, 주제 비교 | 절대 검색량이 아님 |
| Google Ads Keyword Planner | https://ads.google.com/home/tools/keyword-planner/ | 키워드 볼륨과 광고 기획 신호 | 계정 접근과 추정치 범위 필요 |
| Meta Ads Library | https://www.facebook.com/ads/library/ | 경쟁 광고/크리에이티브 탐색, 투명성 | 일부 카테고리와 국가별 노출 차이 |
| TikTok Creative Center | https://ads.tiktok.com/business/creativecenter/ | 숏폼 크리에이티브와 플랫폼 트렌드 | 플랫폼 내부 신호로만 사용 |

## 정량 근거 추출 체크리스트

- 값과 단위: 예) 37%, 1.2B USD, 월간 검색량 10K-100K
- 분모/base: 전체 응답자, 특정 세그먼트, 가구 수, 기업 수
- 지역: 글로벌, 미국, 한국, 특정 도시/권역
- 기간: 조사 기간, 기준 연도, 발표일
- 모집단: 소비자, B2B 의사결정자, CMO, 특정 연령대
- 방법론: 표본추출, 패널, 온라인 조사, 행정 통계, 모델 추정
- 표본: sample size, subgroup base, weighting
- 스폰서/펀더: vendor, 협회, 대학, 정부기관
- 비교 가능성: 이전 wave와 방법론이 같은지, 국가 간 기준이 같은지
- 한계: paywall, sample ambiguity, modeled estimate, vendor bias

## 추천 검색 순서

1. 질문을 좁힌다: 시장, 지역, 기간, 타깃, 의사결정 목적.
2. 책/이론과 peer-reviewed source로 프레임워크를 잡는다.
3. 공식 통계로 모집단과 시장 분모를 잡는다.
4. 공개 설문과 CMO/소비자 survey로 태도와 행동 근거를 찾는다.
5. 산업 리포트와 플랫폼 데이터를 통해 현재 트렌드와 benchmark를 보완한다.
6. 한국 시장이면 KOSIS, OpenSurvey, Naver/Kakao/한국 커뮤니티 신호를 별도로 확인한다.
7. 모든 숫자는 `marketing-evidence-profile.json`의 `quantitative_evidence_fields` 형태로 저장한다.
