# 2026-06-05 직관성 개선 계획

## 목표

Workspace Monitor Overview와 command palette에서 기능명 중심 이동을 줄이고 목표 기반 진입을 먼저 보여준다.

## 결정

- `TaskIntentItem` 데이터로 목표 route를 한 곳에서 정의한다.
- Overview 홈은 `data-task-intent` 버튼 6개를 렌더링한다.
- Command palette는 섹션보다 목표 item을 먼저 검색 대상으로 둔다.
- 모바일 Overview는 상단 보조 진단과 필터를 숨기고 상태 요약을 compact 2열로 낮춘다.

## 검증

- 정적 테스트로 task intent route, command palette goal item, 모바일 레일/Overview compact 계약을 고정한다.
- `workspace-monitor` test/check/build:customer를 실행한다.
- 1280px/390px Playwright smoke로 목표 카드 수, `build-tool`, 수평 overflow, 첫 목표 카드 위치를 확인한다.
