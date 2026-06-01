# 계획: Workspace Health 사용성/유지보수성 개선

## 관련 요청

- `UR-2026-06-01-017`

## 작업 모드

- `governance`

## 근거

- 웹 검색 기록: `_history/web-searches/2026/2026-06-01-workspace-health-usability-maintainability.ko.md`
- 이전 개선: `REQ-WS-032`, `_tools/workspace-health/`

## 계획

1. `workspace-health` check에 category를 추가한다.
2. `--category`로 일부 검사만 실행할 수 있게 한다.
3. `--json`과 `--list --json`을 추가한다.
4. JSON 출력은 사람이 읽는 summary를 섞지 않고 순수 JSON으로 유지한다.
5. README와 테스트를 갱신한다.
6. category/json 실행과 전체 health check를 검증한다.
