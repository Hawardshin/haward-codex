# 웹 검색 기록: 다중 CLI 데스크톱 오케스트레이션

## 검색 목적

설치형 데스크톱 앱이 Claude Code CLI, Gemini CLI, Codex CLI, OpenCode를 optional adapter로 다루고, 터미널/소스편집/프로세스 실행을 오픈소스 구성요소와 공식 문서에 기반해 설계할 수 있는지 확인했다.

## 검색 쿼리

- `Tauri macOS permissions shell sidecar pty terminal app official docs 2026`
- `Electron node-pty xterm.js monaco editor desktop app official docs`
- `Claude Code CLI official documentation terminal output hooks MCP 2026`
- `Google Gemini CLI official GitHub documentation 2026`
- `OpenCode AI CLI official documentation GitHub 2026`
- `OpenAI Codex CLI official GitHub documentation 2026`
- `xterm.js official documentation terminal emulator browser addon fit webgl`
- `Monaco Editor official documentation standalone editor Electron Tauri`
- `Zed Agent Client Protocol official documentation AI agent CLI integration`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 계획 영향 |
| --- | --- | --- | --- |
| `https://code.claude.com/docs/en/overview` | 공식 문서 | Claude Code가 terminal, IDE, desktop, web surface와 MCP/hooks/skills/multi-agent 맥락을 제공한다. | Claude Code를 optional adapter 후보로 명시한다. |
| `https://github.com/google-gemini/gemini-cli` | 공식 repo | Gemini CLI는 terminal 기반 open-source AI agent로 확인했다. | Gemini CLI를 concrete adapter 후보에 추가한다. |
| `https://github.com/openai/codex` | 공식 repo | Codex CLI 설치/실행 명령과 desktop app 언급을 확인했다. | Codex CLI를 optional adapter 후보로 둔다. |
| `https://opencode.ai/docs/` | 공식 문서 | OpenCode는 terminal interface, desktop app, IDE extension과 provider key 설정을 문서화한다. | OpenCode를 adapter 후보로 추가하고 provider-key posture를 기록한다. |
| `https://v2.tauri.app/plugin/shell/` | 공식 문서 | Tauri shell plugin은 child process spawn과 scoped permissions를 요구한다. | desktop-originated command 실행은 permission/allowlist 전까지 구현하지 않는다. |
| `https://v2.tauri.app/develop/sidecar/` | 공식 문서 | Tauri sidecar는 외부 binary와 Python CLI/API server 번들링 패턴을 설명한다. | supervisor/agent-platform service sidecar는 후보로만 둔다. |
| `https://xtermjs.org/docs/` | 공식 문서 | xterm.js terminal emulator 문서와 terminal sequence/addon 표면을 확인했다. | terminal UI 후보로 기록한다. |
| `https://github.com/microsoft/node-pty` | 공식 repo | node-pty는 pseudo-terminal process binding이며 보안/권한 주의가 필요하다. | Tauri 기본 선택이 아니라 Electron/Node supervisor 후보로 기록한다. |
| `https://github.com/microsoft/monaco-editor` | 공식 repo | Monaco는 VS Code에서 나온 browser-based editor이고 model/URI/dispose/worker 제약이 있다. | source editor 후보로 기록하되 dependency audit 전 설치하지 않는다. |
| `https://agentclientprotocol.com/get-started/introduction` | 공식 문서 | ACP는 editor/IDE와 coding agent 통신 표준화, local subprocess JSON-RPC over stdio를 설명한다. | 향후 editor-agent interoperability 후보로만 둔다. |

## 약한 출처 제외

- 블로그/홍보성 비교 글은 이번 설계에 직접 사용하지 않았다.
- GitHub stars, issues, reactions는 adoption/discovery signal로만 보고 사실 근거로 쓰지 않았다.

## 계획 반영

- 네 AI CLI는 필수 dependency가 아니라 optional adapter로 등록한다.
- 실제 multi-CLI 실행은 Tauri shell/sidecar/PTY 권한과 lifecycle 설계 전까지 구현하지 않는다.
- terminal UI는 xterm.js, source editor는 Monaco 후보를 우선 기록한다.
- raw terminal output은 durable knowledge가 아니며 structured records로 승격할 때 provenance/redaction/validation을 요구한다.

## 불확실성

- Gemini CLI, Codex CLI, Claude Code CLI, OpenCode의 상세 output contract와 질문 prompt 패턴은 실제 설치/실행 POC 후 확정해야 한다.
- Tauri에서 interactive PTY를 어떤 Rust/sidecar 조합으로 구현할지는 별도 coding research와 dependency audit가 필요하다.
