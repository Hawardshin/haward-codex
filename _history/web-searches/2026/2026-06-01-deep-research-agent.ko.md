# 웹 검색 기록: 딥리서치 에이전트

## 개요

- 날짜: 2026-06-01
- 사용자 지시 요약: 특정 상황에서 검색을 수행하고, 여러 단계로 깊게 자료를 모아 매우 자세한 보고서를 쓰는 딥리서치 에이전트를 만들 것.
- 작업 모드: `standard`

## 검색어

- `deep research agent methodology multi-step web research citations report writing official documentation`
- `Perplexity style answer engine research agent source ranking evidence synthesis citations`
- `OpenAI deep research agent report citations methodology official`
- `research agent evaluation source quality citation grounding report generation`
- `LangChain deep agents deep research GitHub open source`
- `OpenAI Agents SDK deep research example GitHub open source`
- `deep research agent open source report citations GitHub`
- `exa research API documentation multi-step grounded reports citations`

## 확인한 출처

| 출처 | URL | 유형 | 확인 내용 |
| --- | --- | --- | --- |
| OpenAI API Deep Research | https://developers.openai.com/api/docs/guides/deep-research | official | 복잡한 분석/조사 작업에서 다수 출처를 찾아 분석/종합해 연구 분석가 수준의 보고서를 만들고, web search, MCP, file search 같은 도구를 사용할 수 있다는 설계 방향을 확인했다. |
| OpenAI Help Center Deep Research | https://help.openai.com/articles/10500283 | official | 사용자가 결과 목표와 사용할 출처를 정하고, 제안된 조사 계획을 검토한 뒤, 진행 중 개입할 수 있으며, 최종 구조화 보고서에 citation/source link가 포함되는 흐름을 확인했다. |
| Exa Research API docs | https://exa.ai/docs/reference/exa-research | official | deep research가 planning, searching, reasoning/synthesis로 이어지는 비동기 다단계 파이프라인이며, 자연어 지시에는 찾을 정보, 찾는 방법, 보고서 구성 방법이 명확해야 한다는 점을 확인했다. |
| LangChain Deep Agents deep research docs | https://docs.langchain.com/oss/python/deepagents/deep-research | official/open-source docs | todo 기반 계획, isolated sub-agent 조사, 검색 결과 평가와 다음 단계 계획, citation이 포함된 최종 보고서 합성 패턴을 확인했다. |
| langchain-ai/open_deep_research | https://github.com/langchain-ai/open_deep_research | open_source | supervisor-researcher, parallel processing, MCP support 같은 다중 에이전트/병렬 조사 구현 패턴을 확인했다. |
| Cited but Not Verified 논문 | https://arxiv.org/abs/2605.06635 | paper | 딥리서치 에이전트의 citation은 표면상 있어도 접근성, 관련성, 사실 일관성이 검증되지 않을 수 있어 citation audit가 필요하다는 위험을 확인했다. |
| ReportBench 논문 | https://arxiv.org/abs/2508.15804 | paper | 생성 보고서를 citation과 statement로 분해하고, 원천과의 faithfulness 및 미인용 claim을 검증하는 평가 프레임을 확인했다. |

## 계획에 반영한 인사이트

- 딥리서치 에이전트는 기존 `research-insight-planner-agent`를 대체하지 않는다. 기존 에이전트는 계획 준비 상태를 검증하고, 새 에이전트는 깊은 조사 패키지와 보고서 작성 준비 상태를 검증한다.
- 보고서 품질은 단순 검색량보다 query decomposition, iterative retrieval, source quality review, contradiction mapping, citation audit, skeptic review가 있는지로 판단해야 한다.
- citation은 proof가 아니라 검증 handle이다. 따라서 `citation_audit_notes`와 `unsupported_or_weak_claims` 같은 필드가 필요하다.
- 긴 보고서 작업은 중간 artifact와 출처 bundle을 남겨야 하므로 `report_targets`, `evidence_items`, `source_value_provenance`, `report_outline`을 필수로 둔다.

## 제외하거나 약하게 취급한 출처

- Wikipedia와 일반 SEO/마케팅성 글은 용어 확인이나 발견용으로만 보고 설계 근거로 쓰지 않았다.
- Reddit 사례는 실제 사용자의 불만과 구현 방향 발견에는 유용하지만, 사실 주장의 독립 근거로 사용하지 않았다.
- 벤더별 성능/가격/모델 세부 수치는 빠르게 바뀔 수 있으므로 이번 구조의 고정 요구사항으로 넣지 않았다.

## 공개 판단 요약

새 에이전트는 `deep-research-agent`로 분리한다. 기본 구현은 외부 검색을 실제로 자동 실행하는 crawler가 아니라, 사람이/에이전트가 수행한 깊은 조사 패키지가 보고서 작성 또는 발행 준비 상태인지 검증하는 Python readiness agent로 둔다. 이렇게 하면 현재 플랫폼의 문서 기반 운영, 출처 추적, hallucination guard, work evaluator와 자연스럽게 연결된다.

## 관련 산출물

- 요구사항: `REQ-WS-040`
- 스펙: `_specs/workspace-platform/2026-06-01-deep-research-agent/`
- 설정: `agent-platform/configs/research/deep-research-profile.json`
- 에이전트: `agent-platform/configs/agents/deep-research-agent.json`
