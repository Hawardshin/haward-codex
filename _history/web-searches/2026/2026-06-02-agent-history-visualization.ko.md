# 에이전트/히스토리 시각화 웹 검색 기록

## 요청

에이전트들이 무엇이 있는지와 히스토리를 시각화해달라는 요청.

## 검색어

- `OpenTelemetry observability dashboard traces timeline official documentation`
- `GitHub Actions visualization workflow graph timeline official docs`
- `Datadog dashboard timeline events visualization documentation`
- `Grafana dashboard annotations timeline visualization official docs`

## 확인한 출처

- Grafana State timeline: 상태가 시간에 따라 바뀌는 데이터를 timeline으로 보여주는 패턴 확인.
- Grafana Annotations: 시각화에 이벤트를 표시하는 패턴 확인.
- OpenTelemetry Observability primer/docs: 관측 데이터를 traces, metrics, logs처럼 구분하는 기본 관점 확인.
- Datadog Dashboards docs: dashboard widget과 event timeline/overlay 같은 운영 UI 패턴 확인.

## 계획 반영

- 실시간 서버를 추가하지 않고 정적 snapshot에 agent/history 관측 데이터를 넣는다.
- 히스토리는 날짜별 density chart와 유형별 bar로 표현한다.
- 에이전트는 config inventory와 coordination runtime 상태를 합쳐 구성 맵으로 표현한다.
- 새 chart dependency는 설치하지 않고 CSS 기반 bar/density chart를 사용한다.

## 제외한 약한 출처

- Reddit과 일반 블로그는 참고 신호로만 보고, 설계 근거는 공식 observability/dashboard 문서를 우선했다.

## 남은 불확실성

- 실제 agent runtime tracing이 필요해지면 OpenTelemetry식 trace model을 별도 설계해야 한다.
