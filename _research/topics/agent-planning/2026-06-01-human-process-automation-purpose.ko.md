# 연구 노트: 인간 프로세스 자동화 목적

## 요약

플랫폼의 목적은 자동화 수를 늘리는 것이 아니라 사람의 반복 작업과 시간을 줄이는 것이다. 좋은 자동화 후보는 반복적이고, 관찰 가능하며, 재현 가능한 절차로 설명할 수 있고, 검증과 rollback 경계를 가질 수 있어야 한다.

## 핵심 인사이트

- Google SRE의 toil 개념은 반복적이고 자동화 가능한 수작업이 시간이 지날수록 팀의 역량을 잠식할 수 있음을 보여준다.
- SRE workbook은 반복 작업을 정량화하고 작은 proof of concept부터 개선할 수 있다는 실용적 접근을 제시한다.
- IBM LiveAction 연구는 사용자가 자신의 반복 행동을 잘 인식하지 못할 수 있으므로, 자동화 후보를 찾으려면 실제 작업 흔적과 실행 절차를 관찰해야 한다는 점을 시사한다.
- RPA와 process/task mining 자료는 인간이 실제로 수행한 업무 흐름을 모델링하고, 병목과 자동화 가능 지점을 찾아 개선하는 구조를 제공한다.

## 플랫폼 적용 원칙

- 반복이 보이면 먼저 사람이 하는 순서를 적는다.
- 자동화 후보는 `빈도`, `소요 시간`, `오류 위험`, `재현 가능성`, `검증 가능성`, `rollback 가능성`으로 판단한다.
- 자동화 단위는 가능한 한 작게 시작한다: prompt, workflow, template, tool, skill, agent, project feature 순으로 필요한 만큼만 승격한다.
- 자동화가 인간 판단을 숨기면 안 된다. 판단 지점은 명시하고, 가능한 경우 검증 결과와 사용자 확인 지점을 남긴다.
- 실제 효과는 `_history/work-timings/`와 evaluator 결과로 누적 검토한다.

## 재사용 가치

이 노트는 앞으로 새 도구/스킬/에이전트를 만들지 판단할 때 “멋진 기능인가”가 아니라 “반복과 시간을 줄이는가”를 묻는 기준으로 재사용한다.

## 출처

- https://sre.google/sre-book/eliminating-toil/
- https://sre.google/workbook/eliminating-toil/
- https://research.ibm.com/publications/liveaction-automating-web-task-model-generation
- https://www.ibm.com/think/topics/rpa
- https://learn.microsoft.com/en-us/power-automate/process-advisor-overview
