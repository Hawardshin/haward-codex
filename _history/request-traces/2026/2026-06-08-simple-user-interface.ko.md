# 요청-결과 추적: 기본 사용자 인터페이스 단순화

## 요청

- 사용자 기본 인터페이스를 단순화한다.
- 커스텀/고급 기능은 기본 사용자 화면 뒤로 보낸다.
- 사용자가 첫 실행을 쉽게 시작할 수 있게 한다.

## 결과

- `view-mode-registry.json` 기본값을 `user`로 변경했다.
- 사용자 기본 섹션을 `overview`, `desktop`, `eval`로 줄였다.
- 홈에 `data-simple-user-start` 작업 요청 입력과 자동 시작 액션을 추가했다.
- 사용자 보기에서 activity rail의 운영 센터 버튼을 숨겼다.
- 정책, 요구사항, 스펙, 테스트 기대값을 새 기본값으로 맞췄다.

## 산출물

- `platform-desktop-app/renderer/workspace-monitor/specs/2026-06-08-simple-user-interface/`
- `_requirements/changes/2026-06-08-simple-user-interface.ko.md`
- `_history/web-searches/2026/2026-06-08-simple-user-interface.ko.md`
- `_history/omission-checks/2026/2026-06-08-simple-user-interface.json`
- `_history/resource-checks/2026/2026-06-08-simple-user-interface.json`
- `_history/evaluations/2026/2026-06-08-simple-user-interface-input.json`

## 남은 후속

- 패키지된 데스크톱 앱에서 native runtime auto-start smoke를 별도 실행한다.
