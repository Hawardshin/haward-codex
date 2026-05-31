# 검색 기반 인사이트 계획

## 조사 목적

- AI의 내부 확률적 추정만으로 계획하지 않고, 웹 검색과 여러 검색 채널을 통해 인사이트를 도출한 뒤 계획하는 운영 원칙의 근거를 정리한다.

## 접근일

- 2026-05-31

## 출처

| Source | URL | Notes |
| --- | --- | --- |
| ReAct: Synergizing Reasoning and Acting in Language Models | https://arxiv.org/abs/2210.03629 | 추론과 행동/검색을 반복적으로 결합하는 에이전트 패턴 |
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html | 모델 내부 기억과 외부 검색 메모리를 결합하는 RAG 근거 |
| Interleaving Retrieval with Chain-of-Thought Reasoning for Knowledge-Intensive Multi-Step Questions | https://arxiv.org/abs/2212.10509 | 멀티스텝 질문에서 단발 검색보다 검색/추론 반복이 필요하다는 근거 |
| OpenAI Web Search API docs | https://developers.openai.com/api/docs/guides/tools-web-search | 웹 검색 도구, 출처/도메인 필터/라이브 접근 같은 구현 참고 |
| OpenAI File Search API docs | https://developers.openai.com/api/docs/guides/tools-file-search | 파일/문서 검색 채널 구현 참고 |

## 핵심 요약

- RAG 계열 접근은 모델 내부 파라미터 지식만으로 답하지 않고, 외부 검색 결과를 함께 사용해 지식 집약 작업의 정확성과 구체성을 높이려는 방향이다.
- ReAct는 추론과 도구 행동을 분리하지 않고, 추론 중 필요한 정보를 외부 지식원이나 환경에서 가져오는 패턴을 제안한다.
- IRCoT는 멀티스텝 문제에서 첫 질문만으로 한 번 검색하는 방식이 부족할 수 있고, 이전 추론 단계가 다음 검색 대상을 바꾼다고 본다.
- OpenAI 공식 문서는 웹 검색과 파일 검색을 도구로 구성할 수 있음을 보여주며, 출처와 도메인 필터 같은 검색 제어가 중요하다는 점을 시사한다.

## 도출한 인사이트

- 계획 에이전트는 검색을 마지막 답으로 취급하지 말고, 검색 질문, 출처, 신뢰도, 현재성, 반대 신호를 기록한 뒤 인사이트로 압축해야 한다.
- 복잡한 계획은 단발 검색보다 “검색 → 해석 → 추가 검색 → 계획”의 반복 구조가 더 적합하다.
- 웹 검색만으로는 부족하므로 저장소 검색, 공식 문서, 논문, 코드/패키지 검색을 함께 사용해야 한다.
- 저장소 내부 리서치 노트를 다시 사용할 때도 오래되었거나 틀릴 수 있으므로 `knowledge-skeptic-agent` 검증을 먼저 거쳐야 한다.

## 계획 영향

- `research-insight-planner-agent`는 최소한 웹 검색과 하나 이상의 다른 검색 채널을 요구한다.
- 계획 입력에는 `sources_checked`, `insights`, `plan_steps`, `validation_steps`, `risks_or_unknowns`를 포함해야 한다.
- 내부 지식 베이스가 출처에 포함되면 `knowledge_validation_status=ready_to_reference`를 요구한다.
- 재사용 가능한 외부 레퍼런스는 `_research/topics/` 아래에 남긴다.

## 신뢰도 판단

- 논문/공식 문서를 중심으로 확인했으므로 근거 수준은 높다.
- OpenAI API 세부 사항은 빠르게 바뀔 수 있으므로 실제 구현 전 공식 문서를 다시 확인해야 한다.

## 불확실성 및 반대 신호

- 특정 검색 API나 모델 이름은 시간이 지나며 바뀔 수 있다.
- 연구 결과는 과업, 모델, 검색 품질에 따라 성능이 달라질 수 있다.
- 검색을 많이 한다고 항상 좋은 계획이 되는 것은 아니며, 출처 품질과 인사이트 추출 품질이 중요하다.

## 적용 가능성

- 에이전트 구축 플랫폼의 계획 단계
- 오픈소스/도구 선정
- 최신 문서나 외부 사례가 필요한 작업
- 이전 리서치 노트를 근거로 사용하는 작업

## 관련 작업

- `agent-platform/configs/agents/research-insight-planner-agent.json`
- `_ops/workflows/55-research-insight-planning.md`
- `_docs/search-insight-planning-policy.ko.md`

## 다음 확인 사항

- 실제 웹 검색 API를 플랫폼 런타임에 붙일 때 최신 OpenAI 공식 문서와 대체 검색 API의 현재 상태를 다시 비교한다.
- 검색 결과를 평가하는 별도 품질 점수나 출처 신뢰도 스키마를 추가할지 검토한다.
