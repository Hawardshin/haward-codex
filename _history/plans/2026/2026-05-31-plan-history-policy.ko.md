# 계획 히스토리 - Plan History Policy

## 초기 요청

> 에이전트가 Plan을 짜는 과정 역시 히스토리로 잘 저장해야해.

## 계획 목적

에이전트가 세운 계획 과정이 채팅이나 임시 파일에만 남지 않도록, 저장소 안에서 추적 가능한 구조와 실행 규칙을 만든다.

## 검색 질문

- 현재 저장소에는 계획 과정 저장 위치가 있는가?
- `research-insight-planner-agent`가 계획 히스토리 저장을 강제할 수 있는가?
- 계획 과정은 작업 로그, 평가 보고서, 리서치 노트와 어떻게 구분해야 하는가?

## 검색 채널

- 저장소 검색
- 운영 문서 검색
- Python 테스트/구현 검색

## 확인한 출처

| Source | URL or Path | Notes |
| --- | --- | --- |
| Repository instructions | `AGENTS.md` | 저장소 운영 규칙과 평가/히스토리 요구사항 확인 |
| Workspace README | `README.md` | 히스토리, 평가, 검색 기반 계획 정책 확인 |
| History README | `_history/README.md` | 기존 히스토리 구조 확인 |
| Search insight workflow | `_ops/workflows/55-research-insight-planning.md` | 계획 워크플로에 저장 단계를 넣을 위치 확인 |
| Planner implementation | `agent-platform/src/agent_platform/planning/research_insight_planner.py` | `ready_to_plan` 조건을 강화할 위치 확인 |
| Planner tests | `agent-platform/tests/test_research_insight_planner.py` | 저장 위치 누락을 테스트로 고정할 위치 확인 |

## 지식 베이스 검증

- 내부 문서를 근거로 사용하므로 `knowledge-skeptic-agent`로 검증했다.
- 검증 입력 대상: `AGENTS.md`, `README.md`, `_history/README.md`, `_ops/workflows/55-research-insight-planning.md`, `agent-platform/src/agent_platform/planning/research_insight_planner.py`, `agent-platform/tests/test_research_insight_planner.py`
- 결과: `ready_to_reference`
- 반대 신호: 없음

## 도출한 인사이트

- 작업 로그는 결과 중심이고, 평가 보고서는 종료 품질 중심이므로 계획 과정 전용 위치가 필요하다.
- 계획 저장이 문서 규칙에만 있으면 누락되기 쉽다. `plan-from-research` 입력 스키마와 검증 로직에도 반영해야 한다.
- 계획은 실행 중 바뀔 수 있으므로 변경 이력까지 같은 파일에 남겨야 한다.

## 계획 단계

1. `_history/plans/` README와 연도별 계획 파일을 추가한다.
2. `_templates/plan-history/`에 한국어/영어 계획 히스토리 템플릿을 만든다.
3. `ResearchInsightPlanInput`에 `plan_history_targets`를 추가한다.
4. `create_research_insight_plan`이 계획 히스토리 저장 위치 누락을 gap으로 반환하게 한다.
5. 템플릿 입력, 에이전트 문서, 프롬프트, 워크플로, 지속 지시, 작업 규칙을 업데이트한다.
6. 이번 작업의 계획 히스토리와 평가 보고서를 파일로 저장한다.
7. 테스트, CLI, 맵, 평가를 통과한 뒤 커밋하고 push한다.

## 제외하거나 보류한 선택지

- 별도 `plan-history-agent`를 새로 만드는 것은 보류했다. 현재는 `research-insight-planner-agent`의 책임을 확장하는 편이 더 작고 자연스럽다.
- 계획 히스토리 HTML 대시보드는 보류했다. 우선 Markdown 파일 구조를 안정화한 뒤, 누적량이 생기면 HTML 인덱스를 검토한다.

## 위험과 불확실성

- 계획을 너무 많이 저장하면 잡음이 생길 수 있다. 중요한 계획이나 `research-insight-planner-agent`를 쓰는 작업부터 저장한다.
- 계획이 실행 중 바뀌었는데 파일을 업데이트하지 않으면 실제 작업 흐름과 기록이 어긋난다.

## 검증 방법

- `agent-platform` 단위 테스트
- `plan-from-research` CLI
- `knowledge-skeptic-agent` 내부 문서 검증
- workspace index/task board check
- work evaluator
- `git diff --check`

## 계획 변경 이력

| Time | Change | Reason |
| --- | --- | --- |
| 2026-05-31 | 계획 히스토리 폴더와 템플릿을 추가하기로 결정 | 사용자 지시가 “계획 과정도 히스토리로 저장”을 요구함 |
| 2026-05-31 | `plan_history_targets`를 CLI readiness 조건에 추가 | 문서 규칙만으로는 누락될 가능성이 있어 실행 입력에서 강제하기 위함 |
| 2026-05-31 | 별도 새 에이전트 대신 기존 planner agent 확장으로 결정 | 계획 과정 저장은 검색 기반 계획의 필수 산출물에 가깝기 때문 |
| 2026-05-31 | 내부 지식 검증 결과를 계획 파일에 반영 | 계획 근거가 된 저장소 문서가 현재 작업에 적용 가능한지 추적하기 위함 |
