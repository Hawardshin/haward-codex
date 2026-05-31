# 계획 히스토리: 코드 참고 조사 강화

## 초기 요청

- "당연히 소스 코드를 짜는 에이전트를 할 때는 조사 및 오픈소스의 구조나 잘짠 코드들을 참고하기도 해야지."

## 계획 목적

- 코딩 에이전트가 문서만 보고 구현하지 않도록, 실제 오픈소스 구조와 참고 구현, 잘 작성된 코드/테스트를 조사하도록 강제한다.
- 참고한 코드와 배운 점을 설정과 결과에 남겨 추적 가능하게 한다.

## 검색 질문

- 소스 코드 작성 전에 오픈소스 저장소와 reference implementation을 어떻게 조사해야 하는가?
- 코드 검색과 repository search는 코딩 조사에서 어떤 역할을 하는가?
- 참고한 코드 구조와 결정 근거를 어떻게 기록해야 하는가?

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Public Code Repository Best Practices | https://ospo.library.jhu.edu/learn-grow/public-code-repository-best-practices/ | 공개 코드 저장소 품질 신호 |
| CodeHow, Microsoft Research | https://www.microsoft.com/en-us/research/publication/codehow-effective-code-search-based-on-api-understanding-and-extended-boolean-model/ | API 이해 기반 코드 검색 |
| AWS ADR best practices | https://aws.amazon.com/blogs/architecture/master-architecture-decision-records-adrs-best-practices-for-effective-decision-making/ | 구현 전 결정 기록 |
| ADR examples repository | https://github.com/architecture-decision-record/architecture-decision-record | 코드 구조 결정과 문서화 사례 |
| 기존 coding research checker | `agent-platform/src/agent_platform/planning/coding_research.py` | 기존 readiness 규칙 |

## 계획 단계

- `coding-research-agent` 입력에 `code_reference_sources`, `code_reference_notes` 추가
- `complete-coding-research`에서 code/repository/source channel과 코드 참고 기록을 요구
- `reference_implementation` source type 추가
- coding research template, docs, prompt, workflow, report template, source collection policy 갱신
- persistent instructions와 AGENTS에 지속 규칙 추가
- 리서치 노트, 계획 히스토리, 평가 보고서 작성
- 테스트, config contract, memory bootstrap, map check 후 커밋/push

## 제외하거나 보류한 선택지

- 실제 GitHub API를 호출해 저장소 품질을 자동 점수화하는 기능은 보류했다.
- 지금은 필드와 readiness check를 먼저 추가하고, 반복 필요가 커지면 별도 코드 레퍼런스 수집 도구로 승격한다.

## 검증 방법

- `agent-platform` unit tests
- `complete-coding-research`
- `check-config-contract`
- `check-memory-bootstrap`
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- workspace index/task board check
- `git diff --check`
