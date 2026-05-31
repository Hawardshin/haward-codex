# 2026-05-31 웹 검색 기록: 요청-결과 추적

## 사용자 지시 요약

사용자는 어떤 요청이 있었고, 어떤 일이 됐고, 그 요청이 무엇이었는지 문서 관리가 계속 이어져야 한다고 지시했다.

## 검색 실행

- 검색 시각: 2026-05-31
- 검색어:
  - `requirements traceability matrix documentation request outcome tracking best practices`
  - `software project decision log request outcome traceability documentation best practices`
  - `issue tracking requirements traceability documentation change log best practices`
  - `IBM traceability matrix requirements traceability matrix`
  - `Atlassian requirements traceability matrix`
- 검색 도구: Codex web search

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| [IBM Engineering Requirements Management DOORS traceability](https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/doors/9.7.2?topic=information-traceability) | 공식 문서 | 2026-05-31 | 요구사항과 관련 정보의 관계를 추적한다는 기본 개념을 참고했다. |
| [Atlassian: requirements traceability matrix](https://www.atlassian.com/agile/product-management/requirements-traceability-matrix) | 실무 문서 | 2026-05-31 | 요구사항을 산출물, 테스트, 상태와 연결하는 traceability matrix 구조를 참고했다. |
| [Reqtest: Requirements Traceability Matrix](https://reqtest.com/requirements-blog/requirements-traceability-matrix/) | 실무 문서 | 2026-05-31 | requirement, test case, defect처럼 추적 항목을 행 단위로 연결하는 관점을 참고했다. |
| [GNU Coding Standards: Change Logs](https://www.gnu.org/prep/standards/html_node/Change-Logs.html) | 공식/표준 문서 | 2026-05-31 | 나중에 변경 이유와 영향을 찾을 수 있는 기록의 필요성을 참고했다. |

## 계획에 반영한 인사이트

- 요청 요약과 작업 요약은 각각 필요하지만, 둘만으로는 "요청이 어떤 결과로 닫혔는가"를 한눈에 보기 어렵다.
- 별도 요청-결과 추적표를 두고 요청 ID, 결과, 산출물, 평가, 커밋을 한 행에 연결한다.
- 종료 평가에서 `request_trace_targets`를 요구해 누락을 막는다.

## 연결

- 요청-결과 추적: `_history/request-traces/2026/2026-05-31.ko.md`
- 요청 요약: `_history/user-requests/2026/2026-05-31.ko.md`
- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-request-outcome-trace.ko.md`
