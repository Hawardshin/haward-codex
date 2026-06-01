# 계획: 제한된 역질문 루프

## 작업 모드

- `governance`

## 근거

- Microsoft Copilot Studio guidance는 모호한 사용자 의도를 좁히기 위해 clarification question을 사용하고, 맞지 않는 경우 fallback/handoff 경로를 둔다.
- TaskLint 연구는 task instruction ambiguity가 작업 정확도에 영향을 줄 수 있음을 보여준다.
- CLAM 연구는 모호한 질문에 대해 선택적으로 clarification을 묻고 이후 답변을 생성하는 구조를 제안한다.
- 기존 플랫폼은 모호한 지시를 task brief로 재작성하지만 질문 예산과 종료 조건이 약했다.

## 단계

1. 웹 검색과 기존 profile/workflow/prompt를 확인한다.
2. `REQ-WS-046`을 추가하고 요구사항 변경/검토를 작성한다.
3. `ai-usage-gap-profile.json`, 운영 모델, workflow, prompt를 갱신한다.
4. persistent instructions, AGENTS, memory bootstrap을 갱신한다.
5. 스펙, 웹 검색 기록, 연구 노트, 요청 요약, trace, timing, 평가를 작성한다.
6. config/memory/docs/naming/structure/evaluator 검증을 실행한다.
7. 커밋하고 push한다.
