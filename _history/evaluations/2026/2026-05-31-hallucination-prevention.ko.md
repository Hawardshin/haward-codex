# 작업 평가 보고서: 할루시네이션 방지 구조

## 초기 지시

- "할루시네이션이 안 나도록 하는 방법도 역시 다해줘."

## 결과 요약

- 할루시네이션 방지 정책을 한국어/영어 문서로 추가했다.
- 재사용 가능한 리서치 노트를 `_research/topics/agent-reliability/`에 저장했다.
- 최종 산출물의 사실 주장을 검증하는 프롬프트와 워크플로를 추가했다.
- `agent-platform`에 Python 기반 `hallucination-guard-agent`와 `check-grounding` CLI를 추가했다.
- `work-evaluator-agent` 입력에 `grounding_checks`를 추가해 평가 보고서에서 사실 근거 검증을 추적하도록 했다.
- 지속 지시, 작업 규칙, 운영 철학, 운영 인덱스, 맵을 갱신했다.

## 확인한 레퍼런스

- OpenAI ChatGPT and fake citations: https://help.openai.com/en/articles/8313428-chatgpt-and-fake-citations
- OpenAI Structured Outputs: https://platform.openai.com/docs/guides/structured-outputs
- OpenAI File Search docs: https://developers.openai.com/api/docs/guides/tools-file-search
- OpenAI Web Search docs: https://developers.openai.com/api/docs/guides/tools-web-search
- Anthropic Reduce hallucinations: https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- RAG paper: https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html
- Chain-of-Verification: https://arxiv.org/abs/2309.11495
- SelfCheckGPT: https://aclanthology.org/2023.emnlp-main.557/
- Self-RAG: https://arxiv.org/abs/2310.11511
- 계획 기록: `_history/plans/2026/2026-05-31-hallucination-prevention.ko.md`

## Grounding Checks

- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding /private/tmp/hallucination-prevention-grounding.json`
- 결과: `ready_to_publish`
- claim 수: 3
- evidence 수: 5
- gaps: 없음

## 검증

- `PYTHONPATH=src python3 -m unittest discover -s tests`: 23개 테스트 통과
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/hallucination-prevention-knowledge-validation.json`: `ready_to_reference`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/hallucination-prevention-evaluation.json`: `ready_to_close`
- `python3 _tools/workspace-index/src/workspace_index.py`: 맵 갱신
- `python3 _tools/task-board/src/task_board.py`: 조정 보드 갱신

일부 Python 명령에서 Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 출력됐지만, 명령 결과 자체는 성공했다.

## 정렬 평가

- Status: `ready_to_close`
- Requires rework: `false`
- 초기 지시 반영: 할루시네이션 방지를 공통 운영 규칙, 프롬프트, 워크플로, Python 에이전트, 평가 입력까지 반영했다.

## Gaps

- 없음

## Improvements

- 향후 고위험 도메인 프로젝트는 더 엄격한 source policy와 domain-specific evaluation set을 추가할 수 있다.

## Follow-Up Actions

- 현재 작업의 blocking follow-up은 없다.

## Rework Result

- 첫 테스트에서 caveated uncertainty 테스트의 claim type이 부적절해 실패했다.
- 해당 테스트를 `inference` claim으로 조정한 뒤 전체 테스트가 통과했다.

## Report File

- Path: `_history/evaluations/2026/2026-05-31-hallucination-prevention.ko.md`
- Created: 2026-05-31
