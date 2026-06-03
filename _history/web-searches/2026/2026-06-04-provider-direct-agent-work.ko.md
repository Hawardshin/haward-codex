# Web Search: Provider Direct Agent Work

## 요청

- 연결된 Gemini, Claude, ChatGPT 계정을 기반으로 실제 작업도 수행해야 한다는 후속 요구.

## 검색 쿼리

- `OpenAI API authentication API key environment variable official docs`
- `Anthropic API authentication API key environment variable official docs`
- `Gemini API key environment variable official docs AI Studio official`
- `OpenAI Responses API create response official docs input model`
- `Anthropic Messages API official docs model max_tokens messages create`
- `Gemini API generateContent REST API official docs`

## 확인한 강한 출처

- OpenAI API authentication: `https://platform.openai.com/docs/api-reference/authentication/keys`
- OpenAI Responses API reference: `https://platform.openai.com/docs/api-reference/responses`
- Anthropic Messages API reference: `https://docs.claude.com/en/api/messages`
- Anthropic authentication overview: `https://platform.claude.com/docs/en/api/authentication/overview`
- Gemini generateContent API reference: `https://ai.google.dev/api/generate-content`
- Gemini API key guide: `https://ai.google.dev/gemini-api/docs/api-key`

## 구현 영향

- 저장된 provider credential을 CLI 환경변수로만 쓰지 않고, Tauri 백엔드의 allowlisted REST API 호출에도 사용한다.
- OpenAI는 Responses API, Anthropic은 Messages API, Gemini는 generateContent API를 provider별 함수로 분리한다.
- 직접 API 작업 결과는 기존 task-run store 형식으로 저장해 축적 데이터/지원 진단/실행 기록 흐름과 연결한다.
- 사용자 API key가 없는 자동 검증 환경에서는 live API 호출을 하지 않고 command registration, persistence, secret redaction, UI token, type/compile 검증을 수행한다.

## 약한 출처/무시한 신호

- 비공식 SDK 예제, 블로그, consumer web login 우회 방식은 구현 근거로 쓰지 않았다.
- GitHub issue나 커뮤니티 신호는 이번 slice의 endpoint/auth 결정에 필요하지 않았다.

## 불확실성

- provider별 최신 기본 모델은 시간이 지나며 바뀔 수 있으므로 UI에서 모델 문자열을 수정 가능하게 둔다.
- public release 전에는 local app config secret file에서 OS keychain/credential manager storage adapter로 바꾸는 보안 작업이 필요하다.
