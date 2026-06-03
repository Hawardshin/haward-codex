# Request Trace: Codex/Claude Desktop Reference

## Request

- `UR-2026-06-04-005`

## 요구 및 해석

- 사용자는 Codex 앱과 Claude Desktop 같은 실제 데스크톱 AI 앱을 참고하라고 했다.
- 구현 해석: 공식 공개 자료 기준으로 Codex app의 thread workbench와 Claude Desktop의 connector-first desktop extension/MCP 흐름을 제품 계약과 readiness에 반영한다.

## Implementation Targets

- `platform-desktop-app/configs/reference-platform-advantage-registry.json`
- `platform-desktop-app/configs/user-flow-registry.json`
- `platform-desktop-app/scripts/check-readiness.mjs`
- `platform-desktop-app/tests/readiness.test.mjs`
- `platform-desktop-app/docs/requirements/2026-06-04-codex-claude-desktop-reference.*.md`
- `platform-desktop-app/specs/2026-06-04-codex-claude-desktop-reference/`

## Outcome

- Codex app official features/commands/skills를 source link로 추가했다.
- Claude Desktop local MCP desktop extensions 공식 support 문서를 source link로 추가했다.
- `codex-style-thread-workbench`와 `claude-desktop-connector-first-chat` 전이 패턴을 추가했다.
- 사용자 흐름에 Codex app-style thread workbench, Claude Desktop-style connector chips, MCP servers, desktop extensions를 추가했다.
- readiness와 Node test가 새 패턴 누락을 확인하게 했다.

## Validation Targets

- JSON parse and config contract checks
- `corepack pnpm --filter platform-desktop-app test`
- `corepack pnpm --filter platform-desktop-app run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build:customer`
- `corepack pnpm --filter platform-desktop-app run customer-bundle:audit`
