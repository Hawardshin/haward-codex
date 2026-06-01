# 웹 검색 기록: 인간 프로세스 자동화 목적

## 검색 목적

사용자가 플랫폼의 본질을 “사람의 반복 작업을 계속 줄이고, 효율적인 방법을 만들고, 시간을 줄이며, 인간과 최대한 유사한 프로세스를 찾아 자동화하는 것”으로 정의했으므로, 이 목적을 durable rule로 승격하기 전에 반복 작업 자동화와 인간 프로세스 모델링에 관한 강한 근거를 확인했다.

## 검색 일시

- 날짜: 2026-06-01
- 작업 모드: `governance`

## 검색 쿼리

- `software engineering automate repetitive work reduce toil human process automation official Google SRE toil`
- `human centered automation human in the loop process automation research repetitive work efficiency`
- `robotic process automation automating repetitive tasks business processes overview official`
- `workflow automation reduce repetitive manual tasks knowledge work research`
- `Google SRE workbook Automating Toil`
- `site:microsoft.com power automate process mining task mining process mining`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| Google SRE Book, “Eliminating Toil”, https://sre.google/sre-book/eliminating-toil/ | 공식/기술 서적 | Toil을 manual, repetitive, automatable, tactical, enduring value가 적은 작업으로 정의하고, 반복 작업을 줄여 engineering work에 시간을 쓰는 원칙을 설명한다. | 반복 작업 감소와 시간 절감을 플랫폼 목적의 근거로 사용 |
| Google SRE Workbook, “Eliminating Toil”, https://sre.google/workbook/eliminating-toil/ | 공식/워크북 | 반복 작업을 식별, 정량화, 위험/ROI와 함께 개선하고 작은 proof of concept부터 시작할 수 있다고 설명한다. | 자동화 후보를 측정, 위험, 작은 단위 승격과 연결 |
| IBM Research, “LiveAction: Automating web task model generation”, https://research.ibm.com/publications/liveaction-automating-web-task-model-generation | 연구 논문 요약 | 사용자는 자동화 가능한 반복 작업을 인식하지 못할 수 있고, 실제 웹 사용 데이터에는 반복 행동이 존재하며 task model을 자동 생성할 수 있다고 설명한다. | 인간 프로세스를 관찰하고 모델링해야 한다는 근거로 사용 |
| IBM, “What is robotic process automation?”, https://www.ibm.com/think/topics/rpa | 공식 설명 | RPA는 인간 작업자의 반복 사무 작업을 소프트웨어가 수행하고, 스크립트가 인간 프로세스를 모방해 여러 시스템에서 작업을 실행한다고 설명한다. | 반복 업무를 인간 프로세스 모델과 자동화 자산으로 연결 |
| Microsoft Learn, “Overview of process mining and task mining in Power Automate”, https://learn.microsoft.com/en-us/power-automate/process-advisor-overview | 공식 문서 | process mining/task mining은 실제 프로세스를 이해하고, desktop task를 관찰해 bottleneck, mistake, automation opportunity를 찾는다고 설명한다. | 작업 시간/병목 기록과 자동화 후보 발굴을 연결 |

## 약한 출처와 제외

- 일반 SEO성 workflow automation 글은 원칙을 강화할 만큼 구체적이지 않아 제외했다.
- vendor 랜딩 페이지는 표현 참고로만 보고, 요구사항 근거는 공식 문서와 연구 자료에 제한했다.

## 계획 영향

- 플랫폼 목적을 `REQ-WS-045`로 기준선화했다.
- 자동화 후보는 “만들 수 있는가”보다 “반복과 시간을 줄이는가”로 판단하도록 capability governance를 보강했다.
- 인간 프로세스 자동화는 인간 판단, 검증, rollback 경계를 보존해야 한다는 제한을 함께 반영했다.
- memory bootstrap에 반복 작업 감소와 인간 프로세스 자동화 목적을 warm anchor로 추가했다.

## 불확실성

- 반복 감소와 시간 절감 효과는 작업마다 다르므로, 앞으로는 `_history/work-timings/`와 evaluator 결과를 쌓아 실제 병목과 개선 효과를 확인해야 한다.
- 인간 프로세스 관찰은 privacy와 권한 경계를 침해하지 않는 범위에서 문서화된 작업 절차와 사용자가 제공한 실행 맥락을 기준으로 해야 한다.
