# 작업 평가 - Knowledge Skeptic Policy

## 초기 지시

> 관리의 경우 해당 지식 베이스는 계속 늘어나고 만약 그것을 참고할 때 그 내용들이 틀릴 수 있다는 의심하는 에이전트는 항상 있어야해.

## 작업 요약

- `knowledge-skeptic-agent`를 선언형 에이전트로 추가했다.
- 지식 베이스 참고 전 검증하는 Python 헬퍼와 `validate-knowledge` CLI를 추가했다.
- 지식 검증 템플릿, 단위 테스트, 에이전트 문서를 추가했다.
- 지식 베이스 검증 정책, 프롬프트, 워크플로를 추가했다.
- 기존 영구 지시, 작업 규칙, 리서치 정책, 리서치 템플릿에 "지식 베이스는 틀릴 수 있다"는 규칙을 반영했다.
- 운영 맵을 재생성해 새 프롬프트와 워크플로가 탐색 가능하게 했다.

## 먼저 확인한 레퍼런스

- `_research/README.ko.md`
- `_docs/policies/research-capture-policy.ko.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `agent-platform/docs/work-evaluator-agent.md`

## 지식 베이스 검증

`knowledge-skeptic-agent` 입력으로 위 내부 지식 베이스를 검증했다.

- 상태: `ready_to_reference`
- 반대 신호: 없음
- 검증 단계 수: 3
- 회의적 질문 수: 3
- 결론: 이번 구조 변경의 근거로 사용할 수 있다.

## 검증

- `python3 _tools/workspace-index/src/workspace_index.py --check` 통과
- `python3 _tools/task-board/src/task_board.py --check` 통과
- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 14 tests) 통과
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) 통과
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge configs/evaluation/knowledge-validation-template.json` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/knowledge-skeptic-reference-validation.json` 통과
- `git diff --check` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/knowledge-skeptic-policy-evaluation.json` 결과: `ready_to_close` (`changed_files_count`: 32, `verification_count`: 7)

Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 일부 Python 명령에서 출력되었지만 테스트와 CLI 결과에는 영향이 없었다.

## 평가 결과

- 상태: `ready_to_close`
- 재작업 필요: 아니오
- 확인된 차이: 없음
- 개선 아이디어: 향후 작업이 참조 지식 베이스를 선언하면 `validate-knowledge`가 자동 실행되도록 멀티 에이전트 러너에 통합한다.

## 결론

초기 지시대로 지식 베이스를 자동으로 신뢰하지 않고, 참고 전에 의심하고 검증하는 에이전트와 운영 규칙을 저장소 구조에 반영했다.
