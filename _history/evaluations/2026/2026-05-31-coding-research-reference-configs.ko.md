# 작업 평가 보고서: 코딩 조사 참고 설정 파일

## 초기 지시

- "단순하게 하는게 아니라 설정 파일들로 내가 무엇에서 참고하고 있는지 그런거 세팅도 해줘야해."

## 결과 요약

- `agent-platform/configs/research/`를 추가했다.
- `source-registry.json`에 source type taxonomy와 reusable reference source catalog를 만들었다.
- `coding-research-profile.json`에 코딩 조사 기본 source coverage profile을 만들었다.
- `coding-research-agent` 입력에 `reference_config_paths`를 추가했다.
- readiness check에서 최소 하나의 `agent-platform/configs/research/*.json` 설정 경로를 요구하도록 강화했다.
- planning template, tests, docs, prompts, workflows, templates, persistent instructions, source collection policy, research note, plan history를 갱신했다.

## References Checked

- Zotero Bibliographic Data Formats: https://www.zotero.org/support/dev/data_formats
- Zotero Item Types and Fields: https://www.zotero.org/support/kb/item_types_and_fields
- Sourcemeta Registry Configuration: https://registry.sourcemeta.com/configuration/
- 기존 구현: `agent-platform/src/agent_platform/planning/coding_research.py`
- 기존 출처 수집 정책: `_docs/source-collection-policy.ko.md`
- 계획 기록: `_history/plans/2026/2026-05-31-coding-research-reference-configs.ko.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/coding-research-reference-config-grounding.json`
- 결과: `ready_to_publish`
- gaps: 없음

## 지식 베이스 검증

- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/coding-research-reference-config-knowledge.json`
- 결과: `ready_to_reference`
- gaps: 없음

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests` from `agent-platform/`: 30개 테스트 통과
- `python3 -m unittest discover -s _tools/source-collector/tests`: 4개 테스트 통과
- `python3 -m unittest discover -s tests` from `_templates/python-agent-project/`: 1개 테스트 통과
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research configs/planning/coding-research-template.json`: `ready_to_implement`, `reference_config_paths_count=2`
- `PYTHONPATH=src python3 -m agent_platform.cli complete-coding-research /private/tmp/coding-research-reference-config-input.json`: `ready_to_implement`
- `python3 -m json.tool agent-platform/configs/research/source-registry.json`: valid JSON
- `python3 -m json.tool agent-platform/configs/research/coding-research-profile.json`: valid JSON
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/coding-research-reference-config-evaluation.json`: `ready_to_close`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: 통과
- `python3 _tools/task-board/src/task_board.py --check`: 통과
- `git diff --check`: 통과

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 코딩 조사가 어떤 출처 기준 설정을 참고했는지 config 파일과 `reference_config_paths`로 추적하게 했다.

## Gaps

- 없음

## Improvements

- 이후 `agent-platform/configs/research/*.json` 전용 schema validator를 만들 수 있다.

## Follow-Up Actions

- 현재 blocking follow-up은 없다.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-coding-research-reference-configs.ko.md`
- Created: 2026-05-31
