# Structural Guardrail Composition Web Search Record

## Request

- `UR-2026-06-02-040`
- The user requested creation of a structural composition.

## Search Date

- 2026-06-02

## Queries

- `AI guardrail architecture input output tool guardrails official documentation template`
- `LLM application guardrails risk controls allowlist schema human approval rollback best practices official`
- `OpenAI Agents SDK guardrails workflow boundaries tool guardrails official`
- `OWASP Top 10 for LLM Applications prompt injection sensitive information disclosure excessive agency`
- `NIST AI Risk Management Framework official govern map measure manage`

## Checked Sources

| Source | Type | Checked Point | Used For |
| --- | --- | --- | --- |
| OpenAI Agents SDK Guardrails | Official docs | Input, output, and tool guardrails run at different workflow points. Tool guardrails can validate or block around tool execution. | Guardrail type and workflow-boundary design |
| OWASP Top 10 for LLM Applications | Security standard/community project | Prompt injection, sensitive information disclosure, excessive agency, insecure output handling, and overreliance are LLM application risks. | Risk category and material-risk classification |
| NIST AI RMF | Government framework | Provides a frame for identifying, measuring, managing, and governing AI risks. | Risk-first composition and evidence requirements |

## Weak Sources Ignored

- Reddit and general blogs were useful for discovery but not used as factual proof for this implementation.
- Commercial summaries were treated as secondary because first-party OpenAI, OWASP, and NIST sources were available.

## Plan Impact

- Compose guardrails as `risk_surfaces -> guardrails -> execution_controls -> verification_evidence`, not as prompt wording.
- Require hard guardrails for high-impact or irreversible risk surfaces.
- Apply separate gates for security/privacy, deployment/destructive change, external tool/file/permission, cost, and publication/high-stakes claim risks.
- Make the template pass `check-config-contract` so a future worker can understand the structure by opening the file.

## Uncertainty

- No universal guardrail set is best for every situation.
- This implementation creates composition and checking structure; it does not implement an OS-level sandbox or external policy engine.

## Public Decision Summary

- Structural guardrails should be selected by risk surface, and each guardrail should state allowed actions, blocked actions, failure handling, and verification evidence.
