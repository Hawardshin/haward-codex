# 2026-05-31 작업 모드 라우팅 계획 기록

## 선택 작업 모드

- `governance`
- 이유: evaluator, start/close/evaluate workflow, memory bootstrap, persistent rules를 바꾸는 저장소 전체 운영 변경이다.

## 확인한 근거

- 웹 검색: `_history/web-searches/2026/2026-05-31-work-mode-routing.ko.md`
- 내부 중복 감사: `_research/overlap-audits/2026-05-31-source-discovery-overlap.ko.md`
- 현재 풀 루프 강제 지점: `agent-platform/src/agent_platform/evaluation/work_evaluator.py`, `_ops/workflows/00-start-here.md`, `_ops/prompts/60-close-work.md`, `_ops/prompts/70-evaluate-work.md`

## 결정

- 전체 루프를 삭제하지 않고 모드별로 blocking target을 다르게 둔다.
- 기본값은 `standard`로 유지한다.
- durable rule/platform/evaluator 변경은 `governance`로 처리한다.
- `quick`/`ship_first`/`research`는 필요한 근거만 blocking으로 둔다.
- 미룬 개선은 `_ops/backlog/deferred-improvements.ko.md`에 남긴다.

## 실행 순서

1. evaluator에 `work_mode`, `deferred_improvement_targets`, 모드별 target policy를 추가한다.
2. 테스트에 quick, ship-first, research, unknown mode 케이스를 추가한다.
3. `work-mode-registry.json`으로 모드 정의를 자기 설명형 설정으로 둔다.
4. 시작/종료/evaluation prompt와 workflow를 모드 기반으로 바꾼다.
5. 요구사항/스펙/히스토리/연구/evaluation 문서를 갱신한다.
6. 검증 후 commit/push한다.

## 남은 개선

- 실제 작업 사례가 쌓이면 `DI-2026-05-31-001`로 모드 기준을 조정한다.
