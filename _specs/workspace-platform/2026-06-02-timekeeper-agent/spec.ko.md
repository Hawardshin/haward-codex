# Spec: Timekeeper Agent

## 목표

플랫폼에 `timekeeper-agent`를 추가해 작업 시간, 마감, timebox, critical path, schedule risk, 병목, 다음 checkpoint, 빨리 하기 위한 trade-off를 계속 보이게 한다.

## 요구사항

- `REQ-WS-039`
- `REQ-WS-060`
- `REQ-WS-064`

## 범위

- 포함:
  - `timekeeper-agent` spec
  - 한/영 문서
  - 요구사항/스펙/검색/계획/평가/요청 추적 기록
  - 기존 `_tools/work-timer`, coordination board, notification settings와의 연결
  - urgency가 품질/안전 게이트를 우회하지 못하게 하는 정책
- 제외:
  - 새로운 시간 추적 런타임 구현
  - 캘린더, Slack, Discord, Teams 실제 알림 발송
  - 작업자 성과 평가용 productivity score

## 성공 기준

- `timekeeper-agent`가 agent registry에서 inspect/list 가능하다.
- 작업 시간 압박을 schedule risk와 trade-off로 바꿔 말하는 정책이 문서화된다.
- 기존 work-timer와 coordination board를 중복 구현하지 않고 연결한다.
- Timekeeper가 검증 생략이 아니라 scope/순서/병렬화/후속 개선 분리를 제안하도록 한다.
