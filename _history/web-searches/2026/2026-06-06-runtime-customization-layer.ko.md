# Web Search: Runtime Customization Layer

## 질의

- `Tauri v2 store plugin persistent settings official docs`
- `Tauri v2 app config persistent user settings official docs`
- `xterm.js terminal options addons official docs custom key handler`
- `OpenAI API base URL custom provider settings official docs`
- `Ollama API base URL tags chat official docs`
- `Gemini API generateContent REST official docs`

## 확인한 주요 출처

- Tauri Store plugin: https://v2.tauri.app/plugin/store/
- xterm.js documentation: https://xtermjs.org/docs/
- xterm.js addon guide: https://xtermjs.org/docs/guides/using-addons/
- OpenAI Responses API reference: https://developers.openai.com/api/reference/resources/responses/methods/create
- Ollama API introduction: https://docs.ollama.com/api/introduction
- Gemini text generation REST docs: https://ai.google.dev/gemini-api/docs/text-generation

## 계획 영향

- Tauri Store plugin은 persistent key-value store 선택지지만 현재 앱은 이미 Rust preferences JSON command를 갖고 있어 새 설치 없이 기존 저장 경로를 확장하는 쪽을 선택했다.
- xterm.js는 UI terminal surface로 유지하되 실제 shell/pipe 관리는 기존 Rust native PTY command에 두는 구조가 맞다.
- OpenAI/Ollama/Gemini 문서는 provider별 endpoint path와 base URL 분리를 유지해야 함을 확인하는 데 사용했다.

## 무시한 약한 근거

- 블로그/커뮤니티 글은 이번 구현의 근거로 사용하지 않았다.
- provider별 비공식 proxy 예시는 UI preset의 선택지로만 두고 공식 동작 근거로 쓰지 않았다.

## 불확실성

- Anthropic API reference page는 브라우저에서 동적 로딩 위주로 노출되어 세부 endpoint 확인 근거로는 약하게 취급했다. 기존 구현의 `/v1/messages` 경로는 유지하고 base URL만 커스텀 가능하게 했다.

## 공개 결정 요약

새 dependency 설치 대신 기존 Tauri Rust preferences 저장소를 확장하고, renderer 설정값을 Rust provider/PTY 실행 경로에 연결한다.
