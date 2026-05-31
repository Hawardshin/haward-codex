# 작업 평가 - Search Insight Planning

## 초기 지시

> AI 가 잘하는게 단순 확률적인데 이런걸 나는 웹 검색과 다양한 검색을 통해 필요한 인사이트를 도출하고 계획을 짜는거야.

## 작업 요약

- `research-insight-planner-agent`를 선언형 에이전트로 추가했다.
- 검색 질문, 검색 채널, 출처, 인사이트, 계획 단계, 검증 단계를 점검하는 Python 헬퍼와 `plan-from-research` CLI를 추가했다.
- 검색 기반 계획 입력 템플릿과 단위 테스트를 추가했다.
- 검색 기반 인사이트 계획 정책, 프롬프트, 워크플로를 추가했다.
- RAG, ReAct, IRCoT, OpenAI 공식 검색 도구 문서를 조사하고 `_research/`에 한국어/영어 노트로 저장했다.
- 지속 지시, 작업 규칙, 운영 인덱스, 시작 워크플로, 리서치 템플릿과 캡처 정책에 검색→인사이트→계획 규칙을 반영했다.

## 먼저 확인한 레퍼런스

- ReAct: https://arxiv.org/abs/2210.03629
- RAG: https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html
- IRCoT: https://arxiv.org/abs/2212.10509
- OpenAI Web Search docs: https://developers.openai.com/api/docs/guides/tools-web-search
- OpenAI File Search docs: https://developers.openai.com/api/docs/guides/tools-file-search
- `AGENTS.md`
- `README.md`
- `_docs/workspace-rules.md`
- `_ops/workflows/40-evaluate-and-rework.md`
- `_ops/workflows/60-capture-research.md`

## 지식 베이스 검증

내부 운영 문서를 근거로 사용하기 전에 `knowledge-skeptic-agent`로 검증했다.

- 상태: `ready_to_reference`
- 참조한 내부 출처 수: 6
- 반대 신호: 없음
- 결론: 이번 구조 변경의 운영 근거로 사용할 수 있다.

## 검색 기반 계획 검증

`research-insight-planner-agent`로 이번 작업 계획을 검증했다.

- 상태: `ready_to_plan`
- 검색 질문 수: 2
- 검색 채널 수: 4
- 확인한 출처 수: 9
- 인사이트 수: 3
- 계획 단계 수: 3
- 검증 단계 수: 4

## 검증

- `python3 _tools/workspace-index/src/workspace_index.py --check` 통과
- `python3 _tools/task-board/src/task_board.py --check` 통과
- `PYTHONPATH=src python3 -m unittest discover -s tests` (`agent-platform`, 18 tests) 통과
- `python3 -m unittest discover -s tests` (`_templates/python-agent-project`, 1 test) 통과
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research configs/planning/research-insight-plan-template.json` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge /private/tmp/search-insight-knowledge-validation.json` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli plan-from-research /private/tmp/search-insight-plan.json` 통과
- `git diff --check` 통과
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work /private/tmp/search-insight-planning-evaluation.json` 결과: `ready_to_close`

Homebrew shellenv의 `/bin/ps: Operation not permitted` 경고가 일부 Python 명령에서 출력되었지만 테스트와 CLI 결과에는 영향이 없었다.

## 평가 결과

- 상태: `ready_to_close`
- 재작업 필요: 아니오
- 확인된 차이: 없음
- 개선 아이디어: 향후 플랫폼 러너가 생기면 실제 검색 런타임과 출처 신뢰도 점수화를 연결한다.

## 결론

초기 지시대로 AI 내부 추정에만 기대지 않고, 웹 검색과 다양한 검색 채널을 통해 근거를 수집하고 인사이트를 도출한 뒤 계획하는 운영 구조를 저장소에 반영했다.
