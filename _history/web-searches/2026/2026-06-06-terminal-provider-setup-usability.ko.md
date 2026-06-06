# Web Search: Terminal and Provider Setup Usability

날짜: 2026-06-06

## Queries

- `site:platform.openai.com/docs OpenAI API authentication API keys project keys 2026`
- `site:ai.google.dev/gemini-api/docs Gemini API authentication API key Google login 2026`
- `site:cloud.google.com/vertex-ai/generative-ai/docs Gemini authentication OAuth application default credentials 2026`
- `terminal emulator UX command palette search copy paste settings documentation xterm.js official`

## 확인한 출처

- OpenAI API authentication: https://platform.openai.com/docs/api-reference/authentication
- OpenAI project API keys: https://platform.openai.com/docs/api-reference/project-api-keys
- Gemini API keys: https://ai.google.dev/gemini-api/docs/api-key
- Gemini API OAuth quickstart: https://ai.google.dev/gemini-api/docs/oauth
- Vertex AI authentication: https://docs.cloud.google.com/vertex-ai/docs/authentication
- Vertex AI Gemini ADC setup: https://docs.cloud.google.com/vertex-ai/generative-ai/docs/start/gcp-auth
- xterm.js addons guide: https://xtermjs.org/docs/guides/using-addons/

## 판단

- OpenAI API는 API key 인증을 기본으로 사용하며, 프로젝트 key 발급은 사용자가 공식 콘솔에서 직접 승인해야 한다.
- Gemini API의 가장 단순한 로컬 개발 인증은 Google AI Studio API key다. OAuth/ADC는 가능하지만 production provider flow와 client registration/권한 범위가 필요한 별도 경로다.
- 따라서 앱이 ChatGPT/Gemini 웹 로그인 세션이나 쿠키를 저장해서 자동 인증하는 흐름은 공식 경계와 맞지 않는다.
- 사용자 경험은 `로그인/키 발급` 버튼으로 공식 key 페이지를 열고, 앱 안에서는 저장/기본값 선택을 단순화하는 방식이 안전하다.

## 구현 영향

- OpenAI/Gemini login URL을 각각 공식 API key 페이지로 조정했다.
- Provider 설정 상단에 GPT/OpenAI와 Gemini/Google fast lane을 추가했다.
- 터미널 시작 화면에 PTY, 작업 폴더, 검색/클립보드, AI 계정 설정 사용 카드를 추가했다.
- 문서에 터미널 세팅과 GPT/Gemini 설정 절차를 저장했다.

## 약한 출처/제외

- Reddit/커뮤니티 terminal UX 글은 adoption signal로만 보았고 구현 근거로 쓰지 않았다.
- consumer ChatGPT/Gemini 웹 로그인 자체를 API credential처럼 사용하는 비공식 흐름은 제외했다.
