# 계획 기록: 인간 프로세스 자동화 목적

## 요청

사용자는 플랫폼이 결국 사람의 반복 작업을 계속 줄이고, 효율적인 방법을 만들어 내며, 시간을 줄이고, 인간과 최대한 유사한 프로세스를 찾아 자동화하는 것이라고 정의했다.

## 작업 모드

- `governance`

## 결정

- 이 요청은 단일 기능이 아니라 플랫폼 목적 정의이므로 `REQ-WS-045`로 기준선화한다.
- 기존 “반복을 스킬/도구로 승격” 규칙을 “왜 승격하는가”와 연결한다.
- 자동화는 목적이 아니라 반복 감소와 시간 절감의 수단으로 다룬다.
- 인간 판단, 검증, rollback 경계는 자동화에서 반드시 보존한다.

## 근거

- Google SRE toil 자료: 반복적이고 자동화 가능한 수작업을 줄여 engineering work 시간을 확보한다.
- IBM LiveAction: 실제 사용 데이터에서 반복 행동을 찾아 task model을 만들 수 있다.
- IBM RPA/Microsoft process mining: 인간 프로세스와 실제 작업 데이터를 통해 자동화 후보와 병목을 찾는다.

## 실행 계획

1. 요구사항과 스펙을 만든다.
2. 철학, identity, README, governance, persistent instructions, AGENTS, memory bootstrap에 반영한다.
3. 웹 검색 기록과 연구 노트를 남긴다.
4. 요청 요약, trace, work summary, timing, evaluation을 연결한다.
5. 검증 후 commit/push한다.
