# 사용자 요청 요약: Agent CLI Cockpit

- 날짜: 2026-06-06
- 대상: `platform-desktop-app/`

## 요약

사용자는 유사 agent desktop/platform 오픈소스를 깊게 리서치하고, 직접 탐구가 끝나면 그 결과를 현재 플랫폼 기능으로 추가하라고 요청했다. 이전 맥락에서는 데스크톱 앱의 CPU/RAM/native resource 활용, 느린 탭 이동, 불편한 코드 편집/설정 UI, 기본 버튼/dropdown 개선, AI 로그인/CLI 설정 쉽게 만들기, terminal/process/pipe lifecycle 관리가 반복 요구됐다.

## 적용한 요구

- 외부 오픈소스 repo를 직접 clone해 확인했다.
- 기존 플랫폼 구조를 다시 보고 큰 rewrite 대신 현재 runtime state를 살리는 기능 slice를 선택했다.
- Desktop Runtime에 Agent CLI Cockpit을 구현했다.
- 구현 후 test, check, build, package까지 실행했다.
