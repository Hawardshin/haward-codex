# 웹 검색 기록: 설치형 앱 UI/기능 레퍼런스 분석

## 검색 일시

- 날짜: 2026-06-02
- 요청: 앞서 찾은 설치형 앱 레퍼런스들의 UI와 기능을 더 자세히 분석해 달라는 요청.

## 쿼리

- `VS Code user interface terminal source control problems tasks official docs UI`
- `GitHub Desktop user interface changes history diff branch pull request official docs`
- `Docker Desktop dashboard integrated terminal extensions notification center official docs`
- `Raycast manual extensions snippets quicklinks AI extensions command palette official docs`
- `Warp agent platform terminal workflows sessions official docs UI`
- `Cursor docs agent mode chat composer rules MCP UI concepts official`
- `OpenCode desktop app multi-session LSP providers official docs UI`
- `Gemini CLI interactive commands resume MCP extensions memory official docs`
- `github google-gemini gemini-cli README official memory MCP resume commands`
- `github openai codex CLI README official docs local coding agent`
- `Tauri official docs distribute macOS signing notarization updater`
- `Electron official docs desktop app distribution auto updater macOS`
- `Monaco Editor official npm package xterm.js official docs`

## 확인한 주요 출처

- VS Code User Interface: https://code.visualstudio.com/docs/getstarted/userinterface
- VS Code Integrated Terminal: https://code.visualstudio.com/docs/terminal/getting-started
- VS Code Source Control: https://code.visualstudio.com/docs/sourcecontrol/overview
- VS Code Webviews UX Guidelines: https://code.visualstudio.com/api/ux-guidelines/webviews
- GitHub Desktop docs: https://docs.github.com/desktop
- Docker Desktop docs: https://docs.docker.com/desktop/use-desktop/
- Docker Extensions docs: https://docs.docker.com/extensions/
- Raycast Manual: https://manual.raycast.com/
- Warp Agent Platform docs: https://docs.warp.dev/agent-platform/
- Cursor docs: https://cursor.com/docs
- OpenCode official site: https://opencode.ai/
- Gemini CLI official repository: https://github.com/google-gemini/gemini-cli
- OpenAI Codex official repository: https://github.com/openai/codex
- Tauri distribution docs: https://v2.tauri.app/distribute/
- Electron docs: https://www.electronjs.org/docs/latest/
- xterm.js docs: https://xtermjs.org/docs/
- Monaco Editor package docs: https://www.npmjs.com/package/monaco-editor

## 출처 랭킹

- 1순위: 공식 문서, 공식 저장소, 공식 제품 사이트.
- 2순위: 기존 로컬 아키텍처 문서와 사용자 요구사항.
- 제외: 일반 블로그, 뉴스, 커뮤니티 의견은 이번 UI/기능 분석의 직접 근거로 사용하지 않았다.

## 계획 영향

- VS Code는 activity/workbench/terminal/source-control 패턴만 채택하고, 전체 에디터 제품으로 복제하지 않는다.
- GitHub Desktop은 변경 검토와 diff/commit 안정성 패턴의 근거가 된다.
- Docker Desktop은 capability center, extension, troubleshooting, health/recovery surface의 근거가 된다.
- Raycast는 command palette와 low-friction action routing의 근거가 된다.
- Warp, Cursor, OpenCode는 agent lane, session, checkpoint, multi-provider orchestration의 근거가 된다.
- Gemini CLI와 Codex CLI는 optional adapter contract와 resume/memory/session 차이를 보존해야 한다는 근거가 된다.
- Tauri/Electron, xterm.js, Monaco는 설치형 shell, terminal surface, code editor surface를 직접 구현하지 않고 검증된 오픈소스 surface를 붙이는 근거가 된다.

## 불확실성

- Cursor, Warp, OpenCode 같은 AI 제품 문서는 빠르게 바뀐다. 실제 화면 고정 전에는 스크린샷 기반 hands-on benchmark를 한 번 더 해야 한다.
- 이 작업은 UI/기능 분석이며, 새 패키지 설치나 앱 UI 구현은 하지 않았다.
