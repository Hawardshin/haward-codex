# Spec: Terminal and Provider Setup Usability

## 범위

- `ProviderAccountsPanel`에 GPT/OpenAI와 Gemini/Google fast lane을 추가한다.
- OpenAI/Gemini provider URL을 공식 API key 페이지 중심으로 조정한다.
- provider action row에서 cloud provider의 중복 setup/login 버튼을 하나로 합친다.
- `RuntimeTerminalDrawer` 시작 화면에 터미널 사용/세팅 카드 네 개를 추가한다.
- `platform-desktop-app/docs/usage/terminal-and-ai-provider-setup.ko.md`를 추가하고 README에서 연결한다.

## 비범위

- ChatGPT/Gemini 웹 세션 cookie 저장.
- OpenAI/Gemini key를 자동 발급하거나 브라우저에서 scraping.
- Vertex AI OAuth/ADC production provider flow 구현.
- 새 dependency 설치.

## 수용 기준

- GPT/OpenAI와 Gemini/Google fast lane에서 `로그인/키 발급` 버튼이 보인다.
- OpenAI/Gemini `login_url`은 각각 공식 API key page를 가리킨다.
- cloud provider row에는 중복된 setup/login 버튼 대신 하나의 primary setup action이 있다.
- 터미널 시작 탭에 PTY, 작업 폴더, 검색/클립보드, AI 계정 카드가 보인다.
- renderer tests/check/build와 desktop package verification이 통과한다.
