# 검증: Provider 계정 연결

## 실행 명령

- `cargo check` from `platform-desktop-app/src-tauri` - passed
- `node -e` JSON parse checks for changed config/contract files - passed
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ...` for changed registries - passed
- `corepack pnpm --dir platform-desktop-app/renderer/workspace-monitor run check` - passed
- `corepack pnpm --filter platform-desktop-app test` - passed
- `corepack pnpm --filter platform-desktop-app run check` - passed
- `corepack pnpm --filter workspace-monitor test` - passed
- `corepack pnpm --filter workspace-monitor run build:customer` - passed
- Browser smoke for Settings > Initialize > Provider accounts - passed

## 수동 확인 항목

- API key 입력칸은 password type이고 저장 후 비워진다.
- Provider report에는 raw secret이 포함되지 않는다.
- 환경변수 주입은 matching adapter에만 적용된다.
- credential store는 support bundle에 포함되지 않는다.

## Browser smoke

- URL: `http://127.0.0.1:4173/`
- 확인: 설정 > 초기화 > 계정 연결에서 `ChatGPT / OpenAI`, `Claude / Anthropic`, `Gemini / Google` row와 `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`가 보임.
- Screenshot: `outputs/provider-account-connection-smoke.png`
