# Timekeeper Agent 조사 노트

- 날짜: 2026-06-02
- 목적: 작업 시간, 마감, 기간, timebox, critical path를 말해주는 에이전트의 근거와 설계 원칙을 정리한다.

## 핵심 결론

- Timekeeper는 압박자가 아니라 schedule observability 담당자다.
- timebox는 일을 대충 끝내라는 뜻이 아니라 focus, inspect/adapt, decision cadence를 만드는 장치다.
- critical path와 slack은 마감에 영향을 주는 작업을 구분하는 데 필요하다.
- “빨리”는 검증 생략이 아니라 scope 축소, 병렬화, ship-first, 후속 개선 분리로 변환해야 한다.
- 시간 기록은 productivity score가 아니라 병목 후보를 찾기 위한 운영 관측성이다.

## 재사용 규칙

- 작업 시작 시 deadline, time budget, quality floor, checkpoint cadence를 확인하거나 가정으로 기록한다.
- 시간 추정은 정확한 측정과 구분한다.
- schedule risk는 `green`, `yellow`, `red`로 표현한다.
- `red`에서는 최소 산출물, 미룰 항목, 알림 또는 human decision inbox 연결을 제안한다.
- 검증, 보안, 데이터 손실 방지, resource/CLI/installation gate는 urgency로 생략하지 않는다.

## 참고 출처

- Scrum Guide 2020: https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf
- Scrum.org Scrum Events: https://www.scrum.org/resources/introduction-scrum-events
- Microsoft Project Critical Path: https://support.microsoft.com/en-us/project/manage-your-project-s-critical-path
- Atlassian Project Schedule Guide: https://www.atlassian.com/agile/project-management/project-schedule/
- PMI Practice Standard for Scheduling: https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf
