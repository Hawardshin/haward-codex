# 구현 계획: Spec-Driven 운영 루프

## 구현 전략

1. `_specs/`를 공통 spec-driven 산출물 위치로 추가한다.
2. spec-driven 정책, 프롬프트, 워크플로를 추가한다.
3. spec-driven 템플릿을 추가한다.
4. `spec-driven-planner-agent` 설정과 문서를 추가한다.
5. `work-evaluator-agent`에 `spec_targets`를 추가한다.
6. README, AGENTS, persistent instructions, workspace rules, ops index, start/close/evaluate workflow에 spec-driven 단계를 연결한다.
7. 요구사항 기준선에 `REQ-WS-013`을 추가하고 변경/검토 기록을 남긴다.
8. 히스토리, 리서치, 조율 보드, 맵을 갱신한다.

## 영향 범위

- 공통 운영 문서: `README.md`, `AGENTS.md`, `_docs/`
- 운영 흐름: `_ops/prompts/`, `_ops/workflows/`
- 평가 코드: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`
- 평가 테스트: `agent-platform/tests/test_work_evaluator.py`
- 메모리 부트스트랩: `agent-platform/configs/memory/bootstrap-manifest.json`
- 히스토리/리서치/요구사항: `_history/`, `_research/`, `_requirements/`

## 검증 전략

- JSON 설정 검증
- `agent-platform` unit tests
- memory bootstrap check
- config contract check
- workspace map check
- task board check
- knowledge skeptic
- hallucination guard
- work evaluator
