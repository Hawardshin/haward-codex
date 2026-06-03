# 제공자 계정 연결 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-PDA-076 | 데스크톱 앱은 ChatGPT/OpenAI, Claude/Anthropic, Gemini/Google 계정 연결을 설정 화면에서 직접 관리할 수 있어야 한다. | must | `ProviderAccountsPanel`, `list_provider_credentials` |
| REQ-PDA-077 | 계정 연결은 비공식 웹 세션 쿠키나 임베드 로그인에 의존하지 않고, provider별 공식 API key 또는 공식 인증 흐름을 기준으로 해야 한다. | must | provider docs links, `setupUrl`, `docsUrl` |
| REQ-PDA-078 | 저장된 provider credential은 UI/report/support bundle에 원문을 노출하지 않고, 짧은 preview와 연결 상태만 보여야 한다. | must | `ProviderCredentialSummary`, `credential_secret_preview`, support export exclusions |
| REQ-PDA-079 | 저장된 credential은 선택된 guest CLI adapter 실행 시 해당 provider 환경변수로 주입되어 실제 작업 실행에 쓰여야 한다. | must | `provider_env_for_adapter`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY` |
| REQ-PDA-080 | 사용자는 각 provider row에서 공식 키 발급, 로그인, 문서 링크를 열고, API key 저장/삭제/새로고침을 할 수 있어야 한다. | must | `open_provider_auth_url`, settings provider actions |
| REQ-PDA-081 | provider credential store는 앱 config 영역에 분리하고 runtime data boundary와 service readiness에 상태를 노출해야 한다. | should | `provider_credentials_path`, `provider_credential_store`, service readiness |

## 결정

- ChatGPT, Claude, Gemini 웹앱을 WebView로 임베드하거나 쿠키를 탈취하는 구조는 구현하지 않는다.
- 이번 slice는 local app config secret file을 storage adapter로 사용하고, public release 전에는 OS keychain/credential manager adapter로 교체한다.
- 저장된 key는 adapter별로 필요한 환경변수에만 주입한다.
- provider credential이 없더라도 앱 전체를 막지 않고, 실행 화면과 설정 화면에서 `계정 필요` 상태를 보여준다.
