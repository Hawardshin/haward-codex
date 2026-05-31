# 2026-05-31 작업 모드 라우팅 웹 검색 기록

## 질문

매번 전체 운영 루프를 돌지 않고 작업 성격에 따라 가볍게 처리하거나, 먼저 구현하고 개선은 뒤로 뺄 수 있는 운영 구조를 어떻게 설계할지 조사했다.

## 검색어

- `risk based software development process lightweight governance agile compliance mode workflow`
- `progressive delivery progressive assurance software development governance risk based review process`
- `GitHub flow lightweight branching small changes documentation review process official`
- `Google engineering practices code review small changes official`
- `Atlassian technical debt agile backlog official`
- `Thoughtworks evolutionary architecture fitness functions official`

## 확인한 출처

| 출처 | 유형 | 확인일 | 사용한 근거 |
| --- | --- | --- | --- |
| Google Engineering Practices - Small CLs, https://google.github.io/eng-practices/review/developer/small-cls.html | official | 2026-05-31 | 작은 변경은 리뷰와 품질 관리 비용을 줄인다는 근거 |
| GitHub Docs - GitHub Flow, https://docs.github.com/en/get-started/using-github/github-flow | official | 2026-05-31 | lightweight branch workflow, isolated complete commits, commit/push feedback 흐름 |
| Atlassian - Technical Debt, https://www.atlassian.com/agile/technical-debt | official | 2026-05-31 | 빠른 선택의 미래 비용과 backlog에서 관리해야 하는 개선 항목 근거 |
| Thoughtworks - Microservices as an Evolutionary Architecture, https://www.thoughtworks.com/en-us/insights/blog/microservices-evolutionary-architecture | technology article | 2026-05-31 | fitness function처럼 지속 피드백으로 구조를 진화시키는 관점 |

## 제외하거나 약하게 본 출처

- Reddit 토론: 실제 팀 경험 신호로는 유용하지만 정책 근거로 단독 사용하지 않았다.
- Wikipedia 항목: 개념 확인에는 가능하지만 저장소 운영 규칙 근거로는 공식/전문 출처보다 낮게 보았다.
- Marketplace/제품 홍보 페이지: 특정 도구 홍보 성격이 강해 정책 근거에서 제외했다.

## 계획 반영

- Google/ GitHub 근거를 반영해 작은 작업은 `quick` 모드로 분리하고, 기존 풀 루프보다 작은 단위 검증과 commit/push 흐름을 우선했다.
- Atlassian technical debt 근거를 반영해 `ship_first`에서 뒤로 뺀 개선은 `_ops/backlog/deferred-improvements.ko.md`에 명시적으로 남기도록 했다.
- Thoughtworks의 fitness function 관점을 반영해 모드 기준 자체도 실제 사용 후 backlog 항목으로 다시 조정할 수 있게 했다.

## 불확실성

- 이 저장소의 작업량과 위험도는 실제 사용 데이터가 아직 적다. `quick`과 `ship_first` 기준은 몇 차례 작업 후 조정이 필요할 수 있다.

## 공개 판단 요약

전체 루프를 제거하지 않고 모드별로 강도를 나누는 것이 가장 적합하다. 기본은 `standard`로 유지해 기존 안전성을 보존하고, `quick`/`ship_first`/`research`는 필요한 근거와 검증만 blocking으로 둔다.
