# 2026-05-31 작업 모드 라우팅 요구사항 변경

## 변경 요약

사용자가 “매번 모든 루프를 돌기 때문에 비효율적”이라고 지적했고, 작업 성격에 따라 모드를 선택하고 선 작업 후 개선을 뒤로 뺄 수 있는 구조를 요청했다.

## 변경된 요구사항

- `REQ-WS-020` 추가: `quick`, `standard`, `ship_first`, `research`, `governance` 작업 모드를 선택하고 모드별 필수 산출물과 지연 개선을 다르게 관리한다.

## 근거

- 사용자 요청 요약: `_history/user-requests/2026/2026-05-31.ko.md`
- 웹 검색 기록: `_history/web-searches/2026/2026-05-31-work-mode-routing.ko.md`
- 외부 참고: Google Engineering Practices, GitHub Flow, Atlassian technical debt guidance

## 영향

- 기존 `standard`/`governance` 모드는 풀 루프를 유지한다.
- `quick`은 작은 작업에서 요구사항/스펙/추적 산출물을 비차단 개선으로 둔다.
- `ship_first`는 먼저 구현/검증하고 비차단 개선은 `_ops/backlog/`에 남긴다.
- `research`는 구현 산출물보다 출처와 계획 근거를 우선한다.
