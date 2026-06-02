# Parallel Work Planning Workflow

## Purpose

속도가 문제될 때 작업을 안전하게 병렬 lane으로 나눌 수 있는지 판단한다. 병렬화는 의존성, 파일 경계, 공유 자원, merge 검증이 명확할 때만 사용한다.

## Sequence

1. 웹 우선 검색과 memory bootstrap을 먼저 수행한다.
2. 작업 모드를 선택한다. 병렬화는 모드가 아니라 실행 구조다.
3. 범위가 너무 크거나 파일 후보가 많거나 컨텍스트 압박이 있으면 먼저 [_ops/workflows/76-large-scope-decomposition.md](76-large-scope-decomposition.md)로 source inventory, 제외 기준, 대표 샘플, slice를 만든다.
4. 전체 작업을 작은 `tasks`로 나눈다.
5. 각 task에 `task_id`, `owner`, `scope`, `dependencies`, `touch_paths`, `output_targets`, `verification_steps`, `risk_level`을 기록한다.
6. 여러 조사 lane을 병렬 실행한다면 `merge_gates`를 추가한다. 각 gate는 `wait_for`, `merge_task_id`, `merge_outputs`, `acceptance_checks`를 가져야 한다.
7. downstream 구현/문서는 partial 조사 결과가 아니라 merge task 결과에 의존하게 만든다.
8. `touch_paths`가 겹치는 작업은 같은 batch에 넣지 않는다. 겹치면 dependency를 추가하거나 lane을 합친다.
9. `shared_resources`, `conflict_controls`, `coordination_targets`, `merge_strategy`, `rollback_plan`을 기록한다.
10. `_ops/coordination/status.json`에 active lane을 기록하고 board를 갱신한다.
11. `agent-platform/configs/planning/parallel-work-template.json` 형식으로 입력을 만든다.
12. 다음 명령을 실행한다.

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json
```

13. 결과가 `ready_to_parallelize`면 첫 batch부터 실행한다.
14. 결과가 `sequential_required`면 병렬화하지 않고 순차 실행한다.
15. 결과가 `rework_required`면 gap을 해결하고 다시 계획한다.
16. merge gate batch가 있으면 모든 `wait_for` lane이 완료되고 acceptance check가 통과할 때까지 downstream task를 시작하지 않는다.
17. 모든 lane이 끝나면 최종 merge 검증, evaluator, 커밋, push는 primary agent가 한 번에 수행한다.

## Rule

병렬화는 빠르게 만들기 위한 구조이지 검증을 줄이기 위한 구조가 아니다. 조사는 병렬로 넓게 수행하되, 구현은 merge gate가 합성한 근거를 기준으로 시작한다. 같은 파일, 같은 설정, 같은 git 상태를 건드리는 작업은 명시적 lock이나 dependency 없이 병렬 실행하지 않는다.
