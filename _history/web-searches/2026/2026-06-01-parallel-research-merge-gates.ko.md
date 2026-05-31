# 웹 검색 기록: 병렬 조사 merge gate

## 검색 일시

- 날짜: 2026-06-01
- 목적: 병렬 조사 lane을 fan-out으로 실행하고, 모든 lane을 기다린 뒤 fan-in/merge하는 구조의 근거 확인

## 검색 쿼리

- `fan out fan in workflow dependencies merge barrier official documentation GitHub Actions needs multiple jobs`
- `Prefect task mapping wait_for dependencies fan out fan in official docs`
- `Apache Airflow dynamic task mapping task group fan in dependencies official docs`
- `LangGraph parallel branches reducer merge state official documentation`

## 확인한 주요 출처

| 출처 | 유형 | 사용 이유 |
| --- | --- | --- |
| https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds | official | 여러 job이 끝난 뒤 downstream job이 `needs`로 기다리는 구조 참고 |
| https://docs.prefect.io/v3/how-to-guides/workflows/run-work-concurrently | official | concurrent work와 task future/wait 패턴 참고 |
| https://docs.prefect.io/v3/concepts/tasks | official | task dependency와 state dependency 개념 참고 |
| https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html | official | map/reduce 방식의 확장 task와 합산 단계 참고 |
| https://langchain-ai.github.io/langgraph/how-tos/branching/ | official | parallel branches와 reducer 기반 state merge 개념 참고 |

## 약한 출처 처리

- 블로그나 비공식 예제는 이번 구현의 사실 근거로 사용하지 않았다.
- 외부 도구를 설치하거나 실행 엔진을 도입하지 않고, 개념을 planner 검증 계약으로만 반영했다.

## 계획 영향

- 여러 조사 lane이 같은 batch에서 실행되면 `merge_gates`를 요구한다.
- merge gate는 모든 upstream research lane을 기다리는 `wait_for`와 downstream release task인 `merge_task_id`를 가진다.
- implementation은 partial research note가 아니라 `research-synthesis` output에 의존한다.

## 불확실성

- 외부 워크플로 엔진의 API는 변할 수 있다. 이 작업은 구체 API가 아니라 fan-out/fan-in 의존성 패턴만 반영한다.
