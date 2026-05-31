# 계획 기록: 병렬 작업 계획 구조

## 요청

- 작업 속도가 느려질 수 있으므로 병렬 처리 구조를 마련한다.

## 조사와 근거

- 웹 검색으로 Airflow DAG/task dependency, Prefect task state dependency, Dagster asset dependency, GitHub Actions `needs` dependency를 확인했다.
- 내부 기준으로는 work mode routing, coordination board, spec-driven lifecycle, evaluator requirements를 확인했다.

## 실행 계획

1. `REQ-WS-023`과 spec-driven 산출물을 만든다.
2. 작업 단위를 `task_id`, `dependencies`, `touch_paths`, `output_targets`, `verification_steps`로 표현하는 Python planner를 만든다.
3. 같은 batch의 touch path overlap, cycle, unknown dependency, 필수 coordination/merge/rollback 누락을 gap으로 처리한다.
4. `plan-parallel-work` CLI와 단위 테스트를 추가한다.
5. 운영 프롬프트/워크플로, agent spec, template, 메모리 anchor, coordination status, history/evaluation을 갱신한다.

## 결정

- 병렬화는 별도 work mode가 아니라 기존 work mode 위에서 동작하는 실행 구조다.
- 지금은 실행 엔진을 만들지 않고 planning checker만 만든다.
- 최종 커밋과 push는 primary agent가 merge 검증 이후 한 번에 수행한다.
