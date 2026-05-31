# 2026-05-31 계획 기록: 스킬 생명주기 명시화

## 요청 요약

사용자는 스킬 생성이 명시적으로 관리되지 않는 것 같다고 지적했고, 만든 스킬도 계속 검증하고 개선점을 찾도록 요청했다.

## 조사 요약

- OpenAI evaluation/agent eval 문서에서 agent capability는 task-specific eval과 반복 검증이 필요함을 확인했다.
- Anthropic/Claude Skills 문서에서 `SKILL.md` frontmatter, concise body, validation, examples의 중요성을 확인했다.
- Agent Skills survey와 SkillScope 논문에서 skill lifecycle과 권한/안전 검증 관점을 확인했다.

## 계획

1. 요구사항 `REQ-WS-014`를 추가한다.
2. 스킬 lifecycle 스펙을 만든다.
3. `_skills/create-validated-skill/` 원본 스킬을 만든다.
4. `agent-platform validate-skill` CLI와 테스트를 추가한다.
5. `work-evaluator-agent`에 skill target 필드를 추가한다.
6. 정책, 프롬프트, 워크플로, 템플릿, memory bootstrap, history를 갱신한다.
7. 실제 스킬 검증과 종료 평가를 실행한다.

## 판단

스킬은 만들어지는 순간보다 이후 반복 사용에서 실패하거나 애매하게 트리거될 때가 더 중요하다. 따라서 생성 루프와 개선 루프를 같은 정책으로 묶는다.

## 검증 기준

- `create-validated-skill`이 quick validation과 repository validation을 통과한다.
- `validate-skill` 테스트가 통과한다.
- 평가 입력이 스킬 작업 target 누락을 blocking gap으로 잡는다.

