# Structural Guardrail Composition Change

## Requirement ID

- `REQ-WS-080`

## User Request

- `UR-2026-06-02-040`
- The user requested creation of a structural composition.

## Change

- Make structural guardrails authorable as a concrete JSON composition record.
- Each record must include `task`, `risk_surfaces`, `guardrails`, `execution_controls`, `source_provenance`, and `plan_evidence`.
- High-impact or hard-to-reverse risk surfaces must be covered by a hard guardrail.
- The `agent-platform` CLI must check a composition file and return `guardrails_ready` or `rework_required`.

## Evidence

- OpenAI Agents SDK documents input, output, and tool guardrails at different workflow points.
- OWASP LLM Top 10 covers LLM application risks such as sensitive information disclosure, excessive agency, output handling, and overreliance.
- NIST AI RMF provides an AI risk identification, measurement, management, and governance frame.

## Impact

- `REQ-WS-079` becomes an executable validation structure.
- Platform workers can create and validate guardrail composition records before material-risk work.
