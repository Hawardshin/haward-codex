# 웹 검색 기록: 넓은 범위 작업 지시

## 목적

사용자가 “범위가 넓다고 두려워하지마”라고 지시해, 넓은 변경을 회피하지 않되 안전하게 다루는 원칙을 지속 지시에 반영하기 전 외부 근거를 확인했다.

## 검색어

- `official engineering guide large scale change incremental rollout software engineering`
- `Google SRE large scale change management incremental rollout risk mitigation`
- `software engineering large scope task decomposition official guide`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 반영 |
| --- | --- | --- | --- |
| Google SRE Infrastructure Change Management: https://sre.google/resources/practices-and-processes/infrastructure-change-management/ | 공식/실무 자료 | 큰 변경은 coordination, documentation, risk identification, monitoring, progress tracking이 필요하다. | 넓은 범위를 회피가 아니라 분해/검증/추적 문제로 표현했다. |
| Google SRE Reliable Product Launches: https://sre.google/sre-book/reliable-product-launches/ | 공식 SRE book | 큰 launch는 단계적 launch와 risk 최소화 pattern으로 다룬다. | bounded slice와 merge gate 원칙을 유지했다. |
| Google SRE Canarying Releases: https://sre.google/workbook/canarying-releases/ | 공식 SRE workbook | 자동화된 release와 작은 범위 검증은 위험 완화에 도움이 된다. | rollback boundary와 검증 gate를 넓은 작업 원칙에 포함했다. |
| Microsoft Research Safe Velocity: https://www.microsoft.com/en-us/research/publication/safe-velocity-a-practical-guide-to-software-deployment-at-scale-using-controlled-rollout/ | 연구/실무 논문 | 대규모 변경은 controlled rollout으로 안전성과 속도를 함께 관리할 수 있다. | “넓어서 축소”가 아니라 “통제된 진행”으로 기록했다. |
| NASA Logical Decomposition: https://www.nasa.gov/reference/4-3-logical-decomposition/ | 공식 시스템 엔지니어링 자료 | 상위 요구를 기능 분석과 논리 분해로 하위 요구에 배분한다. | large-scope decomposition 규칙과 연결했다. |

## 공개 판단 요약

검색 결과는 넓은 범위를 피하라는 방향이 아니라, 큰 변경을 분해, 단계화, 검증, 관측, rollback 경계로 관리하라는 방향으로 수렴했다. 따라서 지속 지시는 “범위가 넓다는 이유만으로 회피하거나 임의 축소하지 말고, bounded slice와 merge gate를 통해 실제 목표까지 진행한다”로 반영했다.
