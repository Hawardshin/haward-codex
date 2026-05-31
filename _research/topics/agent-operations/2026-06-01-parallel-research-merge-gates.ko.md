# 병렬 조사 merge gate

## 요약

조사는 공식 문서, 커뮤니티 신호, 오픈소스 참고 구현처럼 서로 다른 lane으로 병렬 실행할 수 있다. 그러나 구현은 partial 조사 결과에 의존하면 안 된다. 모든 조사 lane을 기다리는 merge gate가 합성 결과를 만들고, acceptance check를 통과한 뒤 downstream 구현을 release해야 한다.

## 재사용 규칙

- 병렬 조사 lane은 각자 별도 `touch_paths`에 결과를 남긴다.
- 같은 batch에 조사 lane이 2개 이상 있으면 `merge_gates`가 필요하다.
- `merge_task_id`는 모든 `wait_for` task를 dependency로 가져야 한다.
- merge gate는 `merge_outputs`와 `acceptance_checks`를 기록한다.
- implementation은 `research-synthesis` 같은 merge task에 의존한다.

## 참고 출처

- GitHub Actions `needs`: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds
- Prefect concurrent work: https://docs.prefect.io/v3/how-to-guides/workflows/run-work-concurrently
- Prefect tasks: https://docs.prefect.io/v3/concepts/tasks
- Airflow dynamic task mapping: https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html
- LangGraph branching: https://langchain-ai.github.io/langgraph/how-tos/branching/

## 적용

`parallel-work-template.json`은 이제 `official-docs-research`, `community-signal-research`, `open-source-reference-research`를 첫 batch로 실행하고, `research-synthesis` merge gate를 통과한 뒤 implementation으로 넘어간다.
