# 중복/겹침 감사: 출처 discovery와 리뷰 조사

## 목적

현재 작업 전체를 보았을 때 계속 겹치는 영역을 정리하고, 어느 파일을 source of truth로 볼지 정한다.

## 발견한 겹침

| 영역 | 겹치는 파일 | 판단 | 정리 규칙 |
| --- | --- | --- | --- |
| 출처 유형 taxonomy | `source-registry.json`, source collection policy, source collector | 의도된 겹침 | 출처 유형의 원천은 `source-registry.json`; 정책은 사용 규칙; 도구는 점수화 실행 |
| 고신뢰 사이트 목록 | `enterprise-source-registry.json`, `enterprise-high-quality-sites.*.md`, `source-discovery-registry.json` | 일부 겹침 | 대기업/고신뢰 seed는 `enterprise-source-registry.json`; 더 넓은 검색 origin은 `source-discovery-registry.json`; Markdown은 사람이 읽는 요약 |
| 조사 계획 기록 | web search records, plan history, research notes | 의도된 계층 | web search는 검색 행위, plan history는 결정 과정, research notes는 재사용 지식 |
| 평가/검증 | evaluation files, validation spec, request trace | 의도된 계층 | spec validation은 명령 결과, evaluation은 초기 지시 대비 평가, request trace는 요청-결과 연결 |
| 작업 요약 | detailed history, work summary, request trace, dashboard | 일부 반복 | detailed history는 장문 로그, work summary는 사람이 빠르게 읽는 요약, request trace는 요청별 추적 |
| 한국 리뷰 조사 | source collector, Korean local review tool | 분리 필요 | 일반 출처 bundle은 source collector, 한국 로컬 리뷰 후보 점수화는 Korean local review tool |

## 결론

- 지금 겹침의 대부분은 중복이라기보다 계층 분리다.
- 위험한 중복은 “같은 목록을 여러 곳에서 각각 truth처럼 유지”하는 경우다.
- 앞으로 추가 source는 먼저 JSON registry에 넣고, Markdown source list는 사람이 읽는 요약으로만 갱신한다.
- 한국 사용자 리뷰/로컬 조사와 일반 기술 리서치는 도구와 평가 기준을 분리한다.

## 개선 규칙

- 새 registry가 생기면 어떤 파일이 source of truth인지 명시한다.
- 같은 데이터를 Markdown과 JSON에 둘 때 JSON이 원천, Markdown은 요약이다.
- 평가 보고서는 “어떤 근거를 어디서 가져왔는지”를 `source_provenance_targets`와 `plan_evidence_targets`로 연결한다.
