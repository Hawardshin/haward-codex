# Perplexity식 핵심 조사 에이전트 평가

## 초기 지시

조사 에이전트는 상당히 핵심이며 Perplexity 등 다양한 구조를 참고하라는 지시.

## 결과 요약

- `research-insight-planner-agent`를 Perplexity식 answer engine에 가까운 핵심 조사 에이전트로 강화했다.
- `agent-platform/configs/research/research-agent-profile.json`을 추가해 검색, 출처 순위화, 증거 추출, 종합, citation grounding, skeptic review 규칙을 self-documenting config로 만들었다.
- planner readiness checker에 `research_profile_paths`, `answer_engine_stages`, `citation_requirements`를 추가하고 테스트를 보강했다.
- memory bootstrap hot context에 `research_agent_profile`을 추가해 다음 세션에서도 핵심 조사 프로필을 로드하게 했다.
- 한국어/영어 리서치 노트, 계획 히스토리, 정책, 프롬프트, 워크플로, 운영 문서를 갱신했다.

## 확인한 레퍼런스

- [Perplexity Sonar API](https://docs.perplexity.ai/docs/sonar/quickstart)
- [Perplexity API Platform Help](https://www.perplexity.ai/help-center/en/articles/10354842-what-is-the-perplexity-api-platform)
- [Perplexity Agent API Presets](https://docs.perplexity.ai/docs/agent-api/presets)
- [Self-RAG](https://arxiv.org/abs/2310.11511)
- [MA-RAG](https://arxiv.org/abs/2505.20096)
- [Provenance RAG Fact Checker](https://arxiv.org/abs/2411.01022)
- [RAGTruth](https://arxiv.org/abs/2401.00396)
- [The Atlantic: Generative AI Can't Cite Its Sources](https://www.theatlantic.com/technology/archive/2024/06/chatgpt-citations-rag/678796/)
- `AGENTS.md`
- `_docs/policies/search-insight-planning-policy.ko.md`
- `agent-platform/configs/research/source-registry.json`
- `agent-platform/configs/memory/bootstrap-manifest.json`

## 검증

- `agent-platform` unit tests: 43 tests OK
- `plan-from-research`: `ready_to_plan`, gaps 없음
- `check-config-contract`: `self_documenting`, gaps 없음
- `check-memory-bootstrap`: `ready_to_bootstrap`, hot anchor 13개 및 `research_agent_profile` 포함
- JSON syntax checks: 통과
- `_tools/source-collector` tests: 4 tests OK
- `_templates/python-agent-project` tests: 1 test OK
- workspace index check: clean
- task board check: clean
- `git diff --check`: clean
- `knowledge-skeptic-agent`: `ready_to_reference`
- `hallucination-guard-agent`: `ready_to_publish`
- `work-evaluator-agent`: `ready_to_close`, gaps 없음

## 평가 결과

초기 지시와 결과가 일치한다. 조사 에이전트가 핵심이라는 요구는 hot memory anchor와 지속 지시로 반영되었고, Perplexity식 구조는 공개 문서와 RAG/citation 검증 레퍼런스를 바탕으로 설정, 코드, 문서, 히스토리에 연결되었다.

## 개선 아이디어

반복적인 citation 감사가 많아지면 claim-to-source support를 자동 검사하는 전용 citation verification tool을 만들 수 있다. 현재는 planning field, research profile, hallucination guard 조합으로 시작한다.
