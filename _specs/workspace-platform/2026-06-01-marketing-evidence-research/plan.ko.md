# 계획: 마케팅/설문/정량 근거 조사

## 작업 모드

- `governance`

## 근거

- 사용자는 마케터 자료조사, 이론적 책 내용, 실제 설문, 정량 수치 근거를 많이 찾을 수 있는 방법을 요청했다.
- 웹 검색으로 AAPOR/ESOMAR/Pew/Gallup 방법론 기준, CMO Survey/DataReportal/World Bank 같은 데이터 출처, Google Books/Crossref 같은 책/논문 metadata 출처를 확인했다.
- 기존 research profile은 일반 조사와 코딩 조사에는 강하지만, 마케팅 수치와 설문 방법론 필드를 명시적으로 강제하지 않았다.

## 단계

1. 공식/방법론/데이터/책/논문 출처를 웹 검색으로 확인한다.
2. `marketing-evidence-profile.json`을 추가해 evidence lane, source group, search sequence, numeric extraction fields를 정의한다.
3. 기존 research 설정과 README가 새 profile을 발견하게 갱신한다.
4. AGENTS, persistent instructions, source/search 정책, memory bootstrap에 durable rule을 추가한다.
5. 재사용 가능한 마케팅 evidence source list를 한국어/영어로 저장한다.
6. 요구사항, 스펙, 웹 검색 기록, 히스토리, 평가를 남기고 검증한다.
