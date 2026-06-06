# User Request Summary: Native Provider and Terminal Action Reliability

## 요약

- 사용자는 이전에 추가한 AI provider setup, terminal, CLI 관련 기능이 실제로 동작하지 않는 것 같다고 지적했다.
- 요구는 안내 UI가 아니라 데스크톱 앱의 OS 자원을 실제로 사용하도록 고치고, 구현 후 빌드까지 자동으로 끝내는 것이다.

## 적용된 해석

- provider login/key/docs 버튼은 Tauri opener 기반 native URL open으로 연결한다.
- terminal copy/paste는 Tauri system clipboard를 우선 사용한다.
- 버튼 클릭이 native invoke handler까지 도달하는지 Playwright smoke로 검증한다.
