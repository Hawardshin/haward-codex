# 할루시네이션 방지 운영 레퍼런스

## 조사 목적

에이전트 플랫폼에서 할루시네이션을 줄이기 위한 반복 가능한 정책, 프롬프트, 평가 에이전트 설계 근거를 정리한다.

## 접근일

- 2026-05-31

## 출처

| Source | URL | Notes |
| --- | --- | --- |
| OpenAI: ChatGPT and fake citations | https://help.openai.com/en/articles/8313428-chatgpt-and-fake-citations | 모델이 존재하지 않는 출처를 만들 수 있으므로 링크/출처 검증이 필요하다는 근거 |
| OpenAI Structured Outputs | https://platform.openai.com/docs/guides/structured-outputs | 출력 스키마를 강제해 형식 오류와 누락을 줄이는 구현 근거 |
| OpenAI File Search docs | https://developers.openai.com/api/docs/guides/tools-file-search | 문서 검색 기반 grounding/RAG 구현 참고 |
| OpenAI Web Search docs | https://developers.openai.com/api/docs/guides/tools-web-search | 최신 웹 정보가 필요한 작업에서 실시간 출처 확인 참고 |
| Anthropic: Reduce hallucinations | https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations | "모르면 모른다고 말하기", 직접 인용/출처 기반 답변, 단계별 검증 패턴 참고 |
| Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks | https://papers.neurips.cc/paper/2020/hash/6b493230205f780e1bc26945df7481e5-Abstract.html | 모델 내부 지식만 쓰지 않고 검색된 지식으로 보강하는 RAG 근거 |
| Chain-of-Verification Reduces Hallucination in Large Language Models | https://arxiv.org/abs/2309.11495 | 초안 답변 후 독립 검증 질문을 만들어 수정하는 방법 근거 |
| SelfCheckGPT | https://aclanthology.org/2023.emnlp-main.557/ | 생성 내용의 일관성/자기검사를 통해 비근거 문장을 탐지하는 연구 근거 |
| Self-RAG | https://arxiv.org/abs/2310.11511 | 검색 필요성 판단, 검색, 생성, 비평을 결합하는 에이전트형 RAG 근거 |

## 핵심 요약

- 할루시네이션은 단일 프롬프트만으로 제거하기 어렵다. 검색, 출처 확인, 구조화 출력, claim-level 검증, 불확실성 표시, 평가 루프를 결합해야 한다.
- RAG는 모델 내부 기억을 외부 지식으로 보강하지만, 검색 결과 자체가 틀릴 수 있으므로 출처 신뢰도와 최신성 검증이 필요하다.
- 구조화 출력은 답변 형식을 안정화하지만 사실성을 보장하지 않는다. schema 검증과 별도로 주장 검증이 필요하다.
- 자기검사/검증 루프는 초안의 오류를 줄이는 데 유용하지만, 같은 모델의 자기 확신에만 의존하지 말고 외부 근거와 도구 실행을 결합해야 한다.
- 출처가 필요한 답변에서는 실제 링크와 원문 확인을 요구해야 하며, 확인하지 않은 citation은 사용하지 않는다.

## 도출한 인사이트

- 공통 정책은 "모든 답변을 검색하라"가 아니라 "사실 주장 위험을 분류하고 필요한 근거 수준을 요구하라"여야 한다.
- 저장소 작업에서는 웹보다 파일/명령/테스트 결과가 더 강한 근거가 될 때가 많다.
- 최종 답변 직전 claim ledger를 만들고 `hallucination-guard-agent`로 검사하는 방식이 재사용 가능하다.
- 평가 보고서에 grounding check를 포함해야 "검증했다"는 말도 다시 검증 가능한 기록이 된다.

## 계획 영향

- `_docs/hallucination-prevention-policy.*.md`를 추가한다.
- `_ops/prompts/96-ground-output.md`와 `_ops/workflows/70-hallucination-prevention.md`를 추가한다.
- `agent-platform`에 Python 기반 `hallucination-guard-agent`와 `check-grounding` CLI를 추가한다.
- `work-evaluator-agent` 입력에 `grounding_checks`를 추가한다.

## 신뢰도 판단

- 공식 문서와 주요 연구 논문을 함께 사용했으므로 근거 수준은 높다.
- 공급자 문서는 제품 기능과 권장 패턴에는 강하지만 일반 이론 근거로는 논문보다 제한적이다.
- 논문은 연구 조건에서의 근거이므로 실제 운영에서는 저장소 도구 검증과 함께 써야 한다.

## 불확실성 및 반대 신호

- 할루시네이션을 "완전히 없애는" 방법은 현실적으로 없다. 목표는 unsupported claim을 차단하고 오류 가능성을 낮추는 것이다.
- RAG도 검색 품질, chunking, 오래된 문서, 잘못된 소스 때문에 오류를 낼 수 있다.
- 구조화 출력은 schema 준수에는 도움이 되지만 내용의 진실성을 자동 보장하지 않는다.

## 적용 가능성

- 저장소 운영 규칙, 평가 루프, 리서치 캡처, 최종 답변 품질 관리에 직접 적용한다.
- 프로젝트별 고위험 도메인에서는 더 강한 source policy와 별도 평가셋이 필요하다.

## 관련 작업

- `_docs/policies/hallucination-prevention-policy.ko.md`
- `_ops/workflows/70-hallucination-prevention.md`
- `agent-platform/docs/hallucination-guard-agent.ko.md`

## 다음 확인 사항

- 실제 프로젝트가 늘어나면 claim 유형과 risk level을 도메인별로 세분화한다.
- OpenAI/Anthropic 등 모델 제공자의 grounding, citations, eval 기능 변경 시 이 노트를 재확인한다.

## 후속 정책 변경

- 2026-05-31에 사용자가 모든 새 지시를 웹 검색으로 먼저 시작하라고 지시했다.
- 이 노트의 "모든 답변을 검색하라가 아니라 위험을 분류하라"는 인사이트는 검색 강도 조절 규칙으로만 유지한다.
- 현재 운영 규칙은 web-first intake를 항상 수행하고, 그 이후 작업 위험도에 따라 추가 검색과 grounding 깊이를 조절한다.
