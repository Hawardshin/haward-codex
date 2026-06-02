# 구조적 가드레일 추적성

| 요구사항 | 산출물 | 검증 |
| --- | --- | --- |
| `REQ-WS-079` | `_philosophy/agent-operating-philosophy.ko.md` | `check-philosophy-trace` |
| `REQ-WS-079` | `agent-platform/configs/usage/ai-usage-gap-profile.json` | `check-config-contract` |
| `REQ-WS-079` | `_ops/workflows/59-bridge-ai-usage-gap.md` | 문서 감사 및 평가 |
| `REQ-WS-079` | `_ops/prompts/89-bridge-ai-usage-gap.md` | 문서 감사 및 평가 |
| `REQ-WS-079` | `_docs/operating-models/ai-usage-gap-operating-model.ko.md` | 문서 감사 및 평가 |

## 주요 필드

- `risk_surface`
- `selected_guardrail`
- `allowed_actions`
- `blocked_actions`
- `fallback_or_escalation`
- `verification_evidence`
