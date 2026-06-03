# 스펙: Provider 계정 연결

## 목적

사용자가 데스크톱 앱 안에서 ChatGPT/OpenAI, Claude/Anthropic, Gemini/Google 연결 상태를 직접 관리하고, 저장된 credential이 실제 guest CLI 실행에 반영되게 한다.

## 기능 범위

- Tauri command: `list_provider_credentials`, `save_provider_credential`, `clear_provider_credential`, `open_provider_auth_url`.
- Provider registry: OpenAI, Anthropic, Google Gemini의 label, auth method, env var, setup/login/docs URL.
- Credential store: `app_config/provider-credentials/provider-credentials.v1.json`.
- Renderer: Settings > Initialize > Provider accounts 패널.
- CLI 실행: 선택 adapter에 맞춰 `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`를 child process env로 주입.
- Runtime/service: runtime data boundary와 service readiness에 credential store/연결 상태를 표시.

## 비목표

- ChatGPT/Claude/Gemini 웹앱을 앱 내부 WebView로 임베드하지 않는다.
- provider consumer web session cookie나 비공식 token을 저장하지 않는다.
- 이번 slice에서 OS keychain adapter를 도입하지 않는다.
- provider API에 test call을 보내 key 유효성을 검증하지 않는다.

## 수용 기준

- 설정에서 3개 provider row가 보이고 키 저장/삭제/새로고침/공식 링크 열기가 가능하다.
- 저장 후 UI에는 secret 원문이 남지 않고 preview만 보인다.
- CLI session 시작 시 저장된 key가 matching adapter env로 주입된다.
- readiness 테스트가 provider commands, schema, env vars, renderer panel, contract target을 확인한다.
