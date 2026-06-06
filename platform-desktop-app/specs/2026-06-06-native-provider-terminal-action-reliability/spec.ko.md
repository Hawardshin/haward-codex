# Spec: Native Provider and Terminal Action Reliability

## 범위

- Tauri opener plugin을 추가하고 provider auth URL open command를 plugin 기반으로 변경한다.
- Tauri clipboard manager plugin을 추가하고 system clipboard read/write command를 제공한다.
- Renderer clipboard helper와 terminal paste button을 native clipboard 우선 경로로 변경한다.
- Provider/terminal action Playwright smoke를 추가한다.
- 설치 감사, 검증, 추적 기록을 업데이트한다.

## 비범위

- provider OAuth redirect callback.
- OS keychain credential migration.
- 실제 provider API 호출 성공 검증.

## 설계 결정

- URL opener는 Rust command에서 `tauri_plugin_opener::OpenerExt`를 사용한다. 기존 provider UI의 `open_provider_auth_url` contract를 유지해 renderer 변경 폭을 줄인다.
- Clipboard는 renderer가 custom Tauri command를 우선 호출한다. JS plugin import를 추가하지 않고, Rust plugin extension을 통해 system clipboard를 사용한다.
- Browser fallback은 유지한다. 정적 export 또는 일반 브라우저 preview에서도 copy/open UI가 완전히 죽지 않게 하기 위해서다.

## 수용 기준

- `src-tauri/capabilities/default.json`에 opener/clipboard permissions가 들어간다.
- `RuntimeTerminalDrawer` 붙여넣기 버튼은 native clipboard helper를 호출한다.
- `clipboard.test.mjs`가 native invoke read/write 경로와 fallback 경로를 검증한다.
- 새 Playwright smoke가 provider login/save와 terminal PTY/paste 버튼 action을 누른다.
