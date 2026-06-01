# 요구사항 변경: 딥리서치 에이전트

## 변경 ID

- `REQ-CHANGE-2026-06-01-DEEP-RESEARCH-AGENT`

## 배경

사용자는 특정 상황에서 검색을 수행하고, 여러 깊은 단계로 자료를 모은 뒤 매우 자세한 보고서를 쓰는 딥리서치 에이전트를 요청했다.

## 변경 내용

- `REQ-WS-040`을 추가한다.
- `deep-research-agent`는 기존 `research-insight-planner-agent`와 분리한다.
- 딥리서치 입력은 조사 질문, 보고서 목표, 대상 독자, depth level, 다중 검색 채널, 출처 유형, 조사 iteration, evidence item, contradiction note, citation audit, report outline, report target을 기록해야 한다.
- 에이전트는 보고서 작성 준비 상태를 `ready_to_write_report` 또는 `more_research_required`로 판정한다.

## 근거

- OpenAI, Exa, LangChain의 deep research 구조는 모두 계획, 다중 검색, 추출, 종합, 인용 포함 보고서라는 단계를 공유한다.
- 논문 기반 평가 자료는 citation이 있어도 실제 source support가 약할 수 있으므로 citation audit와 unsupported claim 확인이 필요하다고 지적한다.

## 영향 범위

- `agent-platform/src/agent_platform/planning/`
- `agent-platform/configs/research/`
- `agent-platform/configs/planning/`
- `agent-platform/configs/agents/`
- `agent-platform/docs/`
- `_ops/workflows/`
- `_ops/prompts/`
- `_history/`

## 검증

- `complete-deep-research` 단위 테스트
- `complete-deep-research` CLI 실행
- deep research profile config contract
- memory bootstrap
- workspace health

