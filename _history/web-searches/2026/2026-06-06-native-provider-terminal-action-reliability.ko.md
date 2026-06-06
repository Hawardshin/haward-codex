# Web Search: Native Provider and Terminal Action Reliability

## 검색 일시

- 2026-06-06

## 질문

- Provider login/key 버튼과 터미널 clipboard 버튼이 데스크톱 앱에서 실제 OS 기능으로 동작하려면 어떤 Tauri v2 플러그인과 권한이 필요한가?
- xterm.js 터미널 surface에서 검색/fit/link/clipboard 류 기능은 어떤 addon 또는 host API와 연결해야 하는가?
- OpenAI/Gemini API key setup URL은 공식 문서 기준으로 유지되는가?

## 확인한 출처

- Tauri Clipboard plugin: https://v2.tauri.app/plugin/clipboard/
- Tauri Opener plugin: https://v2.tauri.app/plugin/opener/
- Tauri Opener JavaScript reference: https://v2.tauri.app/reference/javascript/opener/
- xterm.js docs: https://xtermjs.org/docs/
- xterm.js using addons: https://xtermjs.org/docs/guides/using-addons/
- OpenAI API key help: https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key
- Google Gemini API key docs: https://ai.google.dev/gemini-api/docs/api-key

## 판단

- Tauri opener는 URL/file을 기본 OS application으로 열기 위한 공식 플러그인이다. 기존 raw `open`/`xdg-open`/`cmd start` 직접 실행보다 앱 권한과 런타임 경계가 명확하다.
- Tauri clipboard manager는 system clipboard read/write를 위한 공식 플러그인이다. 브라우저 `navigator.clipboard`만 쓰면 WebView 권한과 secure context 차이에 취약하다.
- Clipboard plugin은 기본적으로 위험 기능이 꺼져 있으므로 read/write-text 권한을 명시해야 한다.
- xterm.js는 terminal rendering/addon host이고 실제 system clipboard는 host runtime이 책임져야 한다. 따라서 renderer는 xterm surface와 Tauri clipboard/native PTY command를 연결해야 한다.
- OpenAI/Gemini는 공식 key 발급/관리 페이지를 열고 사용자가 키를 저장하는 flow가 현재 범위에서 현실적인 login setup이다. 브라우저 session cookie나 OAuth scraping은 제외한다.

## 구현 영향

- `platform-desktop-app/src-tauri`에 `tauri-plugin-opener`, `tauri-plugin-clipboard-manager`를 project-local Rust dependency로 추가한다.
- Tauri builder에 opener/clipboard plugin init을 등록한다.
- `src-tauri/capabilities/default.json`에 opener default URL, clipboard read/write text 권한을 추가한다.
- Renderer clipboard helper는 Tauri command를 우선 사용하고 browser clipboard를 fallback으로 유지한다.
- Playwright smoke에서 provider action과 terminal action이 실제 handler까지 호출되는지 검증한다.

## 불확실성

- 실제 OS browser launch와 clipboard integration은 headless browser smoke만으로 완전 검증할 수 없다. 최종 검증은 `cargo check`, renderer tests, desktop internal package build, app/DMG verification으로 보강한다.
