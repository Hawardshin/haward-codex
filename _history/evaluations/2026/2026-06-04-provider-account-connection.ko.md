# 평가: Provider 계정 연결

## 결과

- OpenAI/ChatGPT, Anthropic/Claude, Google/Gemini 계정 연결을 Settings > Initialize > Provider accounts에 추가했다.
- Tauri native command 4개로 provider credential 조회/저장/삭제/공식 URL 열기를 구현했다.
- 저장된 credential은 `app_config/provider-credentials/provider-credentials.v1.json`에 분리하고, report/UI에는 원문 대신 상태와 preview만 노출한다.
- 저장된 key는 guest CLI adapter 실행 시 matching env var로 주입된다.
- Runtime contract, readiness, user-flow/product/service/runtime registries, requirements/spec/history를 갱신했다.

## 요구 충족 평가

- 사용자는 설정 버튼 하나에서 provider 계정 연결을 찾을 수 있다.
- ChatGPT/Claude/Gemini 웹 세션을 임베드하지 않고 공식 API key/auth 기준으로 구현했다.
- 앱 실행 화면의 adapter card에도 `계정 연결` 진입과 인증 상태가 보인다.
- 브라우저 smoke에서 provider panel, 3개 provider row, 3개 환경변수 표시를 확인했다.

## 검증

- `cargo check` passed
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check` passed
- `corepack pnpm --filter platform-desktop-app test` passed
- `corepack pnpm --filter platform-desktop-app run check` passed
- `corepack pnpm --filter workspace-monitor test` passed
- `corepack pnpm --filter workspace-monitor run build:customer` passed
- changed config contract checks passed
- Browser smoke passed

## 남은 리스크

- public release 전에는 local secret file storage를 OS keychain/credential manager adapter로 교체해야 한다.
- provider별 CLI 자체 로그인 저장소와 앱 저장 credential의 우선순위 안내를 더 명확히 할 필요가 있다.
- 이번 slice는 key 유효성 API 호출까지 하지 않는다.
