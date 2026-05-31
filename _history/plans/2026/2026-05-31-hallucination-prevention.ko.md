# 할루시네이션 방지 구조 추가 계획

## 초기 요청

- "할루시네이션이 안 나도록 하는 방법도 역시 다해줘."

## 계획 목적

- 저장소 운영 규칙과 에이전트 플랫폼에 할루시네이션 방지 체계를 추가한다.
- 단일 프롬프트가 아니라 근거 수집, 주장 검증, 불확실성 표시, 평가 루프를 지속 규칙으로 만든다.

## 검색 질문

- 에이전트 산출물의 할루시네이션을 줄이는 검증 가능한 방법은 무엇인가?
- RAG, 구조화 출력, 자기검증, citation 검증은 각각 어떤 역할과 한계가 있는가?
- 이 저장소 구조에서는 어떤 공통 정책, 프롬프트, Python 에이전트가 필요한가?

## 검색 채널

- 웹 검색
- 공식 문서 확인
- 논문/학술 자료 확인
- 저장소 내부 문서 및 에이전트 코드 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| OpenAI fake citations help | https://help.openai.com/en/articles/8313428-chatgpt-and-fake-citations | citation 검증 필요성 |
| OpenAI Structured Outputs | https://platform.openai.com/docs/guides/structured-outputs | schema 기반 출력 안정화 |
| OpenAI File Search/Web Search docs | https://developers.openai.com/api/docs/guides/tools-file-search, https://developers.openai.com/api/docs/guides/tools-web-search | 검색 기반 grounding 참고 |
| Anthropic reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | 모름 인정, 출처 기반 답변, 검증 패턴 |
| RAG paper | https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html | 검색 보강 근거 |
| Chain-of-Verification | https://arxiv.org/abs/2309.11495 | 초안 후 독립 검증 루프 |
| SelfCheckGPT | https://aclanthology.org/2023.emnlp-main.557/ | 자기검사 기반 오류 탐지 |
| Self-RAG | https://arxiv.org/abs/2310.11511 | 검색/생성/비평 결합 |
| 기존 운영 문서 | `AGENTS.md`, `_docs/workspace-rules.md`, `_docs/search-insight-planning-policy.ko.md`, `_docs/knowledge-base-validation-policy.ko.md` | 기존 검색/검증/평가 정책 |

## 지식 베이스 검증

- 내부 운영 문서를 근거로 사용하므로 `knowledge-skeptic-agent`로 검증한다.
- 검증 대상: `AGENTS.md`, `_docs/workspace-rules.md`, `_docs/search-insight-planning-policy.ko.md`, `_docs/knowledge-base-validation-policy.ko.md`, `agent-platform/docs/knowledge-skeptic-agent.ko.md`, `agent-platform/docs/work-evaluator-agent.md`
- 기대 결과: `ready_to_reference`

## 도출한 인사이트

- 할루시네이션은 "검색만 하라"로 해결되지 않는다. claim-level grounding과 평가 기록이 필요하다.
- 저장소 작업에서는 `git status`, 파일 확인, 테스트 결과가 가장 강한 근거가 될 수 있다.
- 외부 사실과 최신 정보는 확인 날짜가 붙은 공식 문서/논문/웹 출처를 근거로 삼아야 한다.
- 최종 평가 보고서가 grounding check 결과를 포함해야 향후 작업자가 검증 여부를 추적할 수 있다.

## 계획 단계

1. 리서치 노트를 `_research/topics/agent-reliability/`에 한국어/영어로 저장한다.
2. `_docs/hallucination-prevention-policy.ko.md`와 `.en.md`를 추가한다.
3. `_ops/prompts/96-ground-output.md`와 `_ops/workflows/70-hallucination-prevention.md`를 추가한다.
4. `agent-platform`에 `hallucination-guard-agent` 설정, 입력 템플릿, Python evaluator, CLI 명령을 추가한다.
5. `work-evaluator-agent` 입력에 `grounding_checks`를 추가한다.
6. README, AGENTS, persistent instructions, 운영 철학, 운영 인덱스, 맵을 갱신한다.
7. 테스트와 구조 검증을 실행한다.
8. `hallucination-guard-agent`, `knowledge-skeptic-agent`, `work-evaluator-agent`로 이번 작업을 검증하고 평가 파일을 저장한다.
9. 커밋하고 즉시 push한다.

## 제외하거나 보류한 선택지

- 벡터 DB나 대형 RAG 프레임워크 도입은 보류한다. 현재 단계에서는 정책과 deterministic claim checker가 먼저 필요하다.
- 모든 답변에 무조건 웹 검색을 강제하지 않는다. 저장소 상태나 코드 동작은 로컬 도구 검증이 더 적합할 수 있다.

## 위험과 불확실성

- 어떤 시스템도 할루시네이션을 0으로 보장할 수 없다. 목표는 unsupported claim을 차단하고 오류 가능성을 낮추는 것이다.
- claim 추출 자체는 사람이거나 LLM이 수행해야 하므로 누락 가능성이 있다. 고위험 작업에서는 claim 추출도 별도 리뷰해야 한다.

## 검증 방법

- `python3 -m unittest discover -s tests`
- `PYTHONPATH=src python3 -m agent_platform.cli check-grounding <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli validate-knowledge <input.json>`
- `PYTHONPATH=src python3 -m agent_platform.cli evaluate-work <input.json>`
- `python3 _tools/workspace-index/src/workspace_index.py --check`
- `python3 _tools/task-board/src/task_board.py --check`
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | deterministic `hallucination-guard-agent` 추가 결정 | 반복 가능한 품질 게이트가 필요함 |
| 2026-05-31 | `work-evaluator-agent`에 `grounding_checks` 추가 | 최종 평가에서 사실 근거 검증을 추적하기 위함 |
