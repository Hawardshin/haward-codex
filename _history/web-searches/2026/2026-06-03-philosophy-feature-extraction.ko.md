# 웹 검색 기록: 철학 기반 기능 추출 구조

## 목적

- 사용자의 철학 원칙을 제품 기능, 요구사항, 검증 구조로 변환할 때 참고할 외부 기준을 확인했다.

## 검색

- `principles to product requirements traceability design system product strategy official guide`
- `human centered design principles translate values into product features requirements`
- `ISO 9241-210 human-centred design principles requirements official`
- `requirements traceability from stakeholder values to features software engineering`
- `NIST AI Risk Management Framework govern map measure manage official`
- `NASA systems engineering handbook requirements traceability stakeholder expectations official`
- `USWDS design principles official values product decisions`

## 확인한 강한 출처

| 출처 | 신뢰도 | 이번 계획 영향 |
| --- | --- | --- |
| NIST AI Risk Management Framework, https://www.nist.gov/itl/ai-risk-management-framework | official framework | 원칙을 govern/map/measure/manage 같은 반복 가능한 운영 기능으로 만드는 방향을 뒷받침했다. |
| NASA Systems Engineering Handbook, https://www.nasa.gov/reference/system-engineering-handbook/ | official handbook | stakeholder expectation을 요구사항과 검증으로 추적하는 관점을 적용했다. |
| USWDS Design Principles, https://designsystem.digital.gov/design-principles/ | official docs | 제품/디자인 결정이 명시적 원칙을 따라야 한다는 관점을 UI 패널에 반영했다. |
| ISO 9241-210 human-centred design concept pages and summaries | standard reference | 인간중심 설계에서 context, requirements, evaluation loop가 중요하다는 방향을 확인했다. |

## 약한 출처 처리

- 일반 블로그와 vendor 마케팅 글은 기능 구조 결정 근거로 쓰지 않았다.
- 검색 결과 자체를 답으로 쓰지 않고, repository philosophy와 기존 capability promotion 구조를 우선 근거로 삼았다.

## 계획 영향

- 단순 철학 문서 보강이 아니라 `philosophy-feature-extraction-registry.json`와 `check-philosophy-features`를 만드는 쪽으로 결정했다.
- 철학 원칙 전체가 feature flow에 포함되는지 deterministic checker로 검증한다.
- UI는 내부 superadmin/developer surface로 두고, customer snapshot에서는 내부 후보를 제거한다.
