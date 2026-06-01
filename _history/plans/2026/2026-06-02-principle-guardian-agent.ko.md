# 작업 계획: Principle Guardian Agent

## 목표

“다들 강력하게 원칙을 고수한다”를 플랫폼의 영속 운영 원칙과 재사용 가능한 governance agent로 반영한다.

## 단계

1. 웹 검색으로 AI governance, responsible AI principles, management system, high reliability 원칙을 확인한다.
2. 기존 원칙/요구사항/에이전트 구조를 확인한다.
3. `REQ-WS-067`로 durable requirement를 추가한다.
4. `principle-guardian-agent` 설정과 한/영 문서를 작성한다.
5. 영속 지침과 README에 원칙 고수 규칙을 추가한다.
6. 스펙, 계획, 태스크, 검증, 추적성 문서를 추가한다.
7. 검증과 평가를 수행하고 커밋/push한다.

## 합격 기준

- `agent-platform/configs/agents/principle-guardian-agent.json`이 존재하고 inspect 가능하다.
- 모든 에이전트가 원칙을 장식 문구가 아니라 close-out gate로 취급한다는 지침이 남는다.
- 속도, 돈, 낙관, 편의가 원칙을 우회하지 못하게 문서화된다.
- 검증과 평가가 통과한다.
