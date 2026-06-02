# Structural Guardrails Traceability

| Requirement | Artifact | Verification |
| --- | --- | --- |
| `REQ-WS-079` | `_philosophy/agent-operating-philosophy.en.md` | `check-philosophy-trace` |
| `REQ-WS-079` | `agent-platform/configs/usage/ai-usage-gap-profile.json` | `check-config-contract` |
| `REQ-WS-079` | `_ops/workflows/59-bridge-ai-usage-gap.md` | docs audit and evaluation |
| `REQ-WS-079` | `_ops/prompts/89-bridge-ai-usage-gap.md` | docs audit and evaluation |
| `REQ-WS-079` | `_docs/operating-models/ai-usage-gap-operating-model.en.md` | docs audit and evaluation |

## Key Fields

- `risk_surface`
- `selected_guardrail`
- `allowed_actions`
- `blocked_actions`
- `fallback_or_escalation`
- `verification_evidence`
