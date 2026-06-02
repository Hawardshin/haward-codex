# UI/기능 분석: 설치형 다중 에이전트 앱 레퍼런스

## 확인한 주요 출처

- VS Code UI/terminal/source control/webview 문서: https://code.visualstudio.com/docs/getstarted/userinterface, https://code.visualstudio.com/docs/terminal/getting-started, https://code.visualstudio.com/docs/sourcecontrol/overview, https://code.visualstudio.com/api/ux-guidelines/webviews
- GitHub Desktop 문서: https://docs.github.com/desktop
- Docker Desktop/Extensions 문서: https://docs.docker.com/desktop/use-desktop/, https://docs.docker.com/extensions/
- Raycast Manual/Store/AI 관련 문서: https://manual.raycast.com/
- Warp Agent Platform 문서: https://docs.warp.dev/agent-platform/
- Cursor 문서: https://cursor.com/docs
- OpenCode 공식 사이트: https://opencode.ai/
- Gemini CLI 공식 저장소: https://github.com/google-gemini/gemini-cli
- Codex CLI 공식 저장소: https://github.com/openai/codex
- Tauri/Electron 배포 문서: https://v2.tauri.app/distribute/, https://www.electronjs.org/docs/latest/
- xterm.js/Monaco Editor 문서: https://xtermjs.org/docs/, https://www.npmjs.com/package/monaco-editor

## 분석 결론

우리 앱은 VS Code, GitHub Desktop, Docker Desktop, Raycast, Warp, Cursor, OpenCode를 각각 일부만 참고해야 한다. 제품 정체성은 **코드 에디터**, **터미널**, **Git GUI**, **런처**, **CLI wrapper** 중 하나가 아니라, 작업 실행과 판단을 관리하는 **설치형 AI 작업 운영체제**다.

가장 중요한 UI 원칙은 다음이다.

- 실행 전에는 workspace scope, capability 상태, 위험 권한을 보여준다.
- 실행 중에는 agent lane, 터미널 output, decision 대기, elapsed time, artifact를 한 화면에서 보여준다.
- 실행 후에는 diff, evidence, validation, commit/revert, reusable knowledge 후보를 분리한다.
- CLI가 질문하거나 막히면 전체 앱이 멈추지 않고 해당 lane만 decision inbox로 보낸다.
- 사용자는 command palette처럼 빠르게 시작할 수 있지만, 중요한 결정과 실행 결과는 durable record로 남는다.

## 레퍼런스별 UI/기능 분석

| 레퍼런스 | UI 구조 | 핵심 기능 | 우리 앱에 채택 | 주의할 점 |
| --- | --- | --- | --- | --- |
| VS Code | Activity bar, sidebar, editor grid, bottom panel, status bar, command palette | integrated terminal, shell integration, tasks/problems, source control, extensions, webviews | 좌측 navigation + 중앙 workbench + 하단/우측 terminal lane + command palette 구조 | VS Code clone이 되면 제품 초점이 흐려진다. webview 남발 금지 |
| GitHub Desktop | repository selector, branch bar, Changes/History tab, file list, diff view, commit panel | 변경 리뷰, 브랜치 전환, commit, PR/sync, visual confirmation | agent source change를 diff/review/branch/worktree gate로 보여준다 | reset/rewrite 같은 위험 Git 작업은 기본 UI에 쉽게 노출하지 않는다 |
| Docker Desktop | 좌측 resource nav, dashboard, quick search, integrated terminal, extension marketplace, notification center, troubleshooting | container/resource management, extension install, docs/search, health/recovery | capability center, CLI adapter marketplace, health/recovery cards, in-app docs | Docker처럼 resource가 명확한 앱과 달리 AI task는 추상적이므로 timeline/evidence가 더 중요하다 |
| Raycast | root search, command list, action panel, store, extension settings, AI `@` tool mention | quicklinks, snippets, extensions, AI extensions, action routing | global command palette, task recipe launcher, prompt/workflow/snippet catalog | 빠른 실행만 있고 durable trace가 없으면 플랫폼 목적과 충돌한다 |
| Warp | terminal-first workbench, agent mode, terminal buffer attach, workflows/session management | agent가 PTY output을 보고 명령 실행, interactive process에 개입 | xterm.js terminal lane, attach/resume, command blocks, output event extraction | active shell write는 allowlist/confirmation/output bound 없이 켜면 위험하다 |
| Cursor | VS Code 계열 editor + agent sidepane/chat tabs/checkpoints/diff/terminal integration/rules/memory/context | multi-file edit, terminal command, diff review, checkpoints, rules, codebase indexing | Monaco editor, agent mode preset, checkpoint, diff apply/reject, project rules/context pack | editor-first가 되면 multi-CLI platform identity가 약해진다 |
| OpenCode | terminal/IDE/desktop surface, multi-session, provider flexibility, LSP 방향 | 여러 session, provider/model 선택, local/remote model 연결 | vendor-neutral multi-session supervisor, provider/capability selection | provider 인증과 model billing을 앱이 직접 소유하지 않는다 |
| Gemini CLI | TUI/CLI 중심, interactive/non-interactive/pipe/resume, MCP, extensions, memory/context files | `gemini -p`, pipe, resume by session, `/memory reload`, `/mcp reload` | adapter contract에 prompt/pipe/resume/extensions/memory reload capability 표준화 | CLI별 명령 차이를 억지로 하나의 명령으로 숨기지 않는다 |
| Codex CLI | local terminal coding agent, repo-aware execution | coding task, shell/file workflow, optional adapter | Codex adapter는 강한 기본 후보지만 플랫폼 identity는 아님 | Codex 전용 UX가 되면 요구사항 위반 |
| Tauri/Electron | 앱 shell, packaging, updater, signing/notarization | installer, OS integration, update, native boundary | Tauri-first 유지, public-ready gate, updater gate | signed/notarized 전 public-ready 주장 금지 |
| xterm.js/Monaco | terminal/editor embeddable libraries | terminal rendering, code editing, language support | 직접 구현하지 말고 terminal/editor surface로 채택 | 설치 감사, lifecycle cleanup, worker/dispose, accessibility 필요 |

## 기능 영역별 분석

### 1. 앱 Shell / Navigation

참고: VS Code, Docker Desktop, GitHub Desktop

권장 구조:

- 좌측 rail: `Home`, `Runs`, `Agents`, `Decisions`, `Source`, `Knowledge`, `Capabilities`, `Settings`
- 상단 bar: current workspace, global command palette, view mode, sync/build/health status
- 중앙 workbench: 현재 선택된 task/run/source/diff/detail
- 우측 inspector: evidence, validation, selected lane, source provenance
- 하단/내부 panel: terminal lanes, logs, problems, output events

이 구조는 VS Code의 dense workbench와 Docker Desktop의 resource dashboard를 결합하되, 우리 앱의 핵심인 run/evidence/decision을 1급 객체로 만든다.

### 2. First Run / Setup

참고: Docker Desktop, GitHub Desktop, Raycast

필요 기능:

- workspace chooser: 어떤 폴더를 읽고 쓸지 명시
- privacy scope preview: 읽을 경로, 쓸 경로, 실행 가능한 CLI, 저장될 log
- capability cards: Claude Code, Gemini CLI, Codex CLI, OpenCode의 install/auth/version/setup-later
- setup-later: missing CLI는 전체 앱을 막지 않음
- quick start: CLI 없이도 기존 history/requirements/specs/monitor를 볼 수 있음

### 3. Command Palette / Quick Actions

참고: Raycast, VS Code

필요 기능:

- `Run task`, `Open decision inbox`, `Check CLI adapters`, `Search workspace`, `Create task recipe`, `Promote learning` 같은 action을 검색/실행
- action은 command id, required capability, risk level, output target을 가진다.
- command palette에서 실행해도 durable run record가 남는다.

### 4. Agent Run Board

참고: Warp, Cursor, OpenCode

필요 기능:

- lane별 adapter, cwd, status, PID/session id, elapsed time, output bytes, last event
- process graph: fan-out, fan-in, dependency, merge gate
- timeline: started, command sent, output event, question detected, decision deferred, artifact created, validation passed/failed
- control: pause, cancel, answer, resume, export, promote

이 화면은 단순 터미널 탭 목록이 아니라 “agent 작업의 운영 관제판”이어야 한다.

### 5. Terminal Lane

참고: VS Code terminal, Docker Desktop integrated terminal, Warp full terminal use

필요 기능:

- xterm.js 기반 rendering
- line/event parser: question, error, warning, file path, test summary, prompt waiting, command complete
- output bound와 scrollback retention
- command input 권한: read-only, confirm-each-write, trusted-workflow auto-write
- interactive PTY는 별도 POC 후 enable

주의:

- active terminal에 agent가 쓰는 것은 매우 위험하므로, adapter별 안전성 기록과 확인 UI가 필요하다.

### 6. Decision Inbox

참고: Raycast action panel, Cursor checkpoint, 우리 기존 human decision inbox

필요 기능:

- 질문 단위 record: source lane, prompt text, blocked decision, impact, default/defer option, resume action
- grouped decisions: 같은 task/run/source file별 묶음
- answer modes: direct answer, choose option, defer again, cancel lane, resume with answer
- decision replay: 어떤 답변이 언제 어느 session stdin으로 들어갔는지 추적

### 7. Source Editor / Diff Review

참고: Cursor, GitHub Desktop, VS Code

필요 기능:

- Monaco scoped editor
- GitHub Desktop-style file list + diff view
- agent change set: modified files, generated files, deleted files, risk labels
- checkpoint/backup: save 전 backup, apply 전 diff, failure 시 restore
- validation command 연결: typecheck/test/build/lint
- review actions: accept file, reject file, apply patch, open in external editor, commit

### 8. Capability Marketplace

참고: Docker Extensions, Raycast Store, VS Code Extensions

필요 기능:

- CLI adapters: Codex, Claude Code, Gemini CLI, OpenCode
- tools: GitHub CLI, package managers, deployment CLIs, browser tools
- prompts/workflows/skills/validators
- 각 capability card: status, install source, verification command, permissions, risk, docs link, last check
- private/local catalog와 public marketplace를 분리

주의:

- 자동 설치는 기본값이 아니다. 설치 audit, license/security review, rollback이 필요하다.

### 9. Evidence Panel

참고: Cursor checkpoints/export, GitHub diff, Docker logs/troubleshoot

필요 기능:

- claim -> source -> command output -> file diff -> validation result 연결
- unsupported claim warning
- artifact provenance
- run summary export
- “knowledge promotion” 후보 표시

### 10. Knowledge / Memory Map

참고: Raycast snippets/quicklinks, Cursor rules/memories, Gemini memory/context files

필요 기능:

- reusable prompts, task recipes, workflows, skills, validators
- requirements/spec/history/decision/artifact/source graph
- promotion inbox: 반복된 작업, 좋은 prompt, 검증 실패, 누락 방지 항목
- vector DB는 후순위: 먼저 파일 시스템 index + structured JSON/Markdown

## 우리 앱의 추천 화면 정보구조

| 화면 | 주 사용자 질문 | 주요 UI |
| --- | --- | --- |
| Home | 지금 무엇을 할 수 있고 무엇이 막혔나? | active runs, decision inbox, capability health, recent artifacts |
| Runs | 각 agent/CLI가 무엇을 하고 있나? | run board, process graph, lane timeline, terminal lanes |
| Agents | 어떤 agent/mode/capability가 있나? | adapter cards, mode presets, agent configs, scorecards |
| Decisions | 내가 답해야 할 것은 무엇인가? | grouped inbox, impact, answer/resume/replay |
| Source | 어떤 파일이 바뀌었고 안전한가? | Monaco editor, file tree, diff review, validation |
| Knowledge | 무엇을 재사용 가능한 자산으로 승격할까? | promotion inbox, recipes, prompts, skills, memory map |
| Capabilities | 어떤 CLI/도구/확장이 준비됐나? | marketplace, health checks, setup guide, permission scopes |
| Settings | 앱/워크스페이스/보안/업데이트 설정은? | workspace scope, privacy, logs, updater, signing/readiness |

## MVP에 바로 반영할 기능 순서

1. **Capability Center 개선**
   - 현재 Desktop 탭의 CLI setup guide를 별도 capability card grid로 개선한다.
   - 각 card는 install/auth/version/last check/setup-later/action을 가진다.

2. **Run Board v1**
   - existing pipe session 목록을 lane card로 보이게 한다.
   - lane card에 status, adapter, cwd, elapsed, output bytes, decisions, artifacts를 표시한다.

3. **Terminal Lane POC**
   - xterm.js 설치 감사 후 기존 stdout/stderr buffer를 xterm에 연결한다.
   - 아직 full PTY write는 켜지 않는다.

4. **Decision Inbox v2**
   - grouped inbox, answer and resume, decision replay를 UI에 추가한다.
   - 같은 질문 중복 감지와 impact 표시를 개선한다.

5. **Source Review v1**
   - Monaco 도입 전에도 file list + diff preview + backup restore UI를 먼저 만든다.
   - 이후 Monaco로 editor surface를 교체한다.

6. **Run Record Schema**
   - session, lane, command, output event, decision, artifact, validation, source diff를 하나의 schema로 고정한다.

7. **Process Graph v1**
   - 두 CLI fan-out, merge gate, cancellation, conflict 표시를 구현한다.

## 채택하지 않을 UX

- 모든 기능을 첫 실행 wizard에 몰아넣지 않는다.
- CLI output raw log를 메인 지식으로 취급하지 않는다.
- 특정 CLI를 홈 화면의 브랜드처럼 보이게 하지 않는다.
- app이 provider token/password/cookie를 직접 보관하지 않는다.
- quick action이 검증/기록을 우회하게 하지 않는다.

## 차별화 지점

- 다른 앱들은 대부분 terminal/editor/Git/launcher 중 하나를 중심으로 한다.
- 우리 앱은 **decision**, **evidence**, **validation**, **knowledge promotion**, **multi-CLI orchestration**을 중심으로 한다.
- 핵심 UI 단위는 file이나 command가 아니라 `run`, `lane`, `decision`, `artifact`, `evidence`, `reusable asset`이다.
