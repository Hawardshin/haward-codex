# Source Provenance: Timekeeper Agent

| 값/판단 | 출처 | 출처 유형 | 적용 방식 |
| --- | --- | --- | --- |
| timebox는 focus와 계획 조정을 돕는다 | https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf | 공식 Scrum Guide | Timekeeper output에 timebox와 checkpoint 포함 |
| timebox는 event purpose가 달성되면 짧게 끝낼 수 있는 focus 장치다 | https://www.scrum.org/resources/introduction-scrum-events | Scrum.org 자료 | Timekeeper를 단순 압박자가 아니라 focus/cadence 역할로 정의 |
| critical path와 slack은 finish date risk 판단에 중요하다 | https://support.microsoft.com/en-us/project/manage-your-project-s-critical-path | Microsoft 공식 문서 | critical path, slack, schedule risk를 agent output contract에 포함 |
| schedule은 task definition, sequencing, timeline, dependency를 포함한다 | https://www.atlassian.com/agile/project-management/project-schedule/ | Atlassian 자료 | dependency와 timeline view를 Timekeeper brief에 포함 |
| scheduling practice는 schedule model과 resource planning을 다룬다 | https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf | PMI 자료 | deadline, duration, resource/scope trade-off 근거로 사용 |
| 기존 workspace는 phase timing을 `_tools/work-timer`로 관리한다 | `_tools/work-timer/configs/work-timing-policy.json` | 내부 설정 | 중복 도구 생성 대신 Timekeeper가 work-timer를 사용 |
