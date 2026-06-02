# 웹 검색 기록: Claude Code 공개 설계 전이

## 검색

- 날짜: 2026-06-03
- 목적: Claude Code에서 이 플랫폼에 차용할 수 있는 설계 패턴을 공개/공식 출처로만 확인한다.
- 쿼리:
  - `Claude Code official docs permissions hooks slash commands subagents memory MCP`
  - `Claude Code official docs best practices plan mode todo list`
  - `Claude Code official docs settings permissions memory hooks`
  - `Claude Code official docs subagents model context protocol`

## 확인한 출처

- Anthropic Claude Code Overview: `https://code.claude.com/docs/en/overview`
- Claude Code Settings: `https://code.claude.com/docs/en/settings`
- Claude Code Memory: `https://code.claude.com/docs/en/memory`
- Claude Code Hooks: `https://code.claude.com/docs/en/hooks`
- Claude Code Slash Commands / Skills: `https://code.claude.com/docs/en/slash-commands`
- Claude Code Subagents: `https://code.claude.com/docs/en/sub-agents`
- Claude Code MCP: `https://code.claude.com/docs/en/mcp`
- Claude Code Common Workflows: `https://code.claude.com/docs/en/common-workflows`

## 약한 출처와 배제

- 유출 자료, 비공개 시스템 프롬프트, 검증 불가능한 스크린샷, 내부 설계 문서는 사용하지 않았다.
- 커뮤니티 반응이나 소셜 신호는 이번 구현의 factual evidence로 쓰지 않았다.

## 계획 영향

- `public_sources_only` source boundary를 새 registry에 명시했다.
- 차용 패턴을 permissioned tool execution, plan before edit, durable instruction memory, subagent context isolation, MCP connector boundary, hook event automation, skill on-demand packaging, parallel worktree sessions로 제한했다.
- 실제 connector/hook/worktree runtime 구현은 이번 slice에서 제외하고, registry와 Workspace Monitor 노출까지 구현했다.

## 불확실성

- Claude Code 공식 문서는 계속 바뀔 수 있으므로 `last_checked=2026-06-03`으로 기록했다.
- 공개 문서에서 직접 확인되지 않는 세부 동작은 구현 근거로 사용하지 않았다.
