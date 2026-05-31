# Perplexity식 핵심 조사 에이전트 구조

## 목적

조사 에이전트를 플랫폼의 핵심 능력으로 두기 위해 Perplexity식 answer engine, RAG, citation 검증 레퍼런스를 정리한다. 목표는 검색 결과 요약이 아니라 검색, 출처 순위화, 증거 추출, 종합, citation grounding, skeptic review를 거치는 조사 파이프라인이다.

## 확인한 출처

| 출처 | 유형 | 확인일 | 재사용 포인트 |
| --- | --- | --- | --- |
| [Perplexity Sonar API](https://docs.perplexity.ai/docs/sonar/quickstart) | 공식 문서 | 2026-05-31 | 웹 근거 응답, 검색 옵션, 스트리밍, API 호환 구조 |
| [Perplexity API Platform Help](https://www.perplexity.ai/help-center/en/articles/10354842-what-is-the-perplexity-api-platform) | 공식 문서 | 2026-05-31 | 대규모 retrieval, ranked structured results, cited answer, source customization |
| [Perplexity Agent API Presets](https://docs.perplexity.ai/docs/agent-api/presets) | 공식 문서 | 2026-05-31 | 직접 답변, 인라인 citation, 검색 선행, claim별 citation 규칙 |
| [Self-RAG](https://arxiv.org/abs/2310.11511) | 논문 | 2026-05-31 | 필요할 때 검색하고 생성 결과를 self-reflection으로 비판하는 구조 |
| [MA-RAG](https://arxiv.org/abs/2505.20096) | 논문 | 2026-05-31 | Planner, Extractor, QA 같은 역할 분리로 모호한 질문과 multi-hop 조사 처리 |
| [Provenance RAG Fact Checker](https://arxiv.org/abs/2411.01022) | 논문 | 2026-05-31 | RAG 출력의 claim을 context chunk에 되짚어 factuality를 검사하는 구조 |
| [RAGTruth](https://arxiv.org/abs/2401.00396) | 논문/벤치마크 | 2026-05-31 | RAG에서도 unsupported 또는 contradictory claim이 발생할 수 있다는 평가 기준 |
| [The Atlantic: Generative AI Can't Cite Its Sources](https://www.theatlantic.com/technology/archive/2024/06/chatgpt-citations-rag/678796/) | 분석 기사 | 2026-05-31 | citation이 있어도 링크나 출처가 주장을 정확히 지지하지 않을 수 있다는 위험 |

## 도출한 인사이트

- Perplexity류 answer engine의 핵심은 "검색 결과 목록"이 아니라 검색 기반 답변, 출처 표시, source customization, 원문 확인 가능성이다.
- 조사 에이전트는 웹 검색을 먼저 하고, 추가 채널로 저장소, 공식 문서, 논문, 오픈소스/코드, 커뮤니티 신호를 붙여야 한다.
- 검색 결과는 바로 답이 아니다. 질문 이해, 검색 확장, 출처 순위화, 증거 추출, 종합, citation grounding, skeptic review 단계를 거쳐야 한다.
- citation은 증명 자체가 아니라 검증 핸들이다. 출처가 claim을 실제로 뒷받침하는지 역검증해야 한다.
- RAG와 answer engine도 hallucination, unsupported claim, citation mismatch가 생길 수 있으므로 `hallucination-guard-agent`와 `knowledge-skeptic-agent`를 연결해야 한다.
- 복잡한 조사에서는 역할 분리가 유용하다. Planner는 질문과 검색 계획, Extractor는 근거 추출, Synthesizer는 종합, Skeptic은 contradiction과 citation gap을 본다.

## 플랫폼 반영

- 새 설정 파일: `agent-platform/configs/research/research-agent-profile.json`
- 일반 조사 준비 입력에 추가할 필드:
  - `research_profile_paths`
  - `answer_engine_stages`
  - `citation_requirements`
- 필수 stage:
  - `query_understanding`
  - `search_retrieval`
  - `source_ranking`
  - `evidence_extraction`
  - `synthesis`
  - `citation_grounding`
  - `skeptic_review`
- memory bootstrap hot context에 research profile을 추가해 다음 세션이 조사 에이전트 규칙을 잊지 않게 한다.

## 남은 주의점

- Perplexity의 내부 ranking 알고리즘은 공개된 API/문서만으로 완전히 알 수 없다. 따라서 구현은 공개적으로 확인 가능한 패턴만 차용한다.
- 인라인 citation 포맷은 제품마다 다르다. 이 저장소에서는 실제 답변 형식보다 claim-to-source grounding을 더 중요한 규칙으로 둔다.
- citation 검증은 완전 자동화보다 claim 추출, 출처 역검증, `hallucination-guard-agent` 평가를 조합하는 쪽이 현실적이다.
