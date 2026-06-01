# Web Search Record: Work Mode Enforcement

## Search Purpose

Checked policy, schema, and guardrail references for turning work modes from prompt guidance into enforceable execution contracts.

## Queries

- `policy as code enforcement workflow governance Open Policy Agent official documentation`
- `JSON Schema validate configuration official documentation`
- `guardrails AI structured outputs validation enforcement official documentation`
- `Open Policy Agent policy as code official docs enforcement point`

## Sources Checked

| Source | URL | Used For |
| --- | --- | --- |
| Open Policy Agent docs | https://www.openpolicyagent.org/docs/latest | Reference for separating policy into code/config and delegating policy decisions to software |
| JSON Schema Specification | https://json-schema.org/specification | Reference for machine-checking structural contracts |
| Akka Guardrails docs | https://doc.akka.io/sdk/agents/guardrails.html | Reference for guardrails declared in config and enforced at runtime |
| Azure Prompt Shields docs | https://learn.microsoft.com/en-us/azure/ai-services/openai/concepts/content-filter-prompt-shields | Reference for detecting/mitigating prompt attacks at model input boundaries |

## Plan Impact

- Work modes are represented in `work-mode-registry.json` with enforcement layers.
- `check-work-modes` catches drift between the registry and evaluator target policy.
- Non-`quick` work includes `mode_selection_record_targets` in evaluator input.
- The evaluator turns missing mode selection records into blocking gaps.

## Uncertainty

- No external policy engine such as OPA was installed; the current Python validator is enough for this scope.
- Guardrail sources are AI safety examples, not identical to work mode governance. They were used as design evidence that prompt-only rules should be backed by runtime or boundary checks.
