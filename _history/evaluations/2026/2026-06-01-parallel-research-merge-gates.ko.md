# 작업 평가: 병렬 조사 merge gate

## 평가 대상

- 사용자 요청: 병렬 조사 lane을 실행한 뒤, 모두 끝나면 결과를 합치는 구조가 필요하다.
- 작업 모드: `governance`
- 요구사항: `REQ-WS-024`
- 관련 계획: `_history/plans/2026/2026-06-01-parallel-research-merge-gates.ko.md`

## 완료 요약

- `parallel-work-planner-agent`에 `ParallelMergeGate`와 `merge_gates` 검증을 추가했다.
- 여러 research lane이 같은 batch에 있으면 모든 research lane을 기다리는 merge gate가 필요하다.
- merge task가 모든 `wait_for` task에 dependency를 갖지 않으면 gap으로 처리한다.
- 기본 template을 `official-docs-research`, `community-signal-research`, `open-source-reference-research` 후 `research-synthesis`로 합치는 구조로 바꿨다.
- 구현은 partial 조사 note가 아니라 synthesis output에 의존하도록 문서화했다.

## 확인한 근거

- GitHub Actions `jobs.<job_id>.needs` 공식 문서
- Prefect concurrent work와 task dependency 공식 문서
- Airflow dynamic task mapping 공식 문서
- LangGraph branching/reducer 공식 문서
- 이전 병렬 작업 평가: `_history/evaluations/2026/2026-06-01-parallel-work-planning.ko.md`

## 검증

- `PYTHONPATH=src python3 -m unittest tests/test_parallel_work.py`: OK, 9 tests
- `PYTHONPATH=src python3 -m unittest discover -s tests`: OK, 91 tests
- `python3 -m json.tool` for changed JSON configs: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json`: `ready_to_parallelize`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `work-evaluator-agent`: `ready_to_close`

## 평가 결과

- 초기 지시와 결과의 차이: 없음. 병렬 조사 후 합성하는 구조가 `merge_gates`로 반영됐다.
- 개선 아이디어: coordination board에 실제 lane 완료 시각과 merge gate block 상태를 표시하는 기능을 나중에 추가할 수 있다.
- 차단 gap: 없음.
