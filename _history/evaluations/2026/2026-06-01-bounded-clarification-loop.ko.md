# 작업 평가: 제한된 역질문 루프

## 평가 결과

- 상태: `ready_to_close`
- 작업 모드: `governance`
- 요구사항: `REQ-WS-046`
- 평가 입력: `_history/evaluations/2026/2026-06-01-bounded-clarification-loop-evaluation-input.json`
- Grounding: `_history/evaluations/2026/2026-06-01-bounded-clarification-loop-grounding.json`

## 초기 지시 대비 결과

사용자는 모호한 지시가 나쁜 지시의 특징이며, AI가 필요한 경우 사람에게 역질문해야 하지만 질문이 계속 이어지면 곤란하다고 요청했다.

반영 결과:

- `REQ-WS-046`으로 bounded clarification rule을 기준선화했다.
- `ai-usage-gap-profile.json`에 `bounded_clarification_policy`를 추가했다.
- 질문은 보통 1회, 많아도 2회 이내로 제한하고 한 round 최대 3개로 제한했다.
- 답변이 없거나 계속 모호하면 합리적 가정, 추천 기본값, 선작업 후 확인, 명시적 보류로 수렴하도록 했다.
- 운영 모델, workflow, prompt, router, index, persistent instructions, AGENTS, memory bootstrap에 같은 규칙을 연결했다.

## 확인한 근거

- Microsoft Copilot Studio disambiguation guidance
- OpenAI prompt engineering best practices
- Microsoft Azure/OpenAI prompt engineering guidance
- TaskLint instruction ambiguity 연구
- CLAM selective clarification 연구

## 검증

- JSON syntax: 통과
- Config contract: 통과
- Memory bootstrap: 통과
- Docs audit: 통과
- Naming audit: 통과
- Structure audit: 통과
- Workspace index/task board freshness: 통과
- Workspace health governance: 통과
- Grounding check: `ready_to_publish`
- Work evaluator: `ready_to_close`
- Work timer: `ready`
- `git diff --check`: 통과

## 남은 개선 후보

- 1회 역질문, 가정 기반 진행, 명시적 보류의 예시 prompt set을 추가할 수 있다.
- 이 패턴이 반복되면 prompt ambiguity와 질문 예산 준수 여부를 검사하는 작은 linter를 만들 수 있다.
