# Provider Account Auth Official Sources

## 요약

데스크톱 앱의 provider 연결은 비공식 웹 세션 임베드가 아니라 공식 API key 또는 provider-supported OAuth/native auth flow를 기준으로 설계해야 한다.

## 출처

| Provider | 공식 출처 | 확인 내용 | 한계 |
| --- | --- | --- | --- |
| OpenAI / ChatGPT | `https://platform.openai.com/docs/api-reference/authentication/keys` | OpenAI API 인증은 API key 기반이며 request에 인증 헤더를 사용한다. | ChatGPT consumer web session을 제3자 데스크톱 앱에 임베드하는 일반 공식 흐름은 확인하지 못했다. |
| Anthropic / Claude | `https://platform.claude.com/docs/en/api/authentication/overview` | Claude API는 API key 및 `ANTHROPIC_API_KEY` 환경변수 사용을 안내한다. | Claude.ai consumer login을 제3자 앱 credential로 저장하는 흐름은 별도 공식 근거가 필요하다. |
| Google / Gemini | `https://ai.google.dev/gemini-api/docs/api-key` | Gemini API key와 `GEMINI_API_KEY`/`GOOGLE_API_KEY` 환경변수 사용을 안내한다. | OAuth desktop app은 별도 client configuration이 필요하다. |
| Google OAuth native app | `https://developers.google.com/identity/protocols/oauth2/native-app` | 네이티브/데스크톱 앱 OAuth는 system browser와 redirect/PKCE 흐름을 사용한다. | 이번 slice에는 OAuth client ID가 없어 API key 연결만 구현했다. |

## 계획 영향

- provider credential UI는 공식 key 발급/로그인/문서 링크를 제공한다.
- saved credential report는 raw secret을 절대 노출하지 않는다.
- guest adapter 실행 시 matching provider env var만 child process에 주입한다.
