# 웹 우선 작업 정책 리서치

## 조사 목적

모든 새 사용자 지시에 웹 검색을 먼저 수행하는 운영 규칙의 근거와 한계를 정리한다.

## 접근일

- 2026-05-31

## 출처

| Source | URL | Notes |
| --- | --- | --- |
| OpenAI Academy: Web search | https://academy.openai.com/public/clubs/work-users-ynjqu/resources/web-search/ | 최신 정보, 상세 정보, 출처 링크 검토 필요성 |
| OpenAI Knowledge Retrieval blueprint | https://openai.com/solutions/blueprints/knowledge-retrieval/ | grounded answers, citations, evals를 함께 쓰는 참고 구조 |
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://proceedings.neurips.cc/paper/2020/hash/6b493230-Abstract.html | 모델 내부 지식과 검색 메모리 결합 근거 |
| Anthropic: Reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | 출처/인용 검증, 불확실성 허용, 중요 정보 검증 필요성 |

## 핵심 요약

- 웹 검색은 최신 정보와 외부 레퍼런스를 빠르게 확인하는 데 유용하다.
- 검색 결과 자체도 틀릴 수 있으므로 출처 링크를 열어 확인해야 한다.
- RAG 계열 연구는 모델 내부 지식만 쓰는 것보다 검색된 외부 지식을 결합하는 방향이 지식 집약 작업에서 더 적합하다는 근거를 제공한다.
- 할루시네이션 방지는 검색만으로 끝나지 않고 citations, evals, claim grounding, 불확실성 표시와 함께 운영해야 한다.

## 도출한 인사이트

- 사용자 선호에 따라 모든 작업을 web-first로 시작하되, 작업 유형별 검색 강도는 다르게 가져간다.
- 단순 로컬 작업은 가벼운 웹 검색 후 저장소 검증으로 넘어간다.
- 정책, 코드, 오픈소스, 최신 정보 작업은 웹 검색 결과를 계획과 평가에 반영한다.
- 유용한 검색 결과만 `_research/`에 저장하고, 무관한 검색은 평가나 히스토리에 짧게 남긴다.

## 계획 영향

- `_docs/web-first-work-policy.*.md`를 추가한다.
- `_ops/prompts/05-web-first-intake.md`와 `_ops/workflows/05-web-first-intake.md`를 추가한다.
- 시작 워크플로와 지속 지시를 "웹 검색 먼저"로 갱신한다.
- 기존 risk-based 검색 정책은 web-first intake 이후의 검색 강도 조절 규칙으로 유지한다.

## 신뢰도 판단

- OpenAI/Anthropic 공식 자료와 NeurIPS RAG 논문을 함께 확인했으므로 운영 방향의 근거는 충분하다.
- 특정 제품 기능은 시간이 지나며 바뀔 수 있어, 관련 작업마다 다시 검색해야 한다.

## 불확실성 및 반대 신호

- 모든 작업에 웹 검색을 강제하면 속도와 비용이 늘 수 있다.
- 웹 검색은 민감 정보를 외부 검색어로 노출하지 않도록 일반화해야 한다.
- 검색 결과가 무관한 작업에서는 로컬 파일/테스트/명령 결과가 더 강한 근거가 된다.

## 적용 가능성

- 모든 새 사용자 지시의 첫 단계로 적용한다.
- 프로젝트별 작업에도 공통 적용하되, 프로젝트 내부 파일 소유 규칙은 그대로 유지한다.

## 관련 작업

- `_docs/policies/web-first-work-policy.ko.md`
- `_ops/workflows/05-web-first-intake.md`
- `_ops/prompts/05-web-first-intake.md`

## 다음 확인 사항

- 웹 검색 결과 품질 점수나 출처 등급 스키마가 필요해지면 `agent-platform`에 별도 evaluator를 추가한다.
