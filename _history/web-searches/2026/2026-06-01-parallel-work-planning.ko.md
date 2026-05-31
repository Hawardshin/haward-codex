# 웹 검색 기록: 병렬 작업 계획 구조

## 검색 일시

- 날짜: 2026-06-01
- 목적: 작업 속도 개선을 위해 병렬 lane, task dependency, DAG, conflict control 구조를 설계할 근거 확인

## 검색 쿼리

- `workflow orchestration DAG task dependencies parallel execution best practices official documentation`
- `Prefect workflow orchestration task dependencies parallel execution documentation`
- `Dagster assets dependencies orchestration official documentation`
- `Airflow DAG task dependencies parallel execution official documentation`
- `Apache Airflow DAG dependencies official documentation tasks dependencies`
- `Prefect 3 tasks dependencies concurrency official documentation`
- `Dagster asset dependencies official documentation`
- `GitHub Actions jobs needs dependencies official documentation`

## 확인한 주요 출처

| 출처 | 유형 | 사용 이유 |
| --- | --- | --- |
| https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html | official | task, dependency, upstream/downstream 개념 참고 |
| https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html | official | DAG 기반 task 관계와 실행 순서 참고 |
| https://docs.prefect.io/v3/concepts/tasks | official | task dependency와 state dependency 개념 참고 |
| https://docs.dagster.io/getting-started/what-why-dagster | official | asset dependency 개념 seed |
| https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds | official | jobs와 `needs` dependency seed |

## 약한 출처 처리

- 블로그/커뮤니티 글은 이번 구현의 사실 근거로 쓰지 않았다.
- Airflow/Prefect/Dagster/GitHub Actions는 실제 실행 엔진 참고이며, 이 저장소에는 바로 도입하지 않고 가벼운 계획 검증기로만 반영했다.

## 계획 영향

- 작업을 DAG처럼 `task_id`와 `dependencies`로 기록한다.
- 같은 batch에서 실행되는 작업은 `touch_paths`가 겹치지 않아야 한다.
- 병렬 실행 전 shared resources, conflict controls, coordination targets, merge strategy, rollback plan을 요구한다.
- 실제 병렬 실행 엔진은 범위에서 제외하고 `plan-parallel-work` checker만 만든다.

## 불확실성

- 외부 도구의 정확한 API/버전은 시간이 지나면 바뀔 수 있다. 이 작업은 개념 구조만 반영한다.
