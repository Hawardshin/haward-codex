# Request Trace: Provider Account Connection

## Request

- `UR-2026-06-04-006`

## 요구 및 해석

- 사용자는 데스크톱 앱 안에서 Gemini, Claude, ChatGPT에 직접 로그인할 수 있기를 원했다.
- 구현 해석: 비공식 WebView 로그인/쿠키 저장이 아니라 공식 API key 또는 공식 인증 흐름을 기준으로 provider account connection을 Settings에 구현하고, 저장된 credential이 실제 guest CLI 실행에 반영되게 한다.

## Implementation Targets

- `platform-desktop-app/src-tauri/src/lib.rs`
- `platform-desktop-app/renderer/workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/renderer/workspace-monitor/app/globals.css`
- `platform-desktop-app/runtime-contracts/installer-shell-runtime-contract.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/configs/product-feature-registry.json`
- `platform-desktop-app/configs/service-readiness-registry.json`
- `platform-desktop-app/configs/runtime-data-boundary-registry.json`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-04-provider-account-connection.*.md`
- `platform-desktop-app/specs/2026-06-04-provider-account-connection/`

## Outcome

- Settings > Initialize > Provider accounts를 추가했다.
- OpenAI/ChatGPT, Anthropic/Claude, Google/Gemini provider row에서 공식 키 발급, 로그인, 문서 링크, key 저장/삭제/새로고침을 제공한다.
- Tauri에 `list_provider_credentials`, `save_provider_credential`, `clear_provider_credential`, `open_provider_auth_url` 명령을 추가했다.
- 저장된 key는 app config credential store에 두고, UI/report에는 preview와 상태만 노출한다.
- CLI session 시작 시 adapter별로 `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`를 matching child process env에 주입한다.
- Runtime contract, data boundary, service readiness, product/user-flow registries, readiness tests를 갱신했다.

## Validation Targets

- `cargo check`
- JSON parse/config contract checks
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check`
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- Browser smoke for Settings > Initialize > Provider accounts
