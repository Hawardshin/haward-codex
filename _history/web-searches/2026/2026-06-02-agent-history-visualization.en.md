# Agent/History Visualization Web Search Record

## Request

The user asked to visualize which agents exist and visualize history.

## Queries

- `OpenTelemetry observability dashboard traces timeline official documentation`
- `GitHub Actions visualization workflow graph timeline official docs`
- `Datadog dashboard timeline events visualization documentation`
- `Grafana dashboard annotations timeline visualization official docs`

## Sources Checked

- Grafana State timeline: checked patterns for showing state changes over time.
- Grafana Annotations: checked event markers on visualizations.
- OpenTelemetry Observability primer/docs: checked the basic separation of observable data into traces, metrics, and logs.
- Datadog Dashboards docs: checked dashboard widget and event timeline/overlay patterns.

## Plan Impact

- Add agent/history observability data to the static snapshot instead of adding a real-time server.
- Show history through date density and category bars.
- Show agents through config inventory merged with coordination runtime state.
- Avoid a new chart dependency and use CSS-based bar/density charts.

## Weak Sources Ignored

- Reddit and general blogs were treated only as discovery signals; official observability/dashboard docs were used as design references.

## Remaining Uncertainty

- If real agent runtime tracing becomes necessary, an OpenTelemetry-style trace model should be designed separately.
