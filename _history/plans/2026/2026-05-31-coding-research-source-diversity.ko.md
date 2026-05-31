# 계획 히스토리: 코딩 조사 출처 다양성 강화

## 초기 요청

- "다양한 소스를 통해서 해야해."

## 계획 목적

- 코딩 조사 에이전트가 단순히 여러 검색 채널을 쓰는 데서 끝나지 않고, 다양한 출처 유형을 readiness 조건으로 강제하게 한다.

## 검색 질문

- 소프트웨어공학 조사에서 다양한 출처를 함께 쓰는 근거는 무엇인가?
- 코딩 조사 입력 schema에서 출처 다양성을 어떻게 검증할 것인가?

## 검색 채널

- 웹 검색
- 저장소 검색
- 코드 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Guidelines for including grey literature and conducting multivocal literature reviews in software engineering | https://doi.org/10.1016/j.infsof.2018.09.006 | formal literature와 grey literature를 함께 다루는 MLR 참고 |
| CMU SEI Digital Library | https://www.sei.cmu.edu/library/ | 여러 publication type을 가진 소프트웨어공학 자료 라이브러리 |
| 기존 코딩 조사 에이전트 문서 | `agent-platform/docs/coding-research-agent.ko.md` | source diversity 규칙을 추가할 위치 |
| 기존 코딩 조사 에이전트 구현 | `agent-platform/src/agent_platform/planning/coding_research.py` | `source_types` readiness check를 추가할 위치 |

## 지식 베이스 검증

- 내부 에이전트 문서와 정책을 참고하므로 최종 검증에서 `knowledge-skeptic-agent`를 실행한다.

## 도출한 인사이트

- 다양한 검색 채널만으로는 출처 다양성이 보장되지 않는다.
- `source_types`를 별도 입력 필드로 두면 공식 문서, 논문, 오픈소스, 기술 블로그, 커뮤니티, 소셜, 반대 사례 같은 범주를 명시적으로 검증할 수 있다.
- readiness 기준은 최소 3개 이상의 `other`가 아닌 출처 유형, 권위 출처 1개 이상, 실무/채택/반대 신호 1개 이상으로 잡는다.

## 계획 단계

- `CodingResearchInput`에 `source_types`를 추가한다.
- 허용 source type과 다양성 검증 로직을 추가한다.
- 템플릿, 테스트, 문서, 운영 프롬프트/워크플로를 갱신한다.
- 리서치 노트, 히스토리, 평가 보고서를 갱신한다.
- 테스트와 CLI 검증을 실행하고 커밋 후 push한다.

## 제외하거나 보류한 선택지

- URL 문자열에서 source type을 자동 추론하는 방식은 보류했다. 조사자가 출처 유형을 명시하게 하는 편이 더 명확하다.

## 위험과 불확실성

- 작은 로컬 버그 조사에도 3개 출처 유형이 부담이 될 수 있다. 다만 사용자의 현재 운영 철학은 다양한 소스 기반 조사를 우선하므로 readiness 조건으로 강화한다.

## 검증 방법

- `agent-platform` unit test
- `complete-coding-research` CLI
- `knowledge-skeptic-agent`
- `hallucination-guard-agent`
- `work-evaluator-agent`
- 맵/보드 check와 `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | `source_types` 필드를 추가하고 출처 다양성을 readiness 조건으로 강화 | 사용자가 다양한 소스를 통한 조사를 명시했기 때문 |
