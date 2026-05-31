# 웹 우선 작업 정책 계획

## 초기 요청

- "앞으로 내가 하는 모든 지시는 다 웹 검색을 먼저 하고 하는거야."

## 계획 목적

- 모든 새 사용자 지시에 웹 검색을 먼저 수행하는 규칙을 영속 운영 정책으로 반영한다.
- 기존 risk-based 검색 정책과 충돌하지 않도록, web-first intake를 항상 수행하고 이후 검색 강도는 작업 위험도에 따라 조절한다.

## 검색 질문

- 모든 작업을 web-first로 시작하는 운영 규칙의 근거는 무엇인가?
- 웹 검색을 항상 수행할 때 한계와 보완 절차는 무엇인가?
- 기존 검색 기반 계획, 할루시네이션 방지, 평가 루프와 어떻게 연결해야 하는가?

## 검색 채널

- 웹 검색
- 공식 문서 확인
- 논문 확인
- 저장소 내부 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| OpenAI Academy: Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | 최신/상세 정보, 출처 링크 검토 필요성 |
| OpenAI Knowledge Retrieval blueprint | https://openai.com/solutions/blueprints/knowledge-retrieval/ | grounded answers, citations, evals 조합 |
| RAG NeurIPS paper | https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html | 검색 지식 결합 근거 |
| Anthropic Reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | 출처/인용 검증, 불확실성, 중요 정보 검증 |
| 기존 운영 문서 | `AGENTS.md`, `_docs/search-insight-planning-policy.ko.md`, `_docs/hallucination-prevention-policy.ko.md`, `_ops/workflows/00-start-here.md` | 기존 검색/검증 구조 |

## 지식 베이스 검증

- 내부 운영 문서를 근거로 사용하므로 `knowledge-skeptic-agent`로 검증한다.
- 검증 대상: `AGENTS.md`, `README.md`, `_docs/search-insight-planning-policy.ko.md`, `_docs/hallucination-prevention-policy.ko.md`, `_ops/workflows/00-start-here.md`
- 기대 결과: `ready_to_reference`

## 도출한 인사이트

- 사용자의 새 지시는 기존의 "필요할 때 검색"보다 우선하는 강한 운영 선호다.
- 모든 작업에 웹 검색을 먼저 하되, 단순 로컬 작업은 가벼운 검색 후 로컬 검증 중심으로 진행한다.
- 검색 결과가 무관하거나 실패하면 그 사실을 기록하고 로컬 검증을 강화한다.
- 검색 결과가 유용하면 `_research/`에 저장하고 평가 보고서의 `references_checked`에 반영한다.

## 계획 단계

1. `_docs/web-first-work-policy.ko.md`와 `.en.md`를 추가한다.
2. `_ops/prompts/05-web-first-intake.md`와 `_ops/workflows/05-web-first-intake.md`를 추가한다.
3. `AGENTS.md`, `README.md`, persistent instructions, workspace rules, platform operating model, start workflow, prompt router를 갱신한다.
4. 검색 기반 계획 정책과 할루시네이션 방지 정책에 web-first 규칙을 반영한다.
5. 관련 리서치 노트를 `_research/topics/agent-planning/`에 저장한다.
6. 기존 할루시네이션 리서치 노트의 risk-based 검색 인사이트를 새 web-first 정책과 충돌하지 않도록 후속 정책 변경으로 표시한다.
7. 맵, 히스토리, 평가 보고서를 갱신한다.
8. 검증 후 커밋하고 push한다.

## 제외하거나 보류한 선택지

- 별도 Python agent 구현은 보류한다. 현재는 운영 정책과 워크플로가 먼저 필요하다.
- 민감 정보를 그대로 웹 검색에 넣는 방식은 금지한다.

## 위험과 불확실성

- 모든 작업에 웹 검색을 강제하면 속도가 느려질 수 있다.
- 웹 검색 결과가 무관한 작업에서는 로컬 파일, 테스트, 명령 결과가 더 강한 근거다.
- 네트워크 실패 시 작업이 완전히 중단되지 않도록 실패 기록과 로컬 검증 강화가 필요하다.

## 검증 방법

- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `PYTHONPATH=src python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input.json>`
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | web-first intake workflow를 별도 파일로 추가하기로 결정 | 모든 작업의 첫 단계를 명확히 분리하기 위함 |
