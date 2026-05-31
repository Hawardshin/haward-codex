# 구현 계획: 스킬 생명주기 거버넌스

1. 웹 검색과 기존 `skill-creator` 지침을 확인한다.
2. `REQ-WS-014`와 변경/검토 기록을 추가한다.
3. 스킬 lifecycle 스펙, 정책, 프롬프트, 워크플로, 템플릿을 만든다.
4. `_skills/create-validated-skill/` 원본 스킬을 만든다.
5. `agent-platform validate-skill` CLI와 테스트를 추가한다.
6. `work-evaluator-agent`에 skill work target 확인을 추가한다.
7. memory bootstrap과 운영 문서에 스킬 lifecycle을 연결한다.
8. 실제 스킬 검증, 테스트, grounding, 평가를 실행한다.
9. 평가 보고서, 작업 요약, 요청 trace를 갱신하고 push한다.

