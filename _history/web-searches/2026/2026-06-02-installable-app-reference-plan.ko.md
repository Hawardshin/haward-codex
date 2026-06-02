# 웹 검색 기록: 설치형 앱 레퍼런스와 구현 계획

## 검색 일시

- 날짜: 2026-06-02
- 요청: 구현 계획과 새로운 아이디어를 위해 다른 설치형 앱 레퍼런스를 찾아 달라는 요청.

## 쿼리

- `VS Code integrated terminal tasks extensions official docs`
- `Cursor AI code editor features docs command palette agents`
- `Warp terminal agentic development AI terminal docs workflows`
- `Raycast extensions quicklinks snippets AI official docs`
- `VS Code integrated terminal official documentation shell integration tasks problems`
- `Visual Studio Code extension API webviews tree view terminal official docs`
- `Docker Desktop extensions dashboard official docs`
- `GitHub Desktop features official docs app repository history changes`
- `Tauri v2 macOS bundle updater code signing notarization official docs`
- `Electron autoUpdater code signing macOS notarization official docs`
- `Monaco Editor official docs integrate editor npm`
- `xterm.js addon fit serialize web links official docs`
- `Claude Code hooks slash commands subagents memory MCP official docs`
- `Gemini CLI official docs GitHub Google AI command line agent`
- `OpenCode AI coding agent official docs terminal`
- `Codex CLI official docs OpenAI GitHub`

## 확인한 주요 출처

- VS Code Terminal docs: https://code.visualstudio.com/docs/terminal/getting-started
- VS Code Shell Integration docs: https://code.visualstudio.com/docs/terminal/shell-integration
- VS Code Webviews UX docs: https://code.visualstudio.com/api/ux-guidelines/webviews
- GitHub Desktop docs: https://docs.github.com/desktop
- Docker Desktop docs: https://docs.docker.com/desktop/use-desktop/
- Docker Extensions docs: https://docs.docker.com/extensions/
- Warp Agent Platform docs: https://docs.warp.dev/agent-platform/
- Cursor docs: https://cursor.com/docs
- Gemini CLI README/docs: https://github.com/google-gemini/gemini-cli
- OpenCode official site: https://opencode.ai/
- OpenAI Codex GitHub repo: https://github.com/openai/codex
- Tauri distribution docs: https://v2.tauri.app/distribute/
- Tauri updater docs: https://v2.tauri.app/plugin/updater/
- Electron code signing docs: https://www.electronjs.org/docs/latest/tutorial/code-signing
- Electron autoUpdater docs: https://www.electronjs.org/docs/latest/api/auto-updater
- xterm.js docs: https://xtermjs.org/docs/
- Monaco Editor npm/GitHub docs: https://www.npmjs.com/package/monaco-editor

## 계획 영향

- 구현은 Tauri-first 방향을 유지한다. Tauri 공식 문서가 platform-specific installers, signing, macOS notarization 필요성을 명확히 설명하기 때문이다.
- VS Code와 Docker Desktop은 integrated terminal, shell/session persistence, extension/marketplace, docs/search-in-app 패턴을 참고한다.
- GitHub Desktop은 변경/히스토리/브랜치/PR을 GUI로 안전하게 보여주는 pattern 참고 대상이다.
- Warp, Cursor, OpenCode는 agent lane, session, multi-agent orchestration, terminal-first agent UX 참고 대상이다.
- Raycast는 setup-heavy 앱이 아니라 command palette, extension/action, quick command 형태로 복잡한 기능을 낮은 마찰로 제공하는 참고 대상이다.
- Monaco와 xterm.js는 직접 구현보다 오픈소스 surface를 붙이는 방향의 후보로 유지한다.

## 약한 출처 처리

- Reddit, 일반 블로그, 뉴스성 글은 아이디어/사용자 신호로만 사용했다.
- 공식 문서, 공식 GitHub, 프로젝트 공식 사이트를 구현 근거로 우선했다.

## 불확실성

- Cursor/일부 agent 제품의 2026 최신 기능은 웹 문서가 동적으로 갱신되므로, 실제 경쟁 기능은 후속 UI/UX 벤치마크에서 스크린샷 기반으로 재검증해야 한다.
- Rust/Tauri toolchain이 아직 설치되지 않아 실제 `.app` packaging 검증은 이번 조사 범위가 아니다.
