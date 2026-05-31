# 작업 평가 보고서: 프롬프트별 웹 검색 기록

## 초기 지시

항상 웹 검색 무조건 프롬프트마다 하도록 그런 사고 과정은 당연히 다 텍스트에 넣어야해.

## 작업 요약

- `_ops/prompts/README.ko.md`와 `.en.md`에 모든 재사용 프롬프트의 공통 웹 검색 계약을 추가했다.
- 모든 `_ops/prompts/*.md`에 공통 계약 링크와 웹 검색 기록 규칙을 넣었다.
- `_history/web-searches/`와 `_templates/web-search-record/`를 만들어 프롬프트/작업별 검색어, 출처, 제외한 약한 출처, 계획 반영 인사이트, 공개 판단 요약을 남기도록 했다.
- `work-evaluator-agent`에 `web_search_record_targets`를 추가하고, 누락 시 blocking gap으로 평가하도록 했다.
- memory bootstrap manifest에 웹 검색 기록 정책 anchor를 추가했다.
- 리서치 노트, 계획 기록, 작업 요약, 운영 문서, coordination board를 갱신했다.

## 확인한 레퍼런스

- [OpenAI Web search docs](https://platform.openai.com/docs/guides/tools-web-search)
- [Anthropic Search results docs](https://docs.anthropic.com/en/docs/build-with-claude/search-results)
- [Firebase AI Logic: Grounding with Google Search](https://firebase.google.com/docs/ai-logic/grounding-google-search)
- `_docs/web-first-work-policy.ko.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `agent-platform/docs/work-evaluator-agent.md`

## 웹 검색 기록

- `_history/web-searches/2026/2026-05-31-prompt-web-search-record.ko.md`
- `_history/web-searches/2026/2026-05-31-prompt-web-search-record.en.md`

## 변경 파일

- `_ops/prompts/README.ko.md`, `_ops/prompts/README.en.md`
- `_history/web-searches/README.ko.md`, `_history/web-searches/README.en.md`
- `_templates/web-search-record/web-search-record.ko.md`, `.en.md`
- `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- `agent-platform/tests/test_work_evaluator.py`
- `agent-platform/configs/memory/bootstrap-manifest.json`
- 관련 운영/히스토리/리서치/맵/coordination 문서

## 검증 결과

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 49 tests OK
- `python3 -m json.tool configs/evaluation/work-evaluation-template.json`: OK
- `python3 -m json.tool configs/memory/bootstrap-manifest.json`: OK
- `python3 -m json.tool _ops/coordination/status.json`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli check-memory-bootstrap configs/memory/bootstrap-manifest.json`: `ready_to_bootstrap`
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...`: `self_documenting`
- `python3 _tools/workspace-index/src/workspace_index.py --check`: OK
- `python3 _tools/task-board/src/task_board.py --check`: OK
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/prompt-web-search-record-knowledge.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/prompt-web-search-record-grounding.json`: `ready_to_publish`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/prompt-web-search-record-eval.json`: `ready_to_close`

## 평가 상태

- Status: `ready_to_close`
- Requires rework: `false`

## Gap

- 없음.

## 개선 아이디어

- future runtime에서 검색 도구 metadata를 읽어 웹 검색 기록 파일 생성을 자동화할 수 있다.

## 재작업 결과

- 재작업 필요 없음.

## 연결

- 계획 기록: `_history/plans/2026/2026-05-31-prompt-web-search-record.ko.md`
- 작업 요약: `_history/work-summaries/2026/2026-05-31.ko.md`
- 리서치 노트: `_research/topics/agent-planning/2026-05-31-prompt-web-search-records.ko.md`
