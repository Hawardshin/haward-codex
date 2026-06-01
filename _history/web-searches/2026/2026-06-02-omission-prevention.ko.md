# 2026-06-02 누락 방지 웹 검색 기록

## 작업

- 요청: `UR-2026-06-02-011`
- 목적: 에이전트가 필수 항목을 빠뜨릴 수 있다는 위험을 어떤 운영 구조로 막을지 확인한다.
- 작업 모드: `governance`

## 검색어

- `WHO surgical safety checklist omissions checklist official evidence`
- `NASA software assurance requirements traceability verification official`
- `Atlassian definition of done agile checklist official`
- `site:learn.microsoft.com Azure DevOps requirements traceability Boards official`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| WHO Safe surgery Tool and Resources | 공식 | WHO Surgical Safety Checklist는 오류/부작용 감소와 팀 커뮤니케이션 개선을 목표로 만들었고, 각 항목을 기억에 의존하지 않고 확인하는 방식을 강조한다. | 누락 방지를 memory aid가 아니라 명시적 coverage checklist로 설계 |
| NASA Software Engineering and Assurance Handbook | 공식 | NASA handbook은 NPR/NASA-STD 요구사항 구현 guidance와 Requirements Mapping Matrix, 적용/비적용 justification 개념을 설명한다. | `covered`, `not_applicable`, `deferred`에 근거/이유를 요구 |
| Microsoft Learn Requirements traceability | 공식 | 요구사항 traceability는 개발 단계 간 관계를 문서화하고 test case, bug, code change와 연결하는 개념이다. | 요구사항/산출물/검증 연결을 `omission_check_targets`로 평가 입력에 연결 |
| Atlassian Definition of Done | 실무 가이드 | 작업별 completion checklist와 acceptance criteria/DoD 구분을 설명한다. | acceptance check와 artifact check를 분리 |

## 제외하거나 약하게 본 출처

- 일반 블로그의 체크리스트 글: 공식/준공식 자료보다 구체성이 낮아 이번 정책의 주 근거로 쓰지 않았다.
- 도구 vendor의 광고성 traceability 페이지: 특정 제품 판매 맥락이 강해 보조 근거로만 적합하다.

## 계획 반영

- `omission-guard-agent`를 새로 만들고, 작업별 JSON coverage record를 검사한다.
- `work-evaluator-agent`의 `TARGET_GAP_MESSAGES`에 `omission_check_targets`를 추가한다.
- `quick`은 advisory로 두고, `standard`, `ship_first`, `research`, `governance`는 blocking target으로 둔다.
- `covered`는 evidence를 요구하고, `deferred`/`not_applicable`은 rationale을 요구한다.

## 남은 불확실성

- 체크리스트가 너무 길어지면 운영 비용이 커질 수 있다. 그래서 항목은 짧고 증거 중심으로 작성하도록 제한했다.

## 참고 링크

- https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery/tool-and-resources
- https://swehb.nasa.gov/display/SWEHBVC
- https://learn.microsoft.com/en-us/azure/Devops/pipelines/test/requirements-traceability?view=azure-devops
- https://www.atlassian.com/agile/project-management/definition-of-done
