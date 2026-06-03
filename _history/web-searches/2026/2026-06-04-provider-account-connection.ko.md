# Web Search: Provider Account Connection

## 요청

- 데스크톱 앱 안에서 Gemini, Claude, ChatGPT에 직접 로그인/연결할 수 있게 해 달라는 요청.

## 검색 쿼리

- `OpenAI API key authentication official documentation`
- `Anthropic API keys authentication official documentation`
- `Gemini API key official documentation Google AI for Developers`
- `OpenAI official API authentication API keys OAuth ChatGPT login third party desktop app docs`
- `Anthropic Claude official API authentication API keys OAuth desktop app docs`
- `Google Gemini API official authentication API key OAuth desktop app docs`

## 확인한 강한 출처

- OpenAI API authentication: `https://platform.openai.com/docs/api-reference/authentication/keys`
- Anthropic Claude API authentication: `https://platform.claude.com/docs/en/api/authentication/overview`
- Gemini API key guide: `https://ai.google.dev/gemini-api/docs/api-key`
- Google OAuth native apps: `https://developers.google.com/identity/protocols/oauth2/native-app`

## 구현 영향

- ChatGPT/Claude/Gemini 웹앱을 WebView로 임베드하거나 브라우저 쿠키를 저장하는 방식은 채택하지 않았다.
- 공식 API key 중심의 provider credential 연결 UI를 구현했다.
- 저장된 key는 report/UI/support bundle에 원문을 노출하지 않고, guest CLI 실행 시 provider별 환경변수로만 주입하도록 결정했다.
- Gemini는 API key와 별도로 OAuth native app 흐름이 존재하지만, 이번 slice에서는 client ID/redirect URI가 없는 상태이므로 API key 연결을 먼저 구현하고 OAuth는 별도 provider flow로 남겼다.

## 약한 출처/무시한 신호

- Reddit, 뉴스 기사, 일반 블로그는 API key 유출 위험이나 사용성 신호로만 참고 가능하며, 구현 근거로 사용하지 않았다.
- provider 소비자 웹앱 로그인 쿠키를 제3자 앱이 저장하는 공식 패턴은 확인하지 못했다.

## 불확실성

- public release 전에는 local app config secret file 대신 OS keychain/credential manager adapter로 교체해야 한다.
- provider별 CLI가 자체 로그인 저장소를 갖는 경우, 앱 저장 credential과 CLI 자체 로그인 간 우선순위 안내가 추가로 필요하다.
