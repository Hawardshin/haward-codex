# Requirements Management Lifecycle

## Question

What structure is needed to turn user work and instructions into requirements, then carry them through revision, review, implementation, and evaluation?

## Checked Sources

| Source | Type | Checked | Use |
| --- | --- | --- | --- |
| [NASA: Requirements Management](https://www.nasa.gov/reference/6-2-requirements-management/) | official docs | 2026-05-31 | Used for baseline, change request, bidirectional traceability, impact assessment, and verification/review principles. |
| [IBM Engineering Requirements Management DOORS traceability](https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/doors/9.7.2?topic=information-traceability) | official docs | 2026-05-31 | Used for maintaining trace relationships between requirements and related information. |
| [Atlassian: requirements traceability matrix](https://www.atlassian.com/agile/product-management/requirements-traceability-matrix) | practice article | 2026-05-31 | Used for a table structure linking requirements to implementation artifacts, verification, and status. |
| [Reqtest: Requirements Traceability Matrix](https://reqtest.com/requirements-blog/requirements-traceability-matrix/) | practice article | 2026-05-31 | Used for row-level traceability and coverage-gap checks. |
| [GNU Coding Standards: Change Logs](https://www.gnu.org/prep/standards/html_node/Change-Logs.html) | official/standard docs | 2026-05-31 | Used for the operating principle that changes should remain findable later. |

## Insights

- Requirements need stable IDs, status, source request, verification method, and linked artifacts.
- Requirements should be split into baselines, change records, and review records rather than kept as a single loose document.
- Close-out evaluation should check requirements targets; otherwise the criterion between request summary and implementation can be missing.
- Markdown is sufficient for the current scale. If requirements volume grows, an indexing or coverage-check tool under `_tools/` is a good candidate.

## Application

- Added `_requirements/`.
- Added `requirements-manager-agent` plus a requirements lifecycle prompt and workflow.
- Added `requirements_targets` to `work-evaluator-agent`.
