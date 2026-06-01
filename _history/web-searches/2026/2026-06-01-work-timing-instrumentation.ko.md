# 2026-06-01 작업 시간과 병목 기록 웹 검색

## 사용자 요청

- 각 작업에서 어디에서 병목이 있는지 쉽게 알 수 있도록 걸리는 시간을 기록하라는 요청.

## 검색어

- `OpenTelemetry traces spans latency bottleneck analysis official documentation`
- `Google SRE book monitoring distributed systems latency saturation errors traffic official`
- `DORA metrics lead time deployment frequency official DevOps Research Assessment`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| OpenTelemetry Tracing API | official docs | 작업을 root span과 sub-span으로 나누어 timing과 속성을 기록하는 모델 | 작업을 phase span으로 기록하는 schema 설계에 반영 |
| Google SRE Book - Monitoring Distributed Systems | official book/docs | latency가 관찰 가능한 핵심 신호이며, 측정과 진단을 분리해야 함 | phase duration과 bottleneck note를 분리 |
| DORA software delivery performance metrics | official guide | lead time 같은 workflow-level 측정으로 개선 대상을 파악 | 작업 단위 timing target을 evaluator close-out에 연결 |

## 제외하거나 약하게 본 출처

- 일반 vendor 블로그와 Reddit 토론은 이번 정책의 주 근거로 쓰지 않았다. adoption/실무 신호로는 유용하지만, schema와 운영 규칙은 official/reference 자료만으로 충분했다.

## 계획 반영

- 총 소요시간 하나가 아니라 phase별 duration을 저장한다.
- false precision을 피하기 위해 `measurement_quality=partial`과 `measurement=not_measured`를 허용한다.
- slowest phase를 자동 결론이 아니라 병목 후보로 표시하고 `bottleneck_notes`를 요구한다.
- `timing_summary_targets`를 평가 입력에 포함시켜 기록 누락을 막는다.

## 남은 불확실성

- 실제 작업이 누적되기 전까지 threshold 값은 초기 운영값이다. 몇 주간 기록이 쌓이면 phase threshold와 standard phases를 조정해야 한다.
