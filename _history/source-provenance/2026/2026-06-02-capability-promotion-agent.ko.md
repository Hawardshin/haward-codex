# Source Provenance: Capability Promotion Agent

| 원천값/주장 | 출처 | 적용 |
| --- | --- | --- |
| 복잡한 autonomous agent보다 명확한 workflow와 조합 가능한 패턴이 유지보수에 유리하다 | Anthropic Building Effective Agents | 가장 작은 capability type 우선 원칙 |
| agent 실행에는 guardrail, tracing, handoff, human-in-the-loop 같은 제어가 필요하다 | OpenAI Agents SDK docs | observation, validation, evaluation, trace 요구 |
| AI 시스템은 risk management 관점에서 governance와 measurement가 필요하다 | NIST AI RMF | risk tier, human checkpoint, rollback 요구 |
| multi-agent 구조는 역할, context, handoff를 명시해야 한다 | LangChain multi-agent docs | capability-promotion-agent와 agent orchestration registry 연결 |
| 이 저장소는 반복 작업을 tool/skill/template로 승격해야 한다 | `_docs/governance/capability-governance.md` | prompt/workflow/template/tool/skill/agent/project_feature 순서 |
