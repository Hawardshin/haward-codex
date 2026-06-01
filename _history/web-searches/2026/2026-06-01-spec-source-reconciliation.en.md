# Web Search Record: Spec/Source Reconciliation

## Overview

- Date: 2026-06-01
- Request summary: Add a structure for handling ambiguous specs or spec/source drift by deciding whether to update the spec, update source, or ask answerable clarification questions through alerts.
- Work mode: `standard`

## Queries

- `requirements traceability ambiguity stakeholder clarification specification vs implementation change official guidance`
- `IEEE 29148 requirements specification validation ambiguity stakeholder requirements official`
- `requirements traceability matrix requirements change management specification implementation mismatch best practices`
- `software requirements ambiguity clarification questions source code spec mismatch best practices`
- `IEEE ISO IEC 29148 requirements specification ambiguity validation official`
- `IBM requirements management traceability change impact analysis requirements official`

## Key Sources Checked

| Source | Type | Checked Point | Plan Impact |
| --- | --- | --- | --- |
| IEEE SA, `IEEE/ISO/IEC 29148-2018` | Official standard page | Covers requirements engineering processes, good requirement construction, and iterative use of requirements processes. | Shaped the rule to treat specs/requirements as lifecycle artifacts and record evidence before changes. |
| ISO, `ISO/IEC/IEEE 29148:2018` | Official standard page | Confirmed in 2024 and describes requirements processes plus information-item content and format guidance. | Informed required information fields in the self-documenting template and reconciliation input. |
| IBM Engineering Requirements Management, `Traceability` | Official documentation | Links requirements to implementation/test artifacts and uses traceability for impact analysis and lifecycle coverage. | Informed comparison evidence, affected paths, and traceability outputs. |
| IBM Think, `What is requirements management?` | Official explainer | Describes analysis, definition, approval, traceability, change management, revisions, and document updates. | Informed `update_spec` and `update_source` classification after impact-aware review. |

## Weak Or Ignored Sources

- Generic RTM blog/SEO articles: used only for discovery, not as core evidence.
- Reddit/community posts: useful for practitioner intuition, but not the main basis for durable policy.
- Older SRS tutorials: lower direct fit than the repository's current operating model.

## Applied Insights

- When spec and source disagree, inspect traceability between requirements, implementation, and tests before changing either side.
- Classify changes as `update_spec`, `update_source`, `ask_user`, or `defer`.
- If user intent is ambiguous, ask with a question ID, options, answer format, and decision impact.
- Block related spec/source changes until the user's answer is recorded for `ask_user` issues.

## Uncertainty

- Requirements management tools implement traceability differently. This repository uses a tool-neutral JSON template, Markdown trace records, and CLI validation rather than a vendor-specific tool.
