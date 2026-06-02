# 2026-06-02 Workspace Platform Philosophy 웹 검색 기록

- 작업: 현재 플랫폼의 철학과 시작 문제를 설명하는 30분 발표 자료 제작
- 작업 모드: `standard`
- 검색 목적: 발표의 내부 철학을 보조할 외부 설계 근거 확인

## 검색 쿼리

- `Anthropic Building effective agents workflows tools evaluation blog December 2024`
- `OpenAI Agents SDK tracing guardrails tools documentation official`
- `NIST AI Risk Management Framework official AI risk management trustworthiness`
- `Google People + AI Research Guidebook human centered AI official`

## 확인한 출처

| 출처 | 확인 내용 | 반영 |
| --- | --- | --- |
| Anthropic, Building effective agents | 2024-12-19 글. 성공적인 agentic system은 단순하고 조합 가능한 pattern을 쓰는 경우가 많고, 복잡도는 비용/지연과 trade-off가 있다고 설명한다. | 4번 슬라이드에서 단일 거대 에이전트보다 기록 가능한 워크플로와 작은 패턴을 선호하는 근거로 사용 |
| OpenAI Agents SDK Tracing | agent run에서 generation, tool call, handoff, guardrail, custom event trace를 수집할 수 있다고 설명한다. | 관측성과 history/tracing 필요성 보조 근거 |
| OpenAI Agents SDK Guardrails | input/output/tool guardrail이 workflow boundary에 따라 다르게 작동한다고 설명한다. | guardrail을 prompt-only reminder가 아닌 실행 경계로 설명하는 보조 근거 |
| NIST AI RMF | AI risk management framework가 AI 제품/서비스/시스템의 설계, 개발, 사용, 평가 과정에서 trustworthiness 고려를 돕기 위한 voluntary framework라고 설명한다. | 평가/위험관리 루프의 외부 보조 근거 |
| Google PAIR | Google PAIR가 인간중심 AI 연구, 도구, 디자인 framework, responsible AI application guide를 제공한다고 설명한다. | 인간 프로세스 중심 설계 보조 근거 |

## 약한 출처와 제외

- 검색 결과의 뉴스, Reddit, Wikipedia, 판매성 자료는 이번 발표의 핵심 근거로 쓰지 않았다.
- 발표가 이 저장소의 철학 설명이므로 외부 출처는 주장 검증보다 설계 방향 보강에만 사용했다.

## 계획 영향

- 발표 중심은 내부 철학/운영 모델에 두고, 외부 출처는 agent complexity, tracing, guardrail, risk management, human-centered AI 관점을 보강하는 위치로 제한했다.
- 30분 발표는 기능 소개보다 문제-원인-원칙-설계-운영 루프-미래 방향 순서로 구성한다.

## 불확실성

- 외부 문서는 계속 갱신될 수 있으므로 발표 공개 전에는 링크와 문서 제목을 다시 확인해야 한다.
- OpenAI Agents SDK 문서는 빠르게 변할 수 있어, SDK 구현 세부사항은 발표에서 일반적 관찰 가능성/guardrail 구조로만 언급한다.
