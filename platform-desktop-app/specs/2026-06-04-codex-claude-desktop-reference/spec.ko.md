# 스펙: Codex/Claude Desktop 레퍼런스 반영

## 목적

사용자가 지적한 데스크톱 앱다운 UX 기준을 Codex app과 Claude Desktop 공식 자료에 근거해 제품 계약으로 고정한다.

## 기능 범위

- `reference-platform-advantage-registry.json`에 Codex app과 Claude Desktop source link를 추가한다.
- Codex app식 thread workbench 패턴을 추가한다.
- Claude Desktop식 connector-first chat 패턴을 추가한다.
- `user-flow-registry.json`에 MCP servers, desktop extensions, connector chips, Codex app-style thread workbench를 반영한다.
- readiness script와 Node test가 새 패턴을 강제한다.

## 비목표

- Codex app 또는 Claude Desktop UI를 복제하지 않는다.
- 외부 CLI, MCP server, desktop extension을 자동 설치하지 않는다.
- 이번 변경에서 connector chip 실제 렌더링 컴포넌트까지 만들지는 않는다.

## 수용 기준

- 레퍼런스 레지스트리가 `Codex app`, `Claude Desktop`, `codex-style-thread-workbench`, `claude-desktop-connector-first-chat`를 포함한다.
- 사용자 흐름 레지스트리가 `Codex app-style thread workbench`, `Claude Desktop-style connector chips`, `MCP servers`, `desktop extensions`를 포함한다.
- readiness와 test가 위 토큰을 검증한다.
