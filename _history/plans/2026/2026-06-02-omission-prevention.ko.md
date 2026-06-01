# 2026-06-02 누락 방지 계획 기록

## 작업 모드 선택

- 선택: `governance`
- 이유: evaluator, work mode registry, durable instructions, memory bootstrap을 바꾸는 플랫폼 운영 규칙 변경이다.
- 모드 선택 기록 target: `_specs/workspace-platform/2026-06-02-omission-prevention/plan.ko.md`, 이 파일

## 실행 계획

1. 웹 검색으로 체크리스트, traceability, Definition of Done 근거를 확인한다.
2. 요구사항 `REQ-WS-056`과 spec-driven 산출물을 작성한다.
3. `omission-guard-agent`, `check-omissions`, template, agent config, 단위 테스트를 추가한다.
4. `work-evaluator-agent`와 `work-mode-registry.json`에 `omission_check_targets`를 추가한다.
5. 정책, 워크플로, 프롬프트, 지속 지시, memory bootstrap, navigation 문서를 갱신한다.
6. 누락 방지 자체의 omission check, grounding, evaluator report를 저장한다.
7. 테스트와 config check 후 커밋/push한다.

## 계획 근거

- WHO checklist 자료: 기억 의존을 줄이고 항목별 확인을 강조한다.
- NASA/Microsoft traceability 자료: 요구사항과 검증 연결을 명시적으로 남기는 구조가 필요하다.
- 기존 work mode enforcement: prompt-only 규칙보다 registry/evaluator gate가 적합하다.

## 변경 사항

- 계획 변경 없음.
