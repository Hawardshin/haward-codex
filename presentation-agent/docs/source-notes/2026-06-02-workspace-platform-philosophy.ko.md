# Workspace Platform Philosophy 발표 출처 노트

- 날짜: 2026-06-02
- 소유 프로젝트: `presentation-agent`
- 관련 스크립트: `presentation-agent/docs/scripts/2026-06-02-workspace-platform-philosophy.ko.md`
- 관련 HTML: `presentation-agent/artifacts/html/workspace-platform-philosophy.html`

## 내부 1차 근거

| 출처 | 사용 범위 |
| --- | --- |
| `_philosophy/agent-operating-philosophy.ko.md` | 핵심 철학, 검색/검증/평가/가드레일/반복 승격 원칙 |
| `_docs/operating-models/platform-identity-operating-model.ko.md` | 플랫폼 한 문장 정의, 존재 이유, 운영 루프, 좋은 산출물 기준 |
| `_docs/operating-models/tool-agnostic-agent-operating-model.ko.md` | Codex 전용이 아닌 도구 독립형 운영 모델 |
| `presentation-agent/README.md` | 발표 에이전트의 범위, deck spec, HTML/PPTX 검증 구조 |
| `presentation-agent/docs/scripts/2026-06-01-platform-presentation-pack.ko.md` | 기존 플랫폼 발표 팩 구성과 이번 발표의 차이 |
| `_history/work-summaries/2026/2026-06-02.ko.md` | 최근 플랫폼 확장 흐름과 사용자의 반복 요청 맥락 |
| `_history/user-requests/2026/2026-06-02.ko.md` | 2026-06-02 요청이 요구사항으로 정리된 방식 |

## 외부 보조 근거

| 출처 | 사용 범위 | 발표에서의 역할 |
| --- | --- | --- |
| Anthropic, Building effective agents, 2024-12-19, `https://www.anthropic.com/engineering/building-effective-agents` | 단순하고 조합 가능한 agentic patterns, workflow/agent 구분, 복잡도와 비용/지연 trade-off | 플랫폼이 거대한 단일 에이전트보다 작고 기록 가능한 워크플로를 선호하는 이유를 보강 |
| OpenAI Agents SDK Tracing, `https://openai.github.io/openai-agents-python/tracing/` | agent run 중 LLM generation, tool call, handoff, guardrail, custom event trace 기록 | 실행 관측성과 추적 가능성의 보조 근거 |
| OpenAI Agents SDK Guardrails, `https://openai.github.io/openai-agents-python/guardrails/` | input/output/tool guardrail과 workflow boundary | prompt-only warning 대신 구조적 guardrail이 필요한 이유를 보강 |
| NIST AI Risk Management Framework, `https://www.nist.gov/itl/ai-risk-management-framework` | AI 제품/서비스/시스템의 설계, 개발, 사용, 평가에서 trustworthiness 고려 | 위험관리와 평가 루프의 외부 기준 |
| Google People + AI Research, `https://pair.withgoogle.com/` | 인간중심 AI, useful and responsible AI applications, participatory framing | 인간 프로세스와 사용자를 중심에 둔 설계 관점 보강 |
| NIST AI RMF AIRC, `https://airc.nist.gov/airmf-resources/airmf/3-sec-characteristics/` | AI 신뢰성, 정확성 측정 문서화, training data provenance와 transparency/accountability 연결 | 고품질 데이터 축적에서 provenance와 검증 방법이 필요한 이유 보강 |
| Canada.ca Guidance on Data Quality, `https://www.canada.ca/en/government/system/digital-government/digital-government-innovations/information-management/guidance-data-quality.html` | 데이터 품질 차원으로 accuracy, completeness, consistency, relevance, reliability, timeliness 등을 설명 | 플랫폼의 고품질 데이터 기준을 설명하는 보조 근거 |

## 약한 근거로 사용하지 않은 것

- 좋아요, 댓글, 커뮤니티 반응은 이번 발표의 사실 근거로 쓰지 않았다.
- 외부 자료는 이 플랫폼의 내부 구조를 증명하는 근거가 아니라 설계 방향을 보강하는 보조 근거로만 썼다.
- 기존 히스토리 문서는 유용하지만 그 자체가 절대 근거는 아니므로, 발표의 주요 사실은 현재 파일 상태와 새 검증 기록으로 다시 확인한다.

## 발표 주장별 근거

- “AI는 빠르게 만들지만 빠르게 잊는다”: 내부 운영 모델의 존재 이유와 사용자 반복 요청에서 도출한 문제 정의.
- “추정은 출발점이지 결론이 아니다”: `_philosophy/agent-operating-philosophy.ko.md`, 웹 우선 접수 규칙.
- “검색은 답이 아니라 인사이트의 원료다”: 내부 철학과 source provenance/work search 기록 정책.
- “기록은 다음 에이전트를 위한 인터페이스다”: 플랫폼 정체성 운영 모델, 히스토리/trace/work-summary 규칙.
- “고품질 데이터 축적”: 내부 철학 원칙 18, 플랫폼 아이덴티티 운영 모델, NIST/Canada.ca 데이터 품질 보조 출처.
- “가드레일은 실행 경계다”: 내부 철학의 structural guardrail 원칙과 OpenAI/NIST 보조 출처.
- “도구 독립형 운영 모델”: `_docs/operating-models/tool-agnostic-agent-operating-model.ko.md`.
- “발표 에이전트도 사례다”: `presentation-agent/README.md`, 기존 deck spec/HTML/browser test 구조.
