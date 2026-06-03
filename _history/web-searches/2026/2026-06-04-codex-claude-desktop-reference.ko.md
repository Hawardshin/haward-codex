# Web Search Record: Codex/Claude Desktop Reference

- 날짜: 2026-06-04
- 요청: Codex 앱과 Claude Desktop 같은 실제 데스크톱 AI 앱을 참고해 현재 플랫폼 UX에 반영.

## Queries

- `Claude Desktop official docs desktop app MCP projects artifacts`
- `Claude Desktop official support MCP connectors projects artifacts desktop app`
- `Claude Desktop MCP official documentation Anthropic`
- `OpenAI Codex app features official manual Codex app commands`
- `site:developers.openai.com/codex Codex app command palette terminal worktree desktop app official manual`
- `site:support.anthropic.com Claude Desktop desktop app official docs MCP local servers settings developer mode`

## Checked Sources

- Codex app features: https://developers.openai.com/codex/app/features
- Codex app commands: https://developers.openai.com/codex/app/commands
- Codex agent skills: https://developers.openai.com/codex/skills
- Claude Desktop local MCP servers and desktop extensions: https://support.claude.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop

## Weak Sources Ignored Or Downgraded

- 비공식 블로그/비교 글은 이번 제품 계약의 근거로 사용하지 않았다.
- Claude Desktop 화면 캡처나 비공식 UX 묘사는 공식 support 문서로 확인되는 MCP/extension flow만 전이했다.

## Plan Impact

- `reference-platform-advantage-registry.json`에 Codex app source links와 `codex-style-thread-workbench`를 추가했다.
- `reference-platform-advantage-registry.json`에 Claude Desktop local MCP extension source와 `claude-desktop-connector-first-chat`을 추가했다.
- `user-flow-registry.json`에 Codex app-style thread workbench, Claude Desktop-style connector chips, MCP servers, desktop extensions를 반영했다.
- readiness와 Node test가 새 레퍼런스 토큰을 확인하도록 했다.

## Uncertainty

- Claude Desktop desktop extension 문서가 beta 상태를 명시하므로, 실제 구현 시 connector UI에는 beta/위험 상태와 조직 allowlist를 같이 표시해야 한다.
- Codex app의 exact UI를 복제하지 않고 thread/workbench 구조만 전이한다.
