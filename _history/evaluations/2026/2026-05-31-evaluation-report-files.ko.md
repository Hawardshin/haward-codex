# 작업 평가 보고서: 평가 파일 저장 규칙

## 초기 지시

- 모든 작업이 끝나면 작업에 대한 평가도 파일로 만들어야 한다.

## 작업 요약

- 평가 보고서 저장 위치를 `_history/evaluations/YYYY/`로 정했다.
- 종료 워크플로와 프롬프트에 평가 보고서 파일 생성 단계를 추가했다.
- 지속 지시, README, workspace rules, 히스토리 문서에 평가 파일 저장 규칙을 반영했다.
- 평가 보고서 템플릿에 보고서 파일 경로와 생성 여부를 남기도록 항목을 추가했다.
- 현재 작업에 대한 평가 보고서를 한국어/영어 파일로 생성했다.

## 확인한 레퍼런스

- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/workflows/30-close-and-index.md`
- `_ops/prompts/60-close-work.md`
- `_ops/prompts/70-evaluate-work.md`
- `_templates/work-evaluation/report.md`
- `_history/README.md`

## 변경 파일

- `AGENTS.md`
- `README.md`
- `_docs/persistent-instructions.md`
- `_docs/persistent-instructions.ko.md`
- `_docs/persistent-instructions.en.md`
- `_docs/workspace-rules.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/workflows/30-close-and-index.md`
- `_ops/prompts/60-close-work.md`
- `_ops/prompts/70-evaluate-work.md`
- `_templates/work-evaluation/report.md`
- `_history/evaluations/README.ko.md`
- `_history/evaluations/README.en.md`
- `_history/evaluations/2026/2026-05-31-evaluation-report-files.ko.md`
- `_history/evaluations/2026/2026-05-31-evaluation-report-files.en.md`
- `_history/README.md`
- `_history/2026/2026-05-31.md`

## 검증

- `python3 -m unittest discover -s tests` in `agent-platform`: 11 tests OK
- `python3 -m unittest discover -s tests` in `_templates/python-agent-project`: 1 test OK
- `python3 _tools/workspace-index/src/workspace_index.py`: maps updated
- `git diff --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/evaluation-report-files.json`: `ready_to_close`

## 평가 결과

- Status: `ready_to_close`
- Requires rework: `false`
- Gaps: none
- Improvements: none
- Follow-up actions: none

## 재작업 결과

- 재작업 필요 없음.

## 보고서 파일

- 한국어: `_history/evaluations/2026/2026-05-31-evaluation-report-files.ko.md`
- 영어: `_history/evaluations/2026/2026-05-31-evaluation-report-files.en.md`
