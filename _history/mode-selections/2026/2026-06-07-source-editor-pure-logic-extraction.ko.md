# 2026-06-07 소스 에디터 순수 로직 분리 모드 선택

## 선택

- `work_mode`: `ship_first`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- 요청은 계속 구현이며, 현재 가장 큰 병목은 `MonitorShell.tsx` 비대화다.
- 기능 변경 없이 검증 가능한 순수 함수 분리부터 진행하는 것이 충돌 위험이 가장 낮다.
