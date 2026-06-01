# 작업 평가 보고서: 리서치 캡처 정책

## 초기 지시

- 인터넷 조사를 해서 좋은 내용과 다음에도 참고할 수 있을 만한 내용은 문서화해서 계속 관리해야 한다.

## 작업 요약

- `_research/`를 재사용 가능한 인터넷 조사와 외부 레퍼런스를 관리하는 리서치 라이브러리로 추가했다.
- 한국어/영어 리서치 캡처 정책 문서를 추가했다.
- 한국어/영어 리서치 노트 템플릿을 추가했다.
- 리서치 캡처 프롬프트와 워크플로를 추가했다.
- 종료 워크플로와 평가 워크플로에 재사용 가능한 리서치 캡처 단계를 추가했다.
- 지속 지시, README, workspace rules, platform operating model, capability governance에 리서치 관리 규칙을 반영했다.

## 확인한 레퍼런스

- `_docs/instructions/persistent-instructions.ko.md`
- `_ops/workflows/30-close-and-index.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/prompts/60-close-work.md`
- `_templates/research-note/`

## 변경 파일

- `_research/README.ko.md`
- `_research/README.en.md`
- `_research/index.ko.md`
- `_research/index.en.md`
- `_docs/policies/research-capture-policy.ko.md`
- `_docs/policies/research-capture-policy.en.md`
- `_templates/research-note/research-note.ko.md`
- `_templates/research-note/research-note.en.md`
- `_ops/prompts/90-capture-research.md`
- `_ops/workflows/60-capture-research.md`
- `AGENTS.md`
- `README.md`
- `_docs/instructions/persistent-instructions.ko.md`
- `_docs/instructions/persistent-instructions.en.md`
- `_docs/instructions/workspace-rules.md`
- `_docs/operating-models/platform-operating-model.md`
- `_docs/governance/capability-governance.md`
- `_tools/workspace-index/src/workspace_index.py`

## 검증

- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `python3 -m unittest discover -s tests` in `agent-platform`: 11 tests OK
- `python3 -m unittest discover -s tests` in `_templates/python-agent-project`: 1 test OK
- `git diff --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/research-capture-policy-evaluation.json`: `ready_to_close`

## 평가 결과

- Status: `ready_to_close`
- Requires rework: `false`
- Gaps: none
- Improvements: none
- Follow-up actions: none

## 재작업 결과

- 재작업 필요 없음.

## 보고서 파일

- 한국어: `_history/evaluations/2026/2026-05-31-research-capture-policy.ko.md`
- 영어: `_history/evaluations/2026/2026-05-31-research-capture-policy.en.md`
