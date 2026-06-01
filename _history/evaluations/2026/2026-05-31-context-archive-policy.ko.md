# 작업 평가 보고서: 컨텍스트 아카이브 정책

## 초기 지시

너 스스로 컨텍스트가 많이 찼다고 생각하면 요약하고 아카이빙을 잘해두고 문서를 기반으로 동작하게 잘 구조를 짜줘.

## 작업 요약

- `_history/context-archives/`를 긴 컨텍스트 재개 패킷 저장소로 추가했다.
- `_templates/context-archive/`에 한국어/영어 재개 패킷 템플릿을 추가했다.
- `_docs/policies/context-archive-policy.ko.md`와 `.en.md`에 컨텍스트 포화 신호, 표준 절차, 저장하지 않을 내용을 정리했다.
- `_ops/workflows/45-context-archive.md`를 추가하고 `_ops/prompts/50-compress-context.md`를 강화했다.
- `work-evaluator-agent`에 `context_archiving_occurred`와 `context_archive_targets`를 추가했다.
- memory bootstrap manifest에 context archive policy를 warm required anchor로 추가했다.
- 이번 작업 자체의 웹 검색 기록, 리서치 노트, 계획 기록, context archive packet을 저장했다.

## 확인한 레퍼런스

- [ReadAgent](https://huggingface.co/papers/2402.09727)
- [Evaluating Very Long-Term Conversational Memory of LLM Agents](https://arxiv.org/abs/2402.17753)
- [Active Context Compression](https://arxiv.org/abs/2601.07190)
- [Microsoft Agent Framework Memory and Persistence](https://learn.microsoft.com/en-us/agent-framework/get-started/memory)
- `_docs/operating-models/context-management.md`
- `_docs/policies/memory-bootstrap-policy.ko.md`

## 웹 검색 기록

- `_history/web-searches/2026/2026-05-31-context-archive-policy.ko.md`
- `_history/web-searches/2026/2026-05-31-context-archive-policy.en.md`

## 컨텍스트 아카이브

- `_history/context-archives/2026/2026-05-31-context-archive-policy.ko.md`
- `_history/context-archives/2026/2026-05-31-context-archive-policy.en.md`

## 변경 파일

- `_docs/policies/context-archive-policy.ko.md`, `_docs/policies/context-archive-policy.en.md`
- `_history/context-archives/README.ko.md`, `_history/context-archives/README.en.md`
- `_templates/context-archive/context-archive.ko.md`, `_templates/context-archive/context-archive.en.md`
- `_ops/workflows/45-context-archive.md`
- `_ops/prompts/50-compress-context.md`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `agent-platform/tests/test_work_evaluator.py`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## 검증 결과

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 51 tests OK
- `python3 -m json.tool configs/evaluation/work-evaluation-template.json`: OK
- `python3 -m json.tool configs/agents/work-evaluator-agent.json`: OK
- `python3 -m json.tool configs/memory/bootstrap-manifest.json`: OK
- `python3 -m json.tool _ops/coordination/status.json`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `git diff --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/context-archive-policy-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/context-archive-policy-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/context-archive-policy-eval.json`: `ready_to_close`

## 평가 상태

- Status: `ready_to_close`
- Requires rework: `false`

## Gap

- 없음.

## 개선 아이디어

- future Python helper가 최근 git history, maps, coordination status를 읽어 context archive packet 생성을 자동화할 수 있다.

## 재작업 결과

- 재작업 필요 없음.

## 연결

- 계획 기록: `_history/plans/2026/2026-05-31-context-archive-policy.ko.md`
- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 리서치 노트: `_research/topics/agent-memory/2026-05-31-context-archive-policy.ko.md`
