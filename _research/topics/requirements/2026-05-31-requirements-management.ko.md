# 요구사항 관리 생명주기

## 질문

사용자의 작업과 지시를 요구사항으로 정의하고, 수정/검토/구현/평가까지 이어가려면 어떤 구조가 필요한가?

## 확인한 출처

| 출처 | 유형 | 확인일 | 활용 |
| --- | --- | --- | --- |
| [NASA: Requirements Management](https://www.nasa.gov/reference/6-2-requirements-management/) | 공식 문서 | 2026-05-31 | 요구사항 기준선, 변경 요청, 양방향 추적성, 영향 평가, 검증/검토 원칙을 참고했다. |
| [IBM Engineering Requirements Management DOORS traceability](https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/doors/9.7.2?topic=information-traceability) | 공식 문서 | 2026-05-31 | 요구사항과 관련 정보의 추적 관계를 관리한다는 개념을 참고했다. |
| [Atlassian: requirements traceability matrix](https://www.atlassian.com/agile/product-management/requirements-traceability-matrix) | 실무 문서 | 2026-05-31 | 요구사항을 구현 산출물, 검증, 상태와 연결하는 표 구조를 참고했다. |
| [Reqtest: Requirements Traceability Matrix](https://reqtest.com/requirements-blog/requirements-traceability-matrix/) | 실무 문서 | 2026-05-31 | coverage gap을 확인하는 행 단위 추적 방식을 참고했다. |
| [GNU Coding Standards: Change Logs](https://www.gnu.org/prep/standards/html_node/Change-Logs.html) | 공식/표준 문서 | 2026-05-31 | 변경 기록을 나중에 찾아볼 수 있어야 한다는 운영 원칙을 참고했다. |

## 인사이트

- 요구사항은 안정적인 ID, 상태, 출처 요청, 검증 방법, 연결 산출물을 가져야 한다.
- 요구사항은 단일 문서가 아니라 기준선, 변경 기록, 검토 기록으로 나뉘어야 한다.
- 작업 종료 평가는 요구사항 target을 확인해야 한다. 그렇지 않으면 요청 요약과 구현 결과 사이의 기준이 빠질 수 있다.
- 현재 규모에서는 Markdown 파일이 충분하다. 요구사항 수가 늘면 `_tools/`에 인덱싱/coverage 검사 도구를 만들 후보가 된다.

## 적용

- `_requirements/`를 추가했다.
- `requirements-manager-agent`와 요구사항 생명주기 프롬프트/워크플로를 추가했다.
- `work-evaluator-agent`에 `requirements_targets`를 추가했다.
