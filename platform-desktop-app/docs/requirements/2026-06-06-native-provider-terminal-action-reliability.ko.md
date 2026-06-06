# Requirement: Native Provider and Terminal Action Reliability

## 배경

Provider 계정 설정과 터미널 편의 기능이 화면에 표시되더라도 실제 데스크톱 앱에서 OS URL opener, system clipboard, native PTY command로 이어지지 않으면 사용자는 기능이 안 된다고 판단한다.

## 요구사항

- `REQ-NAR-001`: Provider login/key/docs 버튼은 raw shell command가 아니라 Tauri opener 기반 OS default browser 동작으로 연결되어야 한다.
- `REQ-NAR-002`: Terminal copy/paste는 브라우저 clipboard만 의존하지 않고 Tauri system clipboard 경로를 우선 사용해야 한다.
- `REQ-NAR-003`: Tauri capability는 opener URL과 clipboard read/write text 권한을 명시해야 한다.
- `REQ-NAR-004`: Provider key 저장, provider URL open, native PTY start, terminal paste action은 클릭 smoke에서 handler 호출까지 검증되어야 한다.
- `REQ-NAR-005`: 실패 시 버튼/상태 메시지가 사용자가 볼 수 있는 위치에 남아야 하며 조용히 실패하면 안 된다.

## 비범위

- OAuth 자동 로그인, browser cookie 수집, provider key 자동 발급.
- OS keychain secret store 교체.
- Headless test에서 실제 macOS browser window 또는 system clipboard 내용까지 검증.

## 수용 기준

- `tauri-plugin-opener`와 `tauri-plugin-clipboard-manager`가 Tauri runtime에 등록된다.
- Provider URL open command는 opener plugin을 사용한다.
- Renderer clipboard utility는 native command, browser clipboard, textarea fallback 순서로 동작한다.
- Smoke script가 provider/terminal 클릭 action을 검증한다.
- renderer check/test/build, Rust check/test, desktop internal package build가 통과한다.
