# 2026-06-01 Work Timing And Bottleneck Records Web Search

## User Request

- Record task duration so it is easy to see where each task bottleneck occurs.

## Queries

- `OpenTelemetry traces spans latency bottleneck analysis official documentation`
- `Google SRE book monitoring distributed systems latency saturation errors traffic official`
- `DORA metrics lead time deployment frequency official DevOps Research Assessment`

## Sources Checked

| Source | Type | Checked Content | Impact |
| --- | --- | --- | --- |
| OpenTelemetry Tracing API | official docs | Work can be represented as a root span with sub-spans carrying timing and attributes | Shaped the phase-span timing schema |
| Google SRE Book - Monitoring Distributed Systems | official book/docs | Latency is a core observable signal, and measurement should stay separate from diagnosis | Separated phase duration from bottleneck notes |
| DORA software delivery performance metrics | official guide | Workflow-level lead-time measurement helps identify improvement areas | Connected timing records to evaluator close-out targets |

## Weak Sources Ignored

- General vendor blogs and Reddit discussions were not used as primary policy evidence. They can provide adoption or practice signals, but official/reference sources were sufficient for the schema and operating rules.

## Plan Impact

- Store phase durations instead of only total task duration.
- Allow `measurement_quality=partial` and `measurement=not_measured` to avoid false precision.
- Show the slowest phase as a bottleneck candidate, not an automatic conclusion, and require `bottleneck_notes`.
- Include `timing_summary_targets` in evaluator input to prevent missed timing records.

## Remaining Uncertainty

- Threshold values are initial operating defaults until real task timing records accumulate. After several weeks, phase thresholds and standard phases should be tuned from observed data.
