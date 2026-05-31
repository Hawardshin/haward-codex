# 작업 평가 보고서: 웹 우선 작업 정책

## 초기 지시

- "앞으로 내가 하는 모든 지시는 다 웹 검색을 먼저 하고 하는거야."

## 결과 요약

- 모든 새 사용자 지시를 웹 검색으로 시작하는 정책을 한국어/영어 문서로 추가했다.
- web-first intake 프롬프트와 워크플로를 `_ops/`에 추가했다.
- 웹 검색 근거와 한계를 `_research/topics/agent-planning/`에 한국어/영어로 기록했다.
- `AGENTS.md`, `README.md`, persistent instructions, workspace rules, platform operating model, start workflow, prompt router, 검색 기반 계획 정책, 할루시네이션 방지 정책, 철학 문서를 갱신했다.
- 기존 할루시네이션 리서치 노트의 risk-based 검색 인사이트는 새 web-first 정책 아래에서 검색 강도 조절 규칙으로만 유지한다고 명시했다.

## References Checked

- OpenAI Academy Web search: https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/
- OpenAI Knowledge Retrieval blueprint: https://openai.com/solutions/blueprints/knowledge-retrieval/
- RAG NeurIPS paper: https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html
- Anthropic Reduce hallucinations: https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- 계획 기록: `_history/plans/2026/2026-05-31-web-first-work-policy.ko.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/web-first-grounding.json`
- 결과: `ready_to_publish`
- gaps: 없음

## 검증

- 웹 검색을 먼저 수행한 뒤 로컬 파일을 수정했다.
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/web-first-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/web-first-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/web-first-evaluation.json`: `ready_to_close`
- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23개 테스트 통과
- `python3 _tools/workspace-index/src/workspace_index.py`: 맵 갱신
- `python3 _tools/task-board/src/task_board.py`: 조정 보드 갱신

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## Alignment

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 모든 새 지시에 웹 검색을 먼저 수행하는 규칙을 영속 정책, 프롬프트, 워크플로, 시작 절차에 반영했다.

## Gaps

- 없음

## Improvements

- 웹 검색 품질 평가가 반복되면 `agent-platform`에 source-quality evaluator를 추가할 수 있다.

## Follow-Up Actions

- 현재 blocking follow-up은 없다.

## Rework Result

- 재작업 필요 없음

## Report File

- Path: `_history/evaluations/2026/2026-05-31-web-first-work-policy.ko.md`
- Created: 2026-05-31
