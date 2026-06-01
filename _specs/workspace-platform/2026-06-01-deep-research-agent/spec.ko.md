# 스펙: 딥리서치 에이전트

## 목표

특정 상황에서 깊은 웹/문서/자료 조사를 수행하고, 다단계 근거 수집을 거쳐 매우 자세한 보고서를 작성할 수 있도록 `deep-research-agent`를 추가한다.

## 비목표

- 이번 변경에서 실제 외부 검색 API crawler를 설치하거나 실행하지 않는다.
- 기존 `research-insight-planner-agent`를 제거하거나 대체하지 않는다.
- 특정 주제의 최종 딥리서치 보고서를 작성하지 않는다. 이번 작업은 에이전트 구조와 검증 기준을 만든다.

## 요구사항

- `REQ-WS-040`

## 기능 요구사항

- deep research 입력 모델은 조사 질문, 보고서 목표, 대상 독자, trigger situation, depth level을 받는다.
- 최소 3개 검색 채널을 요구하며, 그 중 하나는 web/internet이어야 한다.
- 최소 4개 non-`other` source type을 요구하고 authoritative source와 practical/context source를 모두 요구한다.
- 필수 deep research stages를 모두 기록해야 한다.
- 최소 2개 research iteration과 충분한 evidence item을 요구한다.
- source quality note, contradiction note, synthesis note, citation audit note, unsupported/weak claim note를 요구한다.
- report outline과 report target을 요구한다.
- 내부 지식 베이스 출처를 쓰면 `knowledge_validation_status=ready_to_reference`가 필요하다.
- CLI 명령은 `complete-deep-research <input.json>`이다.

## 설계 결정

- 언어/런타임: Python을 선택한다. 기존 `agent-platform`의 planning/evaluation 에이전트가 Python dataclass와 deterministic CLI 패턴을 사용하므로 유지보수가 쉽다.
- 대안: TypeScript/Node 구현은 Workspace Monitor와 궁합이 좋지만, 현재 agent-platform runtime과 테스트 구조가 Python이라 공통 agent 구현에는 불필요한 경계가 생긴다.
- 아키텍처 옵션:
  - 기존 `research_insight_planner.py`에 필드를 추가한다.
  - 별도 `deep_research.py` 모듈과 CLI를 만든다.
- 선택: 별도 모듈. 기존 planner는 계획 readiness에 집중하고, deep research는 긴 보고서 readiness와 citation audit에 집중해야 한다.

## 산출물

- `agent-platform/src/agent_platform/planning/deep_research.py`
- `agent-platform/tests/test_deep_research.py`
- `agent-platform/configs/research/deep-research-profile.json`
- `agent-platform/configs/planning/deep-research-template.json`
- `agent-platform/configs/agents/deep-research-agent.json`
- `agent-platform/docs/deep-research-agent.ko.md`
- `_ops/workflows/57-deep-research.md`
- `_ops/prompts/87-deep-research.md`

