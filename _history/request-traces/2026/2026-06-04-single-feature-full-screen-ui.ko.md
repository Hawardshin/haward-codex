# 요청-결과 추적: 단일 주 기능 화면 공간 원칙

## 요청

- summary: 한 화면에 주 기능이 하나라면 그 기능이 화면 대부분을 차지해야 한다는 UI 기본 원칙을 지속 규칙으로 반영한다.
- user_request_summary: `_history/user-requests/2026/2026-06-04-single-feature-full-screen-ui.ko.md`

## 결과

- persistent instructions, UI tone policy, AGENTS runtime adapter, memory bootstrap manifest에 원칙을 반영했다.
- 요구사항 변경, 요구사항 리뷰, 스펙, 계획, 작업, 검증, 추적성 기록을 추가했다.
- 특정 화면 구현은 요청 대상이 불명확해 비범위로 남겼다.

## 산출물

- `_requirements/changes/2026-06-04-single-feature-full-screen-ui.ko.md`
- `_requirements/reviews/2026-06-04-single-feature-full-screen-ui.ko.md`
- `_specs/workspace-platform/2026-06-04-single-feature-full-screen-ui/spec.ko.md`
- `_specs/workspace-platform/2026-06-04-single-feature-full-screen-ui/plan.ko.md`
- `_specs/workspace-platform/2026-06-04-single-feature-full-screen-ui/tasks.ko.md`
- `_specs/workspace-platform/2026-06-04-single-feature-full-screen-ui/validation.ko.md`
- `_specs/workspace-platform/2026-06-04-single-feature-full-screen-ui/traceability.ko.md`
- `_history/web-searches/2026/2026-06-04-single-feature-full-screen-ui.ko.md`
- `_history/evaluations/2026/2026-06-04-single-feature-full-screen-ui-evaluation-input.json`

## 검증

- passed: docs audit
- passed: memory bootstrap JSON parse
- passed: memory bootstrap config contract
- passed: git diff whitespace check

## Commit

- planned_message: `docs(ui): add single feature full screen principle`
