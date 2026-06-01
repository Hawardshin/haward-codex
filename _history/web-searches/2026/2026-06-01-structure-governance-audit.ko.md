# 웹 검색 기록: 구조 거버넌스 감사

## 요청 요약

- 현재 저장소 구조에서 모순되거나 관리하기 불편한 부분이 발견되면 정리하고, 필요하면 폴더 구조와 관리 규칙을 개선한다.

## 검색어

- `monorepo folder structure best practices workspace tools docs projects boundaries`
- `docs as code repository structure documentation architecture decision records best practices`
- `GitLab Code Owners repository ownership path ownership docs`
- `Software Engineering at Google monorepo version control`
- 2차 점검: `monorepo repository structure project ownership documentation best practices codeowners docs-as-code`
- 2차 점검: `GitLab documentation site architecture project structure docs-as-code`
- 2차 점검: `Google monorepo source code repository structure ownership software engineering at Google`

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 이유 |
| --- | --- | --- | --- |
| Software Engineering at Google, Version Control and Branch Management, `https://abseil.io/resources/swe-book/html/ch16.html` | book | 2026-06-01 | monorepo가 여러 프로젝트를 한 저장소에서 관리할 때 tooling과 ownership이 필요하다는 배경 참고 |
| GitLab Docs, Code Owners, `https://docs.gitlab.com/user/project/codeowners/` | official | 2026-06-01 | path ownership과 책임 경계가 repository 안에서 드러나야 한다는 근거 |
| GitLab Docs, Documentation Site Architecture, `https://docs.gitlab.com/development/documentation/site_architecture/` | official | 2026-06-01 | documentation source와 generated documentation/site를 분리하는 방향 참고 |
| GitLab Handbook, Component Ownership Model, `https://handbook.gitlab.com/handbook/engineering/infrastructure-platforms/production/component-ownership-model/` | web source | 2026-06-01 | component ownership, clear boundaries, continuous validation의 운영 모델 참고 |
| Thoughtworks Technology Radar, `https://www.thoughtworks.com/en-us/radar` | web source | 2026-06-01 | 기술 선택과 운영 관행을 주기적으로 평가하고 adopt/trial/assess/caution으로 분리하는 사고방식 참고 |

## 약한 출처 처리

- Reddit 토론은 monorepo ownership과 boundary 실무 신호로는 참고할 수 있지만, 이 작업의 정책 근거로는 공식 문서와 책, handbook을 우선했다.
- 일반 블로그형 monorepo 글은 현재 저장소의 기존 정책과 직접 연결성이 낮아 보조 신호로만 취급했다.

## 계획에 반영한 내용

- 폴더를 대규모 이동하기보다 ownership/boundary를 더 명확히 하고 deterministic audit를 추가한다.
- root folder class를 `registered_project`, `reserved_operational`, `local_only`, `generated_output`으로 분리한다.
- `_private/`와 `outputs/`는 local-only로 명시하고 `.gitignore`로 보호한다.
- generated output과 durable artifact를 분리한다.
- workspace monitor가 구조 규칙 문서도 보여주게 한다.
- 2차 점검에서는 root folder뿐 아니라 등록된 프로젝트 내부 top-level folder가 registry에 설명되어 있는지 확인하도록 감사 범위를 넓혔다.
- `generated_output_dirs`에 선언된 pattern은 `.gitignore`와 동기화되어야 한다는 검증을 추가했다.

## 불확실성

- 현재 저장소 규모에서는 CODEOWNERS까지 추가하지 않아도 된다. 다만 프로젝트 수가 늘거나 외부 협업자가 생기면 CODEOWNERS 또는 유사 owner map을 검토할 수 있다.
- root project migration은 별도 migration plan 없이는 하지 않는 것이 안전하다.

## 공개 판단 요약

- 현재 구조의 핵심 개선은 폴더 이동이 아니라 root folder class, local-only 예외, generated artifact 정책, deterministic audit를 명확히 하는 것이다.
- 추가 개선은 프로젝트 내부 durable folder의 의미도 등록부에서 추적하고, generated output 예외를 정책과 ignore 규칙 양쪽에서 검증하는 것이다.
