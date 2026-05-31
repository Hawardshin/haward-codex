# 작업 평가: 병렬 작업 계획 구조

## 평가 대상

- 사용자 요청: 속도 저하를 줄이기 위해 작업을 병렬로 처리할 수 있는 구조를 마련할 것.
- 작업 모드: `governance`
- 요구사항: `REQ-WS-023`
- 관련 계획: `_history/plans/2026/2026-06-01-parallel-work-planning.ko.md`

## 완료 요약

- `parallel-work-planner-agent`와 `plan-parallel-work` CLI를 추가했다.
- 작업 단위를 `task_id`, `dependencies`, `touch_paths`, `output_targets`, `verification_steps`로 구조화했다.
- cycle, unknown dependency, 같은 batch의 path overlap, coordination/merge/rollback 누락을 gap으로 판정한다.
- 병렬 작업용 템플릿, agent spec, 워크플로, 프롬프트, 문서, 메모리 anchor, coordination board를 갱신했다.
- 요구사항, spec-driven 산출물, 웹 검색 기록, 리서치 노트, 요청 요약, 요청-결과 추적, 작업 요약을 남겼다.

## 확인한 근거

- Airflow DAG/task dependency 공식 문서
- Prefect task dependency 공식 문서
- GitHub Actions `jobs.<job_id>.needs` 공식 문서
- 기존 work mode registry와 coordination board
- 이전 평가 기록: `_history/evaluations/2026/2026-06-01-maintainable-language-architecture-folders.ko.md`

## 검증

- `python3 -m json.tool` for changed JSON configs: 통과
- `PYTHONPATH=src python3 -m unittest tests/test_parallel_work.py`: OK, 6 tests
- `PYTHONPATH=src python3 -m unittest discover -s tests`: OK, 88 tests
- `PYTHONPATH=src python3 -m agent_platform.cli plan-parallel-work configs/planning/parallel-work-template.json`: `ready_to_parallelize`
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research`: `ready_to_plan`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 _tools/task-board/src/task_board.py --check`: 통과
- `python3 _tools/workspace-index/src/workspace_index.py --check`: 통과
- `git diff --check`: 통과
- `work-evaluator-agent`: `ready_to_close`

## 평가 결과

- 초기 지시와 결과의 차이: 없음. 병렬 실행 엔진 자체는 의도적으로 범위에서 제외하고, 안전한 병렬 계획/검증 구조를 먼저 만들었다.
- 개선 아이디어: 실제 사용 사례가 쌓이면 optional executor나 git worktree 기반 lane runner를 별도 요구사항으로 검토한다.
- 차단 gap: 없음.
