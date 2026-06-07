# 2026-06-07 source workbench controller hook 작업 시간

## 단계별 기록

- 웹 선검색 및 후보 재확인: 완료.
- source workbench controller hook 구현: 완료.
- MonitorShell inline handler 제거: 완료.
- 구조 계약 및 readiness 갱신: 완료.
- 좁은 테스트와 workspace-monitor check: 완료.
- 전체 테스트, 내부 패키징, hygiene: 완료.

## 병목

- 기존 테스트가 `MonitorShell.tsx` 내부 구현 위치를 직접 가정하고 있어, 새 hook 경계로 테스트 계약을 함께 이동해야 했다.
