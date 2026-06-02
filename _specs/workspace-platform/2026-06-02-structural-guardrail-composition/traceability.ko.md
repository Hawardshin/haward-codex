# 구조적 가드레일 구성 추적성

| 요구사항 | 산출물 | 검증 |
| --- | --- | --- |
| `REQ-WS-080` | `agent-platform/src/agent_platform/governance/guardrail_composition.py` | `python3 -m unittest discover -s tests -p 'test_guardrail_composition.py'` |
| `REQ-WS-080` | `agent-platform/src/agent_platform/cli.py` | `check-guardrail-composition` CLI smoke test |
| `REQ-WS-080` | `agent-platform/configs/governance/structural-guardrail-composition-template.json` | `check-config-contract`, `check-guardrail-composition` |
| `REQ-WS-080` | `agent-platform/tests/test_guardrail_composition.py` | unit test |

## 핵심 필드

- `risk_surfaces`
- `guardrails`
- `execution_controls`
- `source_provenance`
- `plan_evidence`
