# 계획: 병렬 작업 계획 구조

## 모드

- 작업 모드: `governance`
- 이유: 공통 운영 루프, agent-platform CLI, prompts/workflows, memory anchors가 바뀐다.

## 단계

1. 웹 검색으로 DAG/워크플로 의존성, 동시 실행, job dependency 사례를 확인한다.
2. `REQ-WS-023`과 spec-driven 산출물을 만든다.
3. `parallel_work.py`와 `plan-parallel-work` CLI를 구현한다.
4. 테스트와 template/agent spec을 추가한다.
5. 문서, 프롬프트, workflow, memory bootstrap, coordination board를 갱신한다.
6. 전체 검증, 평가, 커밋, push를 수행한다.

## 결정

- 병렬화는 새 work mode가 아니라 실행 구조로 둔다.
- 실제 병렬 실행 엔진은 만들지 않고, 먼저 안전한 batch 판정과 충돌 방지 규칙을 만든다.
