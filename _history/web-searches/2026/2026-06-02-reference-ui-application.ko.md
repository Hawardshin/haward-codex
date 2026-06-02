# 웹 검색 기록: 레퍼런스 UI 적용 구현

## 검색 일시

- 날짜: 2026-06-02
- 요청: 앞서 분석한 적용 가능한 레퍼런스를 실제 앱에 모두 적용해 달라는 요청.

## 쿼리

- `VS Code user interface command palette terminal source control official docs current`
- `Docker Desktop extensions marketplace integrated terminal official docs current`
- `Raycast extensions action panel snippets quicklinks official manual current`
- `GitHub Desktop diff changes history branch commit official docs current`
- `Warp Agent Platform docs terminal agent mode workflows sessions official current`
- `Cursor docs agent mode checkpoints terminal diff review rules memory current`
- `OpenCode docs multi session providers LSP terminal official current`
- `Gemini CLI docs MCP memory resume command official current`

## 확인한 주요 출처

- VS Code User Interface: https://code.visualstudio.com/docs/getstarted/userinterface
- Docker Desktop: https://docs.docker.com/desktop/use-desktop/
- Docker Extensions: https://docs.docker.com/extensions/
- Raycast Extensions: https://manual.raycast.com/extensions
- Raycast Snippets/Quicklinks: https://manual.raycast.com/snippets/how-to-import-snippets, https://manual.raycast.com/quicklinks/how-to-import-quicklinks
- GitHub Desktop change review: https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop
- Warp Agents: https://docs.warp.dev/agents
- Warp full terminal use: https://docs.warp.dev/agents/full-terminal-use
- Cursor Checkpoints: https://docs.cursor.com/en/agent/chat/checkpoints
- Cursor CLI: https://docs.cursor.com/en/cli/using
- Gemini CLI: https://github.com/google-gemini/gemini-cli

## 계획 영향

- VS Code/Raycast 참고: `Command Palette` 빠른 실행 surface를 추가한다.
- Docker/Raycast 참고: CLI adapter를 `Capability Center` card와 setup-later 상태로 보여준다.
- Warp/Cursor/OpenCode 참고: session 목록을 `Run Board`, lane timeline, process graph로 보여준다.
- Warp/VS Code 참고: raw terminal output만 보여주지 않고 question/error/warning/test/file event rail을 추가한다.
- GitHub Desktop/Cursor 참고: source editor에 diff summary/review gate를 추가한다.
- Cursor/HITL 참고: decision inbox를 session/source별 group과 replay metadata로 보여준다.
- Knowledge/promotion 요구사항 참고: evidence/promotion surface를 추가한다.

## 약한 출처 처리

- Reddit과 일반 블로그는 직접 구현 근거로 사용하지 않았다.
- 공식 문서와 기존 local spec/requirements를 구현 기준으로 사용했다.

## 불확실성

- xterm.js, Monaco, PTY는 기존 스펙상 설치 감사 이후 단계로 남겼다.
- 이번 구현은 새 dependency 설치 없이 현재 React/Next/Tauri command 계약 위에서 적용 가능한 UI/정보구조를 반영했다.
