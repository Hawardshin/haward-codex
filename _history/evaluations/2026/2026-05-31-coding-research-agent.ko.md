# 작업 평가 보고서: 코딩 조사 에이전트

## 초기 지시

- 코딩용 조사 에이전트를 만들고, 다양한 조사를 할 수 있으며, 조사가 끝났을 때 일반적인 질문들을 다룰 수 있게 한다.
- 저장소의 기존 규칙에 따라 웹 검색 우선, 한국어/영어 문서화, 히스토리, 평가, 커밋, push까지 수행한다.

## 결과 요약

- `coding-research-agent`를 agent-platform에 추가했다.
- Python `complete-coding-research` readiness checker와 CLI 명령을 추가했다.
- API 문서, 라이브러리 선택, 버그 원인, 아키텍처, 성능, 보안, 마이그레이션, 테스트, 오픈소스, 구현 패턴 조사 타입을 정의했다.
- 조사 종료 질문 9개를 필수로 만들었다.
- agent config, planning input template, unit test, 한국어/영어 문서, 운영 프롬프트/워크플로, 보고서 템플릿, 리서치 노트, 계획 히스토리를 추가했다.
- 지속 지시, README, 출처 수집 정책, 검색 기반 계획 정책, 운영 인덱스, 프롬프트 라우터, 맵을 갱신했다.

## References Checked

- Thoughtworks Technology Radar FAQ: https://www.thoughtworks.com/en-us/radar/faq
- ADR GitHub Organization: https://adr.github.io/
- GitHub Docs, Configuring issue templates: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository
- GitHub Docs, Syntax for issue forms: https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms
- 내부 출처 수집 정책: `_docs/policies/source-collection-policy.ko.md`
- 내부 검색 기반 계획 정책: `_docs/policies/search-insight-planning-policy.ko.md`
- 계획 기록: `_history/plans/2026/2026-05-31-coding-research-agent.ko.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/coding-research-grounding.json`
- 결과: `ready_to_publish`
- gaps: 없음

## 지식 베이스 검증

- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/coding-research-knowledge-validation.json`
- 결과: `ready_to_reference`
- gaps: 없음

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 28개 테스트 통과
- `python3 -m unittest discover -s _tools/source-collector/tests`: 4개 테스트 통과
- `python3 -m unittest discover -s tests` from `_templates/python-agent-project/`: 1개 테스트 통과
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research /private/tmp/coding-research-agent-input.json`: `ready_to_implement`
- `PYTHONPATH=src python3 -m agent_platform.cli list-agents --registry configs/agents`: `coding-research-agent` 표시됨
- `python3 _tools/workspace-index/src/workspace_index.py`: 맵 갱신
- `python3 _tools/task-board/src/task_board.py`: 조정 보드 갱신

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 코딩 조사 에이전트, 다양한 조사 타입, 조사 종료 질문, 문서/히스토리/평가 루프를 모두 추가했다.

## Gaps

- 없음

## Improvements

- 코딩 조사에서 자동 소스 수집이 반복되면 `_tools/source-collector/`에 live source provider adapter를 추가한다.

## Follow-Up Actions

- 현재 blocking follow-up은 없다.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-coding-research-agent.ko.md`
- Created: 2026-05-31
