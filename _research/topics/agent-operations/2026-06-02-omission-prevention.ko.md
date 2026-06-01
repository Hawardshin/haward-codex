# 2026-06-02 누락 방지 운영 노트

## 요약

에이전트가 필수 항목을 빠뜨릴 수 있다는 문제는 "더 잘 기억하라"가 아니라 종료 전에 item-level coverage를 강제하는 구조로 다루는 것이 적합하다.

## 재사용 인사이트

- 체크리스트는 반복 작업에서 누락을 줄이기 위해 기억 의존을 줄이는 장치다.
- 요구사항 traceability는 요구사항과 테스트/코드/버그/검증 사이의 누락된 연결을 찾는 데 유용하다.
- Definition of Done과 acceptance criteria는 역할이 다르다. 플랫폼에서는 산출물 존재 여부와 acceptance check를 분리하는 편이 유지보수에 좋다.
- `quick` 작업까지 모든 coverage를 강제하면 속도 장점이 사라진다. 단, non-`quick` 작업은 누락 비용이 크므로 blocking gate가 맞다.

## 플랫폼 적용

- `omission-guard-agent`는 작업별 coverage record를 검사한다.
- `work-evaluator-agent`는 non-`quick` 모드에서 `omission_check_targets`를 요구한다.
- `covered`에는 evidence, `deferred`/`not_applicable`에는 rationale이 필요하다.

## 출처

- WHO Safe surgery Tool and Resources: https://www.who.int/teams/integrated-health-services/patient-safety/research/safe-surgery/tool-and-resources
- NASA Software Engineering and Assurance Handbook: https://swehb.nasa.gov/display/SWEHBVC
- Microsoft Learn Requirements traceability: https://learn.microsoft.com/en-us/azure/Devops/pipelines/test/requirements-traceability?view=azure-devops
- Atlassian Definition of Done: https://www.atlassian.com/agile/project-management/definition-of-done
