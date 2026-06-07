# 2026-06-07 source workbench controller hook 모드 선택

## 선택

- `work_mode`: `ship_first`
- `view_mode`: `superadmin_developer`
- `install_mode`: `developer`

## 이유

- 요청은 installable desktop app 내부 구현과 source workbench 구조 개선을 포함한다.
- 이미 실패한 패키징/typecheck 흐름을 복구하고, 실제 내부 패키징까지 확인해야 하므로 구현 우선 모드가 맞다.
- 사용자/개발자/관리자 surface를 모두 확인하는 monitor source workbench라 현재 기본 view mode인 `superadmin_developer`를 유지한다.

## 게이트

- 웹 선검색 기록 작성.
- 구조 계약과 readiness map 갱신.
- workspace-monitor check, 전체 테스트, 내부 패키징.
- 누락 및 리소스 점검 기록 작성.
