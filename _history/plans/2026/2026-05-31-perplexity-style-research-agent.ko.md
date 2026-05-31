# Perplexity식 핵심 조사 에이전트 계획

## 초기 지시

사용자는 조사 에이전트가 핵심이며 Perplexity 등 다양한 구조를 참고하라고 지시했다.

## 목표

`research-insight-planner-agent`를 단순 검색 요약기가 아니라 Perplexity식 answer engine에 가까운 핵심 조사 에이전트로 강화한다.

## 검색 질문

- Perplexity/Sonar는 어떤 구조로 검색 기반 답변과 citation을 제공하는가?
- RAG/answer engine에서 citation hallucination을 줄이려면 어떤 검증 단계가 필요한가?
- 현재 저장소의 일반 조사 에이전트에 어떤 설정, 필드, 문서 규칙을 추가해야 다음 세션이 잊지 않는가?

## 사용한 검색 채널

- 웹 검색
- Perplexity 공식 문서 확인
- arXiv/논문 검색
- 저장소 검색
- 기존 정책/히스토리 확인

## 확인한 주요 출처

- [Perplexity Sonar API](https://docs.perplexity.ai/docs/sonar/quickstart)
- [Perplexity API Platform Help](https://www.perplexity.ai/help-center/en/articles/10354842-what-is-the-perplexity-api-platform)
- [Perplexity Agent API Presets](https://docs.perplexity.ai/docs/agent-api/presets)
- [Self-RAG](https://arxiv.org/abs/2310.11511)
- [MA-RAG](https://arxiv.org/abs/2505.20096)
- [Provenance RAG Fact Checker](https://arxiv.org/abs/2411.01022)
- [RAGTruth](https://arxiv.org/abs/2401.00396)
- [The Atlantic: Generative AI Can't Cite Its Sources](https://www.theatlantic.com/technology/archive/2024/06/chatgpt-citations-rag/678796/)
- `agent-platform/src/agent_platform/planning/research_insight_planner.py`
- `agent-platform/configs/research/source-registry.json`
- `_docs/search-insight-planning-policy.ko.md`
- `AGENTS.md`

## 도출한 인사이트

- Perplexity식 구조에서 중요한 것은 "검색 후 답변"보다 검색, 출처 순위화, source customization, citation, 검증 가능성이다.
- RAG와 citation이 있어도 unsupported claim과 citation mismatch가 생길 수 있으므로 grounding과 skeptic review를 별도 단계로 두어야 한다.
- 일반 조사 에이전트도 코딩 조사처럼 어떤 profile/config를 사용했는지 기록해야 한다.
- 이 규칙은 다음 세션에서도 항상 필요하므로 memory bootstrap hot context에 추가해야 한다.

## 계획 단계

1. `research-agent-profile.json`을 만들어 answer engine stage, source ranking, citation grounding 규칙을 self-documenting config로 기록한다.
2. `research-insight-planner-agent` 입력과 readiness checker에 `research_profile_paths`, `answer_engine_stages`, `citation_requirements`를 추가한다.
3. 계획 템플릿, agent spec, docs, prompts, workflows, persistent rules, memory bootstrap manifest를 갱신한다.
4. Perplexity식 조사 구조 리서치 노트를 한국어/영어로 저장한다.
5. 검증 명령, 평가 보고서, 히스토리, 맵 갱신 후 커밋하고 push한다.

## 검증 계획

- `agent-platform` unit tests
- `plan-from-research` readiness check
- `check-config-contract` for memory/source/research/coding configs
- `check-memory-bootstrap`
- JSON syntax checks
- source collector/tool template tests
- workspace map and task board checks
- `hallucination-guard-agent`, `knowledge-skeptic-agent`, `work-evaluator-agent`

## 위험과 미확정

- Perplexity 내부 ranking 알고리즘은 공개 정보만으로 알 수 없으므로 공개 문서에서 확인되는 구조만 반영한다.
- citation 규칙은 완전 자동화보다 claim-level grounding 규칙과 evaluator 조합으로 시작한다.

## 변경 이력

- 2026-05-31: 초기 계획 작성. 조사 에이전트를 핵심 answer-engine profile로 승격하는 방향으로 확정.
