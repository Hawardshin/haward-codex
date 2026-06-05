# Web Search: 쉬운 AI 로그인 설정

- 날짜: 2026-06-06
- 작업: `platform-desktop-app` 설정 화면에서 AI provider 로그인/API key 설정을 쉽게 만드는 UX 개선

## 질의

- `OpenAI API keys official documentation create API key`
- `Anthropic API key official documentation console create key`
- `Google AI Studio Gemini API key official documentation`
- `Ollama API official documentation local server`

## 확인한 공식 출처

- OpenAI API reference: https://platform.openai.com/docs/api-reference/authentication/keys
- Anthropic Claude API overview: https://docs.anthropic.com/en/api/getting-started
- Google Gemini API key docs: https://ai.google.dev/gemini-api/docs/api-key
- Ollama API introduction: https://docs.ollama.com/api/introduction

## 구현 영향

- OpenAI는 API 요청에 bearer API key/access token 인증을 사용하므로, 앱 안에서 ChatGPT 웹 세션을 임베드하는 대신 공식 key page와 저장 UI를 제공한다.
- Anthropic은 Claude Console 계정과 API key 또는 Workload Identity Federation을 요구하므로, 일반 사용자 설정은 Console/API key 흐름으로 둔다.
- Gemini는 Google AI Studio API keys page에서 key를 만들고 `GEMINI_API_KEY`로 사용할 수 있으므로, provider 설정은 AI Studio key 발급과 앱 저장으로 안내한다.
- Ollama는 설치 후 기본 API가 `http://localhost:11434/api`에 제공되므로, cloud login provider가 아니라 로컬 런타임 provider로 분리한다.

## 불확실성

- OpenAI/Anthropic/Google의 공식 OAuth app 등록은 현재 이 제품의 public release scope가 아니므로 구현하지 않았다.
- 저장소는 기존 local app config secret file을 유지했다. public release에서는 OS keychain adapter migration이 별도 과제다.
