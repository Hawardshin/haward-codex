# Request-To-Outcome Trace References

## Question

What structure keeps user requests connected to actual work outcomes over time?

## Sources Checked

| Source | Type | Checked | Use |
| --- | --- | --- | --- |
| [IBM Engineering Requirements Management DOORS traceability](https://www.ibm.com/docs/en/engineering-lifecycle-management-suite/doors/9.7.2?topic=information-traceability) | official docs | 2026-05-31 | Used the concept of tracing relationships among requirements and related information. |
| [Atlassian: requirements traceability matrix](https://www.atlassian.com/agile/product-management/requirements-traceability-matrix) | practice article | 2026-05-31 | Used the matrix structure that links requirements to artifacts, verification, and status. |
| [Reqtest: Requirements Traceability Matrix](https://reqtest.com/requirements-blog/requirements-traceability-matrix/) | practice article | 2026-05-31 | Used row-level tracing and coverage checking patterns. |
| [GNU Coding Standards: Change Logs](https://www.gnu.org/prep/standards/html_node/Change-Logs.html) | official/standards docs | 2026-05-31 | Used the principle that records should preserve why changes happened and what they affected. |

## Insights

- Request summaries explain "what was wanted".
- Work summaries explain "what was done".
- Request-to-outcome traces connect both and explain "how the request closed".
- Stable request IDs are needed to link work, evaluations, and commits over time.

## Application

- Added `_history/request-traces/`.
- Connected the 35 accumulated 2026-05-31 requests in a request-to-outcome trace table.
- Added `request_trace_targets` to `work-evaluator-agent`.
