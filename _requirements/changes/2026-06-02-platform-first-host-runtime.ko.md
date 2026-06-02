# Platform-First Host Runtime Requirement Change

- 날짜: 2026-06-02
- 요청: 플랫폼이 먼저 실행되고 Codex/Gemini CLI/Claude CLI 같은 도구를 그 위에 올리는 구조로 전환.
- 변경 유형: durable product/runtime identity change

## Added

- `PDA-REQ-026`: 설치형 플랫폼은 Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, Antigravity 같은 상용/외부 AI 도구 위에서 동작하는 종속 앱이 아니라 먼저 실행되는 platform-first host runtime이어야 한다.
- `PDA-UX-019`: 첫 실행과 Desktop 탭은 플랫폼이 먼저 실행되고 외부 AI CLI가 guest lane으로 붙는 관계를 명확히 보여야 한다.

## Non-Goals

- 외부 AI CLI를 필수 런타임으로 만들지 않는다.
- 외부 AI CLI를 자동 설치하거나 installer에 번들하지 않는다.
- 외부 AI 도구가 플랫폼의 durable memory, decision authority, validation gate를 소유하지 않는다.
