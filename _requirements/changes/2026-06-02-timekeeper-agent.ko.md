# 요구사항 변경: Timekeeper Agent

- 날짜: 2026-06-02
- 변경 ID: `REQ-WS-064`
- 요청 ID: `UR-2026-06-02-022`
- 작업 모드: `governance`

## 변경 내용

기업에서 시간, 마감, 기간, “빨리 해야 한다”를 계속 말하는 Timekeeper 역할을 `timekeeper-agent`로 추가했다.

## 이유

플랫폼은 반복 작업을 줄이고 시간을 아끼기 위한 구조다. 이미 phase timing과 병목 기록은 있지만, 작업 도중 deadline risk, critical path, timebox, hurry-up trade-off를 계속 말해주는 agent가 필요하다.

## 영향

- `agent-platform/configs/agents/timekeeper-agent.json`을 추가한다.
- 기존 `_tools/work-timer`를 재사용한다.
- urgency가 검증 생략으로 흐르지 않도록 안전 정책을 명시한다.
