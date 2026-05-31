# 스펙: 병렬 조사 merge gate

## 목표

여러 조사 lane을 병렬 실행한 뒤, 모든 결과를 기다려 합성하고 downstream 구현을 release하는 fan-out/fan-in 구조를 만든다.

## 요구사항

- `REQ-WS-024`
- 병렬 조사 lane은 서로 다른 `touch_paths`에 결과를 남긴다.
- 같은 batch에 조사 lane이 2개 이상 있으면 `merge_gates`가 필요하다.
- merge gate의 `merge_task_id`는 모든 `wait_for` task에 dependency를 가져야 한다.
- downstream 구현은 partial research note가 아니라 merge task output에 의존한다.

## 구현 범위

- `parallel_work.py`에 `ParallelMergeGate`와 merge gate 검증 추가
- 기본 template을 병렬 조사 lane + `research-synthesis` 구조로 갱신
- 테스트와 문서 갱신

## 제외 범위

- 실제 병렬 executor 구현
- 원격 agent orchestration
- 자동 conflict resolution
