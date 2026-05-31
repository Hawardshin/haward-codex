# 작업 평가 보고서: 코드 참고 조사 강화

## 초기 지시

- "당연히 소스 코드를 짜는 에이전트를 할 때는 조사 및 오픈소스의 구조나 잘짠 코드들을 참고하기도 해야지."

## 결과 요약

- `coding-research-agent`에 `code_reference_sources`, `code_reference_notes`를 추가했다.
- `complete-coding-research`가 code/repository/source channel과 코드 참고 기록을 요구하도록 강화했다.
- `reference_implementation` source type을 추가했다.
- coding research template, source registry, research profile, docs, prompt, workflow, report template, source collection policy를 갱신했다.
- persistent instructions, AGENTS, README, platform operating model에 지속 규칙으로 반영했다.
- 코드 참고 조사 리서치 노트와 계획 히스토리를 한국어/영어로 추가했다.

## References Checked

- Public Code Repository Best Practices: https://ospo.library.jhu.edu/learn-grow/public-code-repository-best-practices/
- CodeHow, Microsoft Research: https://www.microsoft.com/en-us/research/publication/codehow-effective-code-search-based-on-api-understanding-and-extended-boolean-model/
- AWS ADR best practices: https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/
- Architecture Decision Record examples: https://github.com/architecture-decision-record/architecture-decision-record
- 기존 구현: `agent-platform/src/agent_platform/planning/coding_research.py`
- 기존 설정: `agent-platform/configs/research/coding-research-profile.json`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/code-reference-research-knowledge.json`
- 결과: `ready_to_reference`
- gaps: 없음
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/code-reference-research-grounding.json`
- 결과: `ready_to_publish`
- gaps: 없음

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 40개 테스트 통과
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`, `code_reference_sources_count=2`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract configs/research/source-registry.json configs/research/coding-research-profile.json`: `self_documenting`
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `python3 -m json.tool` on edited JSON files: valid JSON
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/code-reference-research-evaluation.json`: `ready_to_close`

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 소스 코드 작성 전 관련 오픈소스 구조, 참고 구현, 실제 코드와 테스트를 조사하고 그 출처와 배운 점을 필수 기록으로 남기도록 했다.

## Gaps

- 없음

## Improvements

- 이후 repository structure, license, maintenance, tests, examples를 점수화하는 code-reference collector를 만들 수 있다.
- 이후 네트워크 승인이 가능하면 GitHub API로 저장소 품질 메타데이터를 자동 수집할 수 있다.

## Follow-Up Actions

- 현재 blocking follow-up은 없다.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-code-reference-research.ko.md`
- Created: 2026-05-31
