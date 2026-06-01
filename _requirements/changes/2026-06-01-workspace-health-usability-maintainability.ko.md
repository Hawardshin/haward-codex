# 요구사항 변경: Workspace Health 사용성/유지보수성

## 변경 요약

- 추가 요구사항: `REQ-WS-033`
- 관련 요청: `UR-2026-06-01-017`
- 변경일: 2026-06-01

## 변경 내용

저장소 운영 CLI는 사람이 터미널에서 읽는 출력과 자동화/대시보드에서 재사용하는 JSON 출력을 분리해야 한다. 또한 유지보수자가 필요한 범위만 빠르게 확인할 수 있도록 검사 category filter를 제공해야 한다.

## 근거

- 전체 health check가 커질수록 매번 모든 검사를 돌리면 느리고, 실패 위치를 빠르게 좁히기 어렵다.
- JSON 출력은 dashboard, CI, 후속 agent가 결과를 구조적으로 재사용하는 데 필요하다.

## 영향

- `_tools/workspace-health/`에 `--category`, `--json`, `--list --json` 동작을 추가한다.
- 문서와 테스트가 category와 JSON 동작을 검증한다.
