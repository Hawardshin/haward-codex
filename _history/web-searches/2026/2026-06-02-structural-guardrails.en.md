# Web Search Record: Structural Guardrails

## Search Purpose

Before turning the user's “guardrails are necessary” instruction into a platform operating rule, I checked high-authority sources about AI agent guardrails and AI risk management.

## Queries

- `AI agent guardrails official documentation OpenAI guardrails prompt safety structured outputs tools`
- `NIST AI Risk Management Framework guardrails AI systems official`
- `OWASP Top 10 for LLM Applications guardrails official`
- `Anthropic prompt engineering guardrails official documentation`

## Key Sources Checked

| Source | URL | Why It Was Used |
| --- | --- | --- |
| OpenAI Agents SDK Guardrails | https://openai.github.io/openai-agents-python/guardrails/ | Checked guardrails as input, output, and tool checks/validations at workflow boundaries. |
| OWASP Top 10 for Large Language Model Applications | https://owasp.org/www-project-top-10-for-large-language-model-applications/ | Checked a high-trust security source for LLM application and agentic AI system risks. |
| NIST AI Risk Management Framework | https://www.nist.gov/itl/ai-risk-management-framework | Checked official risk-management framing for AI products, services, and systems across design, development, use, and evaluation. |

## Plan Impact

- Define guardrails as execution boundaries rather than prompt wording.
- Classify risk surfaces as security, privacy, cost, publication, deployment, destructive change, external tool call, file access, permission, and high-stakes claim.
- Represent selectable guardrails as input filter/redaction, output schema, allowlist/denylist, tool permission, sandbox/dry-run, rate limit, human checkpoint, evaluator, test, privacy/security audit, and rollback gate.
- Allow light checks for low-risk reversible work, but do not let high-risk work proceed on prompt wording alone.

## Remaining Uncertainty

- This change adds an operating principle and contract. It does not implement a runtime permission system or a linter for every prompt file.
- Guardrail strength must fit task risk and reversibility. Excessive gates can reduce speed and usability.
