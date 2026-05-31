# 병렬 작업 계획 구조

## 요약

작업 속도를 높이기 위한 병렬화는 단순히 여러 일을 동시에 시작하는 것이 아니라, DAG처럼 작업과 의존성을 명시하고 같은 batch의 파일/자원 충돌을 제거한 뒤 실행해야 한다.

## 재사용 규칙

- 작업은 `task_id`, `dependencies`, `touch_paths`, `output_targets`, `verification_steps`를 가진다.
- 독립 batch는 의존성이 충족되고 `touch_paths`가 겹치지 않는 작업들로 만든다.
- `shared_resources`에는 git index, 원격 브랜치, coordination status 같은 공유 자원을 적는다.
- `conflict_controls`에는 파일 소유권, lock, branch/worktree, handoff 규칙을 적는다.
- 병렬 lane은 `_ops/coordination/status.json`에 기록하고 board를 재생성한다.
- 최종 commit/push는 병렬 lane이 아니라 primary agent가 merge 검증 후 수행한다.

## 참고 출처

- Airflow tasks: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/tasks.html
- Airflow DAGs: https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html
- Prefect tasks: https://docs.prefect.io/v3/concepts/tasks
- Dagster asset dependency example: https://docs.dagster.io/getting-started/what-why-dagster
- GitHub Actions `needs`: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#jobsjob_idneeds

## 주의

병렬화는 검증을 줄이지 않는다. 같은 파일이나 공유 자원을 만지는 작업은 dependency나 lock 없이 병렬 실행하지 않는다.
