# 계획 기록: 제한된 역질문 루프

## 요청

사용자는 모호한 지시가 나쁜 지시의 핵심 특징이며, AI가 필요한 경우 사람에게 역질문해야 하지만 질문이 계속 이어지면 곤란하므로 구체화 과정에 제한이 필요하다고 요청했다.

## 작업 모드

- `governance`

## 결정

- `REQ-WS-046`으로 기준선화한다.
- 기존 `REQ-WS-043`의 task brief 재작성 규칙을 보강하고, 질문 예산과 종료 조건을 명시한다.
- 질문은 결과를 크게 바꾸는 불확실성에만 사용한다.
- low-risk/reversible gap은 가정과 검증 경로를 남기고 진행한다.

## 실행 계획

1. `ai-usage-gap-profile.json`에 bounded clarification policy를 추가한다.
2. 운영 모델, workflow, prompt, router, index, persistent instructions, AGENTS, memory bootstrap을 갱신한다.
3. 요구사항, 스펙, 연구 노트, 히스토리, 평가를 연결한다.
4. 검증 후 commit/push한다.
