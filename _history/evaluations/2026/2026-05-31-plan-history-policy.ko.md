# 작업 평가 - Plan History Policy

## 초기 지시

> 에이전트가 Plan을 짜는 과정 역시 히스토리로 잘 저장해야해.

## 작업 요약

- `_history/plans/`를 계획 과정 저장 위치로 추가했다.
- `_templates/plan-history/`에 한국어/영어 계획 히스토리 템플릿을 추가했다.
- `research-insight-planner-agent` 입력에 `plan_history_targets`를 추가했다.
- `plan-from-research`가 계획 히스토리 저장 위치 누락을 gap으로 반환하도록 변경했다.
- 계획 프롬프트, 워크플로, 종료/평가 워크플로, 지속 지시, 작업 규칙, 플랫폼 문서를 업데이트했다.
- 이번 작업의 계획 과정 자체를 `_history/plans/2026/2026-05-31-plan-history-policy.ko.md`와 영어 companion 파일로 저장했다.

## 먼저 확인한 레퍼런스

- `_history/plans/2026/2026-05-31-plan-history-policy.ko.md`
- `AGENTS.md`
- `README.md`
- `_history/README.md`
- `_ops/workflows/55-research-insight-planning.md`
- `agent-platform/src/agent_platform/planning/research_insight_planner.py`
- `agent-platform/tests/test_research_insight_planner.py`

이번 작업은 저장소 내부 운영 구조 변경이므로 추가 인터넷 조사는 필요하지 않았다.

## 지식 베이스 검증

내부 운영 문서를 근거로 사용하기 전에 `knowledge-skeptic-agent`로 검증했다.

- 상태: `ready_to_reference`
- 참조한 내부 출처 수: 6
- 반대 신호: 없음

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 19 tests) 통과
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) 통과
- `python3 _tools/workspace-index/src/workspace_index.py --check` 통과
- `python3 _tools/task-board/src/task_board.py --check` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/plan-history-knowledge-validation.json` 통과
- `git diff --check` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/plan-history-policy-evaluation.json` 결과: `ready_to_close` (`changed_files_count`: 32, `verification_count`: 7)

Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 일부 Python 명령에서 출력되었지만 테스트와 CLI 결과에는 영향이 없었다.

## 평가 결과

- 상태: `ready_to_close`
- 재작업 필요: 아니오
- 확인된 차이: 없음
- 개선 아이디어: 계획 기록이 여러 개 쌓이면 `_history/plans/` HTML 인덱스를 생성한다.

## 결론

초기 지시대로 계획 과정 자체를 히스토리 파일로 저장하는 구조와 강제 조건을 추가했다.
