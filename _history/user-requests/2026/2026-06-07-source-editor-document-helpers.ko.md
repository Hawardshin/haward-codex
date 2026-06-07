# 2026-06-07 소스 에디터 문서 helper 분리 요청

## 요약

- 사용자는 계속해서 기능 이슈 없이 소스 구조를 분리하고 중복 로직을 제거하라고 요청했다.
- 이번 조각은 source workbench의 AGENTS 시작 문서와 패치 컨텍스트 생성 로직을 `MonitorShell.tsx`에서 분리하는 작업으로 해석했다.

## 범위

- 소스 에디터에서 생성하는 문자열 문서 helper 분리.
- `MonitorShell.tsx`의 UI/state wiring 유지.
- TypeScript, 테스트, readiness source map, 패키징 검증 확인.
