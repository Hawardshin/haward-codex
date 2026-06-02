# 웹 검색 기록: Unified Ops Timeline

## 요청

- 히스토리 구조들과 모니터링 표면을 하나로 합치는 구현 방향을 잡는다.

## 검색

- `OpenTelemetry observability logs metrics traces official documentation unified telemetry`
- `CNCF observability definition metrics logs traces events official`
- `event sourcing pattern audit log monitoring dashboard official documentation`

## 확인한 출처

- OpenTelemetry Documentation: https://opentelemetry.io/docs/
- OpenTelemetry Signals: https://opentelemetry.io/docs/concepts/signals/
- OpenTelemetry Logs Specification: https://opentelemetry.io/docs/specs/otel/logs/
- CNCF observability article: https://www.cncf.io/blog/2022/04/27/are-the-three-pillars-of-observability-still-relevant/

## 반영

- logs/metrics/traces/events를 별도 탭에 흩뿌리는 대신 공통 context와 source attribution으로 상관관계화하는 방향을 참고했다.
- 이번 구현은 외부 telemetry backend가 아니라 repository-local `unifiedOps` event stream으로 한정했다.
- 기존 `historyDays`, `documents`, `collaborationBoard` drill-down은 유지하고, 상위 통합 stream을 추가했다.

## 불확실성

- 실제 실시간 telemetry 수집은 별도 backend 또는 OpenTelemetry SDK 도입 후 검토해야 한다.
