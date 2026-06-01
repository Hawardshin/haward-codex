# 스펙: 인간 프로세스 자동화 목적

## 요구사항

- `REQ-WS-045`

## 문제

플랫폼에는 이미 반복 작업을 스킬, 도구, 워크플로로 승격한다는 규칙이 있었지만, “왜 그렇게 하는가”가 여러 문서에 분산되어 있었다. 사용자는 플랫폼의 최종 목적을 사람의 반복 작업과 시간을 줄이고, 인간이 실제로 수행하는 프로세스를 찾아 자동화하는 것으로 명확히 정의했다.

## 목표

- 플랫폼 목적을 반복 작업 감소, 효율적 방법 생성, 시간 절감으로 기준선화한다.
- 인간의 조사, 비교, 판단, 실행, 검증 흐름을 자동화 설계의 출발점으로 삼는다.
- 반복 가치가 있는 흐름은 가장 작은 durable asset으로 승격한다.
- 자동화가 인간 판단, 검증 기준, rollback 경계를 숨기지 않게 한다.
- 다음 세션에서도 이 목적을 놓치지 않도록 persistent instructions와 memory bootstrap anchor에 반영한다.

## 비목표

- 새 자동화 엔진을 구현하지 않는다.
- 모든 반복 작업을 즉시 자동화하지 않는다.
- 인간 판단이 본질인 작업을 무조건 기계 작업으로 대체하지 않는다.

## 설계

- `REQ-WS-045`를 workspace platform baseline에 추가한다.
- 철학 문서와 플랫폼 identity 문서에 반복 감소와 시간 절감 목적을 명시한다.
- capability governance에 자동화 후보 판단 기준을 추가한다.
- persistent instructions, AGENTS, memory bootstrap이 새 목적을 warm context로 유지하게 한다.
- 웹 검색 기록, 연구 노트, 계획, trace, 평가, timing record를 남겨 근거와 결과를 추적한다.

## 수용 기준

- `REQ-WS-045`가 한국어/영어 requirements baseline에 존재한다.
- 철학, 플랫폼 identity, README, capability governance, persistent instructions, AGENTS가 같은 목적을 말한다.
- memory bootstrap config가 반복 작업 감소와 인간 프로세스 자동화를 anchor purpose에 포함한다.
- 웹 검색 기록과 연구 노트가 외부 근거를 보존한다.
- work evaluator와 grounding check가 통과한다.
