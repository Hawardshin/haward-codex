# 쉬운 AI 로그인 설정 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-126 | 설정 화면은 AI provider 연결을 공식 로그인, API key 발급, 앱 저장, 모델 확인, 작업 기본값 선택 순서로 한 화면에서 처리할 수 있어야 한다. | must | `ProviderAccountsPanel`, `provider-login-guide` |
| REQ-PDA-127 | OpenAI, Anthropic, Google Gemini는 비공식 웹 세션이나 쿠키가 아니라 공식 콘솔/API key 흐름으로 안내해야 한다. | must | provider `setupUrl`, `loginUrl`, `docsUrl` |
| REQ-PDA-128 | Ollama는 cloud login처럼 보이지 않게 로컬 런타임으로 분리하고, 로컬 API endpoint와 모델 확인 흐름을 노출해야 한다. | must | `local_http`, `list_provider_models`, `127.0.0.1:11434` |
| REQ-PDA-129 | 사용자는 연결 필요, 연결됨, 로컬 provider를 클릭 기반 필터로 좁혀 설정 대상을 빨리 찾을 수 있어야 한다. | should | `provider-filter-choice` |
| REQ-PDA-130 | 모델 확인 결과는 설정 화면에서 바로 보이고, 사용자가 provider/model을 에이전트 작업 기본값으로 선택할 수 있어야 한다. | should | `provider-model-strip`, `onUseProvider` |

## 공식 근거

- OpenAI API는 `Authorization: Bearer` 기반 API key 또는 access token 인증을 사용한다.
- Anthropic Claude API는 Console 계정과 API key 또는 Workload Identity Federation rule을 전제로 한다.
- Google Gemini API는 Google AI Studio에서 Gemini API key를 만들고 `GEMINI_API_KEY` 등으로 사용할 수 있다.
- Ollama는 설치 후 기본 로컬 API가 `http://localhost:11434/api`에서 제공된다.

## 범위 결정

- 이번 작업은 앱 내부 OAuth provider를 새로 만들지 않는다.
- 공식 provider 페이지를 시스템 브라우저로 열고, 앱에는 사용자가 발급한 key를 직접 저장한다.
- 저장된 key 원문을 화면, snapshot, history, support bundle에 기록하지 않는다.
- provider model 확인은 기존 static/default catalog와 Ollama local tags 조회 경로를 재사용한다.
