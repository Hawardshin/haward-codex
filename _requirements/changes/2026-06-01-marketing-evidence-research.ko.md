# 요구사항 변경: 마케팅/설문/정량 근거 조사

## 변경 ID

- `REQ-WS-029`

## 출처 요청

- `UR-2026-06-01-012`

## 변경 내용

- 마케팅 전략, 소비자 인사이트, 시장 규모, 브랜드/GTM, 책/이론, 설문, 정량 수치 근거 조사는 전용 profile을 사용한다.
- 근거 lane을 이론/책/학술, 설문 방법론, 공개 설문, 공식 통계/공공 데이터, 시장/산업 리포트, 플랫폼/행동 데이터로 분리한다.
- 모든 숫자와 비율은 값, 단위, base, 지역, 기간, 모집단, 방법론, 표본, 스폰서, 비교 가능성을 함께 기록한다.
- 설문 claim은 표본, mode, field date, weighting, sponsor 같은 방법론 정보가 없으면 약한 근거로 downgrade한다.
- 책과 고전 이론은 프레임워크 근거로 쓰되, 현재 시장 규모나 최신 수치는 최신 데이터로 별도 검증한다.

## 근거

- 사용자는 마케터 자료조사, 이론적인 책의 내용, 실제 설문조사, 정량적 수치 근거를 많이 찾는 방법을 원했다.
- 마케팅 자료는 vendor report, survey, platform signal, public statistics가 섞이기 쉬워 근거 역할을 분리해야 한다.
- 숫자 근거는 base와 방법론이 빠지면 계획을 왜곡하므로 추출 필드를 강제하는 설정이 필요하다.

## 검증

- `marketing-evidence-profile.json`이 self-documenting config contract를 통과해야 한다.
- `source-registry.json`이 `book`, `official_statistics`, `survey_dataset`, `market_report` source type을 포함해야 한다.
- `source-discovery-registry.json`에 marketing evidence source group과 추천 검색 순서가 있어야 한다.
- memory bootstrap manifest가 marketing evidence profile을 required warm anchor로 포함해야 한다.
