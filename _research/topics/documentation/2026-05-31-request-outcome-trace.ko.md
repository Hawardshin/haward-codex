# 요청-결과 추적 레퍼런스

## 질문

사용자의 요청과 실제 작업 결과를 시간이 지나도 계속 연결하려면 어떤 구조가 필요한가?

## 확인한 출처

| 출처 | 유형 | 확인일 | 활용 |
| --- | --- | --- | --- |
| [IBM Engineering Requirements Management DOORS traceability](https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/doors/9.7.2?topic=information-traceability) | 공식 문서 | 2026-05-31 | 요구사항과 관련 정보의 관계를 추적하는 개념을 참고했다. |
| [Atlassian: requirements traceability matrix](https://www.atlassian.com/agile/product-management/requirements-traceability-matrix) | 실무 문서 | 2026-05-31 | 요구사항을 산출물, 검증, 상태와 연결하는 표 구조를 참고했다. |
| [Reqtest: Requirements Traceability Matrix](https://reqtest.com/requirements-blog/requirements-traceability-matrix/) | 실무 문서 | 2026-05-31 | 행 단위 추적과 coverage 확인 방식을 참고했다. |
| [GNU Coding Standards: Change Logs](https://www.gnu.org/prep/standards/html_node/Change-Logs.html) | 공식/표준 문서 | 2026-05-31 | 변경 이유와 영향을 나중에 추적할 수 있어야 한다는 원칙을 참고했다. |

## 인사이트

- 요청 요약은 "무엇을 원했는가"를 설명한다.
- 작업 요약은 "무엇을 했는가"를 설명한다.
- 요청-결과 추적은 둘을 연결해 "요청이 어떤 결과로 닫혔는가"를 설명한다.
- 요청 ID가 있어야 나중에 작업, 평가, 커밋을 안정적으로 연결할 수 있다.

## 적용

- `_history/request-traces/`를 추가했다.
- 2026-05-31 누적 요청 35개를 요청-결과 추적표에 연결했다.
- `work-evaluator-agent`에 `request_trace_targets`를 추가했다.
