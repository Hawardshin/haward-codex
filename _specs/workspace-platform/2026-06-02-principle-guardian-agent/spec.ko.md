# Spec: Principle Guardian Agent

## 배경

사용자는 “다들 강력하게 원칙을 고수한다”고 말했다. 이 요구는 모든 에이전트가 기존 운영 원칙을 강하게 지키고, 속도·돈·낙관·편의를 이유로 원칙을 우회하지 않도록 만드는 durable instruction으로 해석한다.

## 요구사항

- `principle-guardian-agent`를 agent-platform의 reusable governance agent로 추가한다.
- 에이전트는 durable instructions, operating philosophy, requirements, specs, work mode, evaluation gate를 기준으로 원칙 준수 여부를 확인해야 한다.
- 속도, 돈, 낙관, 편의, 사용자 압박이 원칙과 충돌하면 원칙을 우선하고 compliant alternative를 제시해야 한다.
- 원칙 충돌은 숨기지 않고 governing source, 선택 이유, human checkpoint 또는 reversible path를 기록해야 한다.
- 영속 지침과 README에 원칙 고수 규칙이 남아야 한다.

## 비범위

- 별도 런타임 supervisor 구현은 이번 범위가 아니다.
- 모든 기존 agent config를 전부 재작성하지 않는다.

## 수용 기준

- `inspect-agent`가 통과한다.
- `list-agents`에 `principle-guardian-agent`가 나온다.
- orchestration check가 통과한다.
- persistent instructions와 요구사항 baseline이 갱신된다.
