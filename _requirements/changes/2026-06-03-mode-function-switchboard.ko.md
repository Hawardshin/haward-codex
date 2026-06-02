# 요구사항 변경: 모드와 기능 선택 위치 스위치보드

## 변경

- `workspace-monitor` 요구사항에 `REQ-WM-019`를 추가했다.
- 모드와 기능 선택 위치를 한 곳에서 보여주는 `modeFunctionCatalog`와 Overview switchboard를 범위에 포함했다.

## 이유

- 사용자는 CLI orchestration 플랫폼 위에서 다양한 기능과 모드를 쉽게 고르고 찾을 수 있어야 한다.
- view/work/install/language/desktop session/task pipe/CLI adapter/section이 여러 파일과 UI에 흩어져 있어 명시적 선택 지도가 필요하다.

## 검증

- `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.ko.md`
- `workspace-monitor/docs/requirements/2026-06-01-workspace-monitor.en.md`
- `workspace-monitor/specs/2026-06-03-mode-function-switchboard/`
