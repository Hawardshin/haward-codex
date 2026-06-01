# 웹 검색 기록: Timekeeper Agent

- 날짜: 2026-06-02
- 작업 모드: `governance`
- 요청 요약: 기업의 timekeeper처럼 시간, 기간, 마감, “빨리 해야 한다”를 말하는 에이전트를 추가한다.

## 검색 쿼리

- `Scrum Guide timebox sprint daily scrum official timebox`
- `PMI project schedule management official schedule planning`
- `Atlassian project timeline timeboxing project management guide`
- `Microsoft Project project schedule critical path official documentation`
- `The Scrum Guide 2020 official timebox Daily Scrum 15 minutes Sprint Planning timebox`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| https://scrumguides.org/docs/scrumguide/v2020/2020-Scrum-Guide-US.pdf | Scrum 공식 가이드 | Scrum event가 timebox와 계획 조정 구조를 사용한다는 점 확인 | Timekeeper가 timebox와 checkpoint를 다루도록 반영 |
| https://www.scrum.org/resources/introduction-scrum-events | Scrum.org 공식/교육 자료 | Scrum event의 시간 제약과 focus 목적 확인 | timebox는 압박이 아니라 focus와 inspect/adapt 장치로 문서화 |
| https://support.microsoft.com/en-us/project/manage-your-project-s-critical-path | Microsoft 공식 문서 | critical path와 slack이 project finish date에 영향을 주는 방식 확인 | critical path, slack, schedule risk를 output contract에 포함 |
| https://www.atlassian.com/agile/project-management/project-schedule/ | Atlassian 프로젝트 관리 자료 | schedule은 work definition, sequencing, timeline, dependency를 통해 관리된다는 점 확인 | schedule brief에 dependency와 timeline view를 포함 |
| https://www.pmi.org/-/media/pmi/documents/public/pdf/certifications/practice-standard-scheduling.pdf | PMI scheduling standard PDF | schedule planning, resource planning, schedule model의 중요성 확인 | schedule baseline과 기간/자원 trade-off를 source lane에 반영 |

## 약한 출처 처리

- Reddit/커뮤니티 글은 실제 조직에서 timebox가 어떻게 해석되는지 볼 수 있지만, 공식 근거가 아니므로 이번 agent 계약에는 직접 근거로 쓰지 않았다.
- Wikipedia는 개념 확인에는 유용하지만 요구사항 근거로 사용하지 않았다.

## 계획 영향

- Timekeeper를 단순 잔소리 agent가 아니라 deadline, timebox, critical path, slack, schedule risk를 드러내는 운영 agent로 정의했다.
- “빨리”라는 말은 검증 생략이 아니라 scope/순서/병렬화/후속 개선 분리 선택지로 변환하도록 했다.
- 기존 `_tools/work-timer`와 coordination board를 재사용해 중복 도구를 만들지 않기로 했다.

## 불확실성

- 사용자가 원하는 구체적인 알림 주기, 마감 표현 방식, notification channel은 아직 정해지지 않았다.
- 실제 알림 발송은 기존 notification settings에 토큰/웹훅이 설정된 뒤 별도 작업으로 다룬다.
