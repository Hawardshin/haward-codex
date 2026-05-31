# 코드 참고 조사 레퍼런스

## 목적

소스 코드를 작성하는 에이전트가 문서 조사만으로 구현하지 않고, 관련 오픈소스 구조와 참고 구현, 잘 작성된 코드와 테스트를 조사하도록 만든 근거를 정리한다.

## 접근일

- 2026-05-31

## 확인한 출처

| 출처 | 유형 | 핵심 참고점 | 적용 |
| --- | --- | --- | --- |
| Public Code Repository Best Practices: https://ospo.library.jhu.edu/learn-grow/public-code-repository-best-practices/ | 공식/기관 문서 | 공개 코드 저장소는 라이선스, README, 기여 문서, 버전, 식별자 같은 품질 신호를 갖추는 것이 좋다. | 참고 코드로 삼기 전에 저장소 품질과 유지보수 신호를 확인한다. |
| CodeHow, Microsoft Research: https://www.microsoft.com/en-us/research/publication/codehow-effective-code-search-based-on-api-understanding-and-extended-boolean-model/ | 논문/연구 | API 이해와 코드 검색을 결합해 관련 구현 예시를 찾는 접근을 설명한다. | 코딩 조사 채널에 code search와 repository search를 명시한다. |
| AWS Architecture Blog, ADR best practices: https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/ | 기술 블로그/공식 엔지니어링 | 구현 전 아키텍처 결정과 관련 문서, 설계 근거를 기록하는 방식을 설명한다. | 참고 구현을 본 뒤 적용/제외 이유를 `code_reference_notes`에 남긴다. |
| Architecture Decision Record examples: https://github.com/architecture-decision-record/architecture-decision-record | 오픈소스/문서 사례 | 아키텍처 결정 기록과 예시를 저장소로 관리한다. | 구현 구조를 선택할 때 코드 구조와 결정 근거를 함께 남긴다. |

## 인사이트

- 코딩 에이전트가 좋은 코드를 만들려면 API 문서뿐 아니라 실제 구현 구조, 테스트 방식, 예외 처리, 모듈 경계까지 봐야 한다.
- 오픈소스 저장소는 그대로 복사할 대상이 아니라 구조와 trade-off를 참고할 자료다.
- 참고한 코드가 무엇인지 기록하지 않으면 나중에 구현 의도와 품질 기준을 추적하기 어렵다.
- `code_reference_sources`와 `code_reference_notes`를 강제하면 구현 전 조사 품질을 검사할 수 있다.

## 적용 결과

- `coding-research-agent` 입력에 `code_reference_sources`, `code_reference_notes`를 추가했다.
- `complete-coding-research`가 code/repository/search channel과 코드 참고 기록을 요구하도록 강화했다.
- `reference_implementation` source type을 추가했다.
- `coding-research-profile.json`에 코드 참고 규칙과 관련 참고 링크를 추가했다.
