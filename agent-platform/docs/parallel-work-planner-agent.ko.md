# Parallel Work Planner Agent

`parallel-work-planner-agent`는 작업을 여러 lane으로 나누어도 되는지 판단하는 계획 에이전트다. 속도를 위해 병렬화하되, 같은 파일을 동시에 수정하거나 숨은 의존성을 놓쳐서 재작업이 커지는 일을 막는다.

## 원칙

- 병렬화는 기본값이 아니라 검증된 선택이어야 한다.
- 각 작업은 `task_id`, `dependencies`, `touch_paths`, `output_targets`, `verification_steps`를 가져야 한다.
- 같은 batch에서 실행되는 작업은 서로 겹치는 `touch_paths`를 가져서는 안 된다.
- 여러 조사 lane이 같은 batch에서 병렬 실행되면 `merge_gates`로 합성 지점을 명시해야 한다.
- downstream 구현은 partial 조사 파일이 아니라 merge task의 합성 결과에 의존해야 한다.
- 공유 자원과 충돌 제어는 `shared_resources`, `conflict_controls`에 기록한다.
- 진행 중인 lane과 상태는 `_ops/coordination/status.json`과 board에서 볼 수 있어야 한다.
- 모든 lane이 끝난 뒤 최종 merge 검증을 한 번 더 수행한다.

## CLI

```bash
PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json
```

## 입력 필드

- `objective`: 병렬화하려는 전체 목표
- `work_mode`: 선택한 작업 모드
- `tasks`: 병렬 후보 작업 목록
- `merge_gates`: 병렬 lane을 기다려 합치는 fan-in 지점
- `dependencies`: 작업 간 선후행 관계
- `touch_paths`: 작업이 건드릴 파일/폴더
- `output_targets`: 완료 산출물
- `verification_steps`: lane별 검증
- `shared_resources`: git index, 원격 브랜치, coordination status 같은 공유 자원
- `conflict_controls`: 파일 소유권, lock, branch/worktree, handoff 규칙
- `coordination_targets`: 상태를 기록할 위치
- `merge_strategy`: lane 산출물을 합치는 방식
- `rollback_plan`: 실패 lane을 분리하고 복구하는 방식
- `wait_for`: merge gate가 기다려야 하는 upstream lane
- `merge_task_id`: upstream lane을 합성하고 downstream work를 release하는 task
- `merge_outputs`: 합성 결과 파일
- `acceptance_checks`: downstream release 전 통과해야 하는 기준

## 상태

- `ready_to_parallelize`: 독립 batch가 있고 충돌/누락이 없다.
- `sequential_required`: gap은 없지만 독립 batch가 없어 순차 실행이 맞다.
- `rework_required`: 의존성, 충돌, 검증, coordination 누락이 있다.

## 병렬 조사 합성

조사는 공식 문서, 커뮤니티 신호, 오픈소스 참고 구현처럼 서로 다른 lane으로 병렬 실행할 수 있다. 다만 구현은 각 lane의 partial note를 직접 기준으로 삼지 않는다. `research-synthesis` 같은 merge task가 모든 조사 lane을 기다리고, 모순과 불확실성을 정리하고, accepted evidence를 남긴 뒤 다음 batch를 release한다.

## 사용 시점

- 사용자가 속도를 우려하거나 병렬 처리를 요청할 때
- 리서치, 코드, 문서, 검증이 독립적으로 나눠질 수 있을 때
- 여러 에이전트나 세션이 동시에 작업할 가능성이 있을 때

작업이 작거나 같은 파일을 계속 만지는 경우에는 병렬화하지 않고 `quick` 또는 `ship_first` 같은 모드로 전체 루프 비용을 줄이는 쪽이 더 낫다.
