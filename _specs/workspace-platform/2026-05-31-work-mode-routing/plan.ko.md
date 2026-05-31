# 작업 모드 라우팅 계획

## 선택 모드

- 현재 작업 모드: `governance`
- 이유: evaluator, 워크플로, persistent rules, memory bootstrap 등 저장소 전체 운영 규칙을 바꾼다.

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-05-31-work-mode-routing.ko.md`
- 출처 근거: Google Engineering Practices, GitHub Flow, Atlassian technical debt guidance
- 내부 근거: `_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md`, 현재 `work_evaluator.py`, `_ops/workflows/00-start-here.md`

## 계획

1. 현재 evaluator와 시작/종료 프롬프트에서 전체 루프를 강제하는 지점을 확인한다.
2. 작업 모드 registry를 만들고 모드별 blocking target을 정의한다.
3. `work-evaluator-agent`에 `work_mode`와 `deferred_improvement_targets`를 추가한다.
4. 시작/종료/evaluation prompt와 workflow가 모드 기반으로 분기하게 갱신한다.
5. 지연 개선 백로그를 추가한다.
6. 요구사항, 스펙, 히스토리, 평가, 맵을 갱신한다.
7. 테스트와 config/memory/grounding/evaluation 검증을 실행한다.
8. 커밋하고 즉시 push한다.

## 아키텍처 옵션

| 옵션 | 설명 | 판단 |
| --- | --- | --- |
| evaluator 내부 hard-code만 추가 | 빠르지만 사용자가 설정 파일만 보고 이해하기 어렵다. | 기각 |
| self-documenting registry + evaluator policy | 설정 파일에서 모드, 근거, 적용 규칙을 읽을 수 있고 evaluator와 문서가 같은 정책을 따른다. | 채택 |

## 원천값과 계획 근거

- 모드 이름과 필수 target은 `agent-platform/configs/workflows/work-mode-registry.json`에 기록한다.
- evaluator의 기본값은 기존 동작 보존을 위해 `standard`로 둔다.
- `ship_first` 개선 지연은 `_ops/backlog/deferred-improvements.ko.md`로 추적한다.
