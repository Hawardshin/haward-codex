# 2026-06-02 Omission Prevention Web Search Record

## Work

- Request: `UR-2026-06-02-011`
- Purpose: decide how the platform should guard against agents missing required items.
- Work mode: `governance`

## Queries

- `WHO surgical safety checklist omissions checklist official evidence`
- `NASA software assurance requirements traceability verification official`
- `Atlassian definition of done agile checklist official`
- `site:learn.microsoft.com Azure DevOps requirements traceability Boards official`

## Sources Checked

| Source | Type | Finding | Impact |
| --- | --- | --- | --- |
| WHO Safe surgery Tool and Resources | Official | The WHO Surgical Safety Checklist is positioned as a tool for reducing errors/adverse events and improving teamwork/communication, with emphasis on checking items without relying on memory. | Design omission prevention as explicit coverage, not as memory advice. |
| NASA Software Engineering and Assurance Handbook | Official | NASA guidance references requirements implementation and a Requirements Mapping Matrix with applicability and justification. | Require evidence for `covered` and rationale for `not_applicable` or `deferred`. |
| Microsoft Learn Requirements traceability | Official | Requirements traceability relates development phases and links requirements to test cases, bugs, and code changes. | Link requirements, artifacts, and validation through `omission_check_targets`. |
| Atlassian Definition of Done | Practical guide | Explains task completion checklists and distinguishes DoD from acceptance criteria. | Separate acceptance checks from artifact checks. |

## Weak Sources Ignored

- Generic checklist blog posts: less authoritative than official or strong practical sources.
- Vendor-heavy traceability pages: useful as examples but too sales-oriented for primary policy evidence.

## Plan Impact

- Add `omission-guard-agent` and a task-specific JSON coverage record.
- Add `omission_check_targets` to `work-evaluator-agent` target policy.
- Keep `quick` advisory, but make `standard`, `ship_first`, `research`, and `governance` blocking.
- Require evidence for `covered`; require rationale for `deferred` and `not_applicable`.

## Remaining Uncertainty

- Checklists can become too expensive if too detailed. The workflow therefore keeps items short and evidence-linked.

## Links

- https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery/tool-and-resources
- https://swehb.nasa.gov/display/SWEHBVC
- https://learn.microsoft.com/en-us/azure/Devops/pipelines/test/requirements-traceability?view=azure-devops
- https://www.atlassian.com/agile/project-management/definition-of-done
