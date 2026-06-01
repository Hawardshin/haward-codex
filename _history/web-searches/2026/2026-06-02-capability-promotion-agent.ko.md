# 웹 검색 기록: Capability Promotion Agent

## 요청

- 요청 ID: `UR-2026-06-02-028`
- 요약: 다양한 작업을 스스로 하다가 필요한 기능을 추가하도록 하는 블랙박스적 처리 구조를 요청했다.
- 작업 모드: `governance`

## 검색어

- `agentic workflows self-improving agents tool creation guardrails official docs 2025`
- `autonomous software agents self improvement tool generation evaluation safeguards research paper`
- `NIST AI RMF autonomous AI agents tool use monitoring guardrails`
- `LangChain agents tool calling human in the loop guardrails durable memory docs`
- `Anthropic Building effective agents workflows tools evaluator optimizer official blog`
- `OpenAI agents SDK tracing guardrails human in the loop docs tool approval`
- `Microsoft AI agents evaluation monitoring human oversight documentation`

## 확인한 주요 출처

- Anthropic, "Building Effective Agents" (2024-12-19): https://www.anthropic.com/engineering/building-effective-agents
- OpenAI Agents SDK Documentation: https://openai.github.io/openai-agents-python/
- NIST AI Risk Management Framework: https://www.nist.gov/itl/ai-risk-management-framework
- LangChain Multi-agent Documentation: https://docs.langchain.com/oss/python/langchain/multi-agent
- LangChain Human-in-the-loop Documentation: https://docs.langchain.com/oss/python/langchain/human-in-the-loop
- Microsoft Agent Factory / Microsoft 365 Agents SDK documentation pages were checked as ecosystem references.

## 약한 출처 처리

- 일반 블로그와 벤더 마케팅 글은 후보 탐색에는 참고했지만, 정책 근거로는 공식 문서와 표준형 가이드 중심으로 제한했다.
- 좋아요, 별점, 커뮤니티 반응은 adoption 신호로만 볼 수 있으므로 사실 근거로 사용하지 않았다.

## 계획 반영

- Anthropic의 workflow/agent 구분과 단순하고 조합 가능한 패턴 관점은 `prompt -> workflow -> template -> tool -> skill -> agent -> project_feature`의 작은 자산 우선 원칙에 반영했다.
- OpenAI Agents SDK의 guardrails/tracing/human-in-the-loop 개념은 관찰, 위험, 검증, rollback, 평가 trace를 남기는 구조에 반영했다.
- NIST AI RMF는 자율 개선을 risk tier와 governance checkpoint로 제한하는 근거로 사용했다.
- LangChain multi-agent/human-in-the-loop 문서는 에이전트 간 역할 분리와 사람 승인 interrupt/resume 구조를 확인하는 데 사용했다.

## 남은 불확실성

- 실제 background worker나 UI 자동 후보 생성은 아직 구현하지 않았다.
- 이번 변경은 운영 계약, 에이전트 spec, 레지스트리, 문서와 검증 경로를 먼저 만드는 단계다.

## 공개 판단 요약

완전한 블랙박스 자동 기능 추가는 위험하다. 사용자 경험은 자동화하되 내부 기록, 위험 분류, 사람 체크포인트, 검증, rollback, 평가를 남기는 bounded black-box capability promotion으로 설계하는 것이 현재 플랫폼 철학과 외부 근거에 더 맞다.
