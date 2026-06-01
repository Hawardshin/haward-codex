# 작업 평가 - Project Boundary Policy

## 초기 지시

> 난 이런 모든 세팅 이 강력한 환경을 만든 후에는 직접 프로젝트를 생성해서 그 프로젝트에 해당하는건 그 프로젝트에만 넣어서 하는거야. 이건 모두에게 공통으로 적용되고 공통 툴이 생기지만 나중에 또 다른 관심사가 여러개가 생길거고 다양한 주제로 프로젝트를 진행할 것이기 때문에 그걸 관리할 수 있는 룰도 당연히 정해둬야해

## 작업 요약

- 한국어/영어 프로젝트 경계 정책을 추가했다.
- `_ops/projects/`에 프로젝트 등록부와 한국어/영어 인덱스를 추가했다.
- `agent-platform/`을 현재 core platform 프로젝트로 등록했다.
- 프로젝트 경계 판단 프롬프트와 워크플로를 추가했다.
- 새 프로젝트 생성 프롬프트, 시작/탐색/종료 워크플로에 프로젝트 소유 경계 확인을 연결했다.
- 일반 프로젝트와 Python 에이전트 프로젝트 템플릿에 scope boundary 섹션을 추가했다.
- README, AGENTS, persistent instructions, workspace rules, platform operating model, philosophy 문서에 프로젝트별/공통 자산 분리 원칙을 반영했다.

## 먼저 확인한 레퍼런스

- `_history/plans/2026/2026-05-31-project-boundary-policy.ko.md`
- `AGENTS.md`
- `README.md`
- `_docs/instructions/workspace-rules.md`
- `_docs/governance/capability-governance.md`
- `_templates/project/README.md`
- `_templates/python-agent-project/README.md`
- `_ops/prompts/20-create-project.md`

이번 작업은 내부 프로젝트 관리 규칙 변경이므로 추가 인터넷 조사는 필요하지 않았다.

## 지식 베이스 검증

내부 운영 문서를 근거로 사용하기 전에 `knowledge-skeptic-agent`로 검증했다.

- 상태: `ready_to_reference`
- 참조한 내부 출처 수: 8
- 반대 신호: 없음

## 검증

- `python3 _tools/workspace-index/src/workspace_index.py --check` 통과
- `python3 _tools/task-board/src/task_board.py --check` 통과
- `python3 -m json.tool _ops/projects/registry.json` 통과
- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 19 tests) 통과
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) 통과
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/project-boundary-knowledge-validation.json` 통과
- `git diff --check` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/project-boundary-evaluation.json` 결과: `ready_to_close` (`changed_files_count`: 37, `verification_count`: 7)

Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 일부 Python 명령에서 출력되었지만 테스트와 CLI 결과에는 영향이 없었다.

## 평가 결과

- 상태: `ready_to_close`
- 재작업 필요: 아니오
- 확인된 차이: 없음
- 개선 아이디어: 프로젝트 등록부가 커지면 `_ops/projects` 인덱스 생성/검증 도구를 추가한다.

## 결론

초기 지시대로 공통 운영 환경과 개별 프로젝트의 경계를 명확히 하고, 여러 관심사와 프로젝트를 관리할 수 있는 등록부와 운영 규칙을 추가했다.
