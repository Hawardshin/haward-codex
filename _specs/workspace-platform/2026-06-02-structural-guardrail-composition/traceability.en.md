# Structural Guardrail Composition Traceability

| Requirement | Artifact | Verification |
| --- | --- | --- |
| `REQ-WS-080` | `agent-platform/src/agent_platform/governance/guardrail_composition.py` | `python3 -m unittest discover -s tests -p 'test_guardrail_composition.py'` |
| `REQ-WS-080` | `agent-platform/src/agent_platform/cli.py` | `check-guardrail-composition` CLI smoke test |
| `REQ-WS-080` | `agent-platform/configs/governance/structural-guardrail-composition-template.json` | `check-config-contract`, `check-guardrail-composition` |
| `REQ-WS-080` | `agent-platform/tests/test_guardrail_composition.py` | unit test |

## Key Fields

- `risk_surfaces`
- `guardrails`
- `execution_controls`
- `source_provenance`
- `plan_evidence`
