# Plan Evidence: Timekeeper Agent

## 결정

- Timekeeper는 `agent-platform`의 reusable domain agent로 구현한다.
- 기존 `_tools/work-timer`와 coordination board를 재사용한다.
- 실제 알림 발송, 캘린더 연동, 새 시간 측정 런타임은 이번 범위에서 제외한다.
- urgency는 검증 생략이 아니라 schedule trade-off로 처리한다.

## 근거

- 사용자의 요청은 “기업에서 매번 시간을 말하는 사람”이라는 명확한 역할 요청이다.
- 이미 `REQ-WS-039`와 `_tools/work-timer`가 있으므로 새 도구보다 agent policy로 승격하는 편이 유지보수에 맞다.
- Scrum timebox, Microsoft critical path, Atlassian scheduling, PMI scheduling 자료는 deadline, timebox, dependency, slack, resource trade-off를 분리해 볼 근거를 제공한다.

## 대안

- 새 `time-tracker` 도구 구현: 기존 work-timer와 중복이라 제외했다.
- 실제 알림 발송까지 구현: 토큰/웹훅과 채널 정책이 필요하므로 후속 작업으로 둔다.
- 생산성 점수화: 사용자의 목표는 작업 시간 절약과 병목 가시화이지 사람 평가가 아니므로 제외했다.
