# 2026-05-31 웹 검색 기록: 요구사항 관리

## 사용자 지시 요약

사용자는 작업을 통해 요구사항을 정의하고, 요구사항을 계속 수정/검토하며, 그 요구사항을 기반으로 만들어야 한다고 지시했다.

## 검색 실행

- 검색 시각: 2026-05-31
- 검색어:
  - `requirements management iterative requirements review traceability change control best practices`
  - `requirements engineering lifecycle validation traceability change management best practices`
  - `requirements traceability matrix implementation artifact verification status best practices`
- 검색 도구: Codex web search

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| [NASA: Requirements Management](https://www.nasa.gov/reference/6-2-requirements-management/) | 공식 문서 | 2026-05-31 | 요구사항 기준선, 변경 요청, 양방향 추적성, 검증/검토, 변경 영향 평가 원칙을 참고했다. |
| [IBM Engineering Requirements Management DOORS traceability](https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/doors/9.7.2?topic=information-traceability) | 공식 문서 | 2026-05-31 | 요구사항과 산출물 사이의 추적 관계를 관리한다는 운영 개념을 참고했다. |
| [Atlassian: requirements traceability matrix](https://www.atlassian.com/agile/product-management/requirements-traceability-matrix) | 실무 문서 | 2026-05-31 | 요구사항, 산출물, 검증, 상태를 표로 연결하는 구조를 참고했다. |
| [Reqtest: Requirements Traceability Matrix](https://reqtest.com/requirements-blog/requirements-traceability-matrix/) | 실무 문서 | 2026-05-31 | 요구사항 coverage와 테스트/결함 연결 관점을 참고했다. |
| [GNU Coding Standards: Change Logs](https://www.gnu.org/prep/standards/html_node/Change-Logs.html) | 공식/표준 문서 | 2026-05-31 | 변경 이유와 위치를 나중에 추적할 수 있어야 한다는 기록 원칙을 참고했다. |

## 제외하거나 보조로만 본 출처

- vendor 자료는 공식/실무 관점으로만 사용했고, 단일 도구 구매 권고로 사용하지 않았다.
- 커뮤니티 글과 일반 블로그는 요구사항 관리 원칙을 뒷받침하는 보조 신호로만 취급했다.

## 계획에 반영한 인사이트

- 요구사항은 단순 요청 원문이 아니라 검증 가능한 문장과 안정적인 ID가 필요하다.
- 요구사항 변경은 기준선, 변경 기록, 검토 기록을 함께 남겨야 나중에 영향 범위를 확인할 수 있다.
- 구현/평가 단계는 요구사항 파일 경로를 `requirements_targets`로 받아 누락을 blocking gap으로 잡아야 한다.

## 남은 불확실성

- 현재는 Markdown 기반 요구사항 관리로 시작한다. 요구사항 수가 많아지면 전용 도구나 로컬 인덱서가 필요할 수 있다.

## 연결

- 요구사항 기준선: `_requirements/baselines/2026-05-31-workspace-platform.ko.md`
- 요구사항 변경 기록: `_requirements/changes/2026-05-31-requirements-management.ko.md`
- 요구사항 검토 기록: `_requirements/reviews/2026-05-31-workspace-platform.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-05-31-requirements-management.ko.md`
