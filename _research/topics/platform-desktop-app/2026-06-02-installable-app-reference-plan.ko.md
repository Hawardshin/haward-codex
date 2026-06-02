# 조사 요약: 설치형 다중 에이전트 앱 레퍼런스와 아이디어

## 결론

우리 앱은 `CLI wrapper`가 아니라 **설치형 AI 작업 운영체제**로 가야 한다. 경쟁/참고 앱의 장점은 다음처럼 흡수한다.

| 레퍼런스 | 배울 점 | 우리 앱에 적용 |
| --- | --- | --- |
| VS Code | integrated terminal, shell integration, tasks, webview UX discipline | terminal lane, command detection, problem/event extraction, 불필요한 webview 남발 금지 |
| GitHub Desktop | Git 작업을 GUI로 단순화하고 변경/히스토리를 시각적으로 확인 | agent output을 바로 commit하지 말고 diff/review/branch/worktree gate로 연결 |
| Docker Desktop | dashboard, integrated terminal, extension marketplace, docs/search-in-app, notification center | adapter marketplace, setup guide, health/status center, docs command center |
| Raycast | command palette, quicklinks, snippets, extension action surface | 빠른 작업 실행 palette, reusable prompt/action/snippet catalog |
| Warp | terminal-first agent workspace, agent mode, shared workflows, session management | CLI lane console + task run timeline + reusable workflow promotion |
| Cursor | codebase-aware agent, multi-file edit, rules/context, agent modes | source editor + context pack + mode preset + review/verify loop |
| OpenCode | terminal/IDE/desktop surface, multi-session, model/provider flexibility | 특정 CLI에 종속되지 않는 multi-provider/multi-session supervisor |
| Gemini CLI | pipe/non-interactive/interactive/resume, MCP, extensions, memory/context files | adapter contract에 prompt, pipe, resume, extensions, memory reload capability를 표준화 |
| Codex CLI | local terminal coding agent, repo-aware execution | Codex는 optional adapter이며 플랫폼 identity가 아니다 |

## 구현 아이디어 우선순위

### P0: 설치형 앱 기본 신뢰

- First-run workspace chooser: 어떤 폴더를 읽고 실행할지 명시한다.
- Capability cards: Claude Code, Gemini CLI, Codex CLI, OpenCode 각각 installed/auth/version/setup-later 상태를 보여준다.
- Static dashboard reliability: 현재 수정한 relative static asset path를 desktop shell smoke에 연결한다.
- Local-only safety: `_private/`, `outputs/`, workspace 밖 경로, symlink escape 차단을 계속 유지한다.

### P1: 터미널/에이전트 작업면

- xterm.js 기반 terminal lane으로 textarea session console을 교체한다.
- output parser를 붙여 question, error, test result, file reference, command complete event를 구조화한다.
- lane마다 `cwd`, adapter, PID, elapsed time, output bytes, decision status, artifacts를 표시한다.
- CLI 질문은 dependent lane만 pause하고 decision inbox로 보낸다.

### P2: 코드 편집/리뷰면

- Monaco Editor를 scoped source editor로 도입한다.
- Save는 항상 backup + diff preview + validation command와 연결한다.
- agent가 만든 변경은 GitHub Desktop 방식처럼 staged/unstaged, branch/worktree, commit summary로 보여준다.
- 사용자 모드에서는 간단히 “변경 검토/적용/되돌리기”, superadmin mode에서는 raw trace와 policy evidence를 보여준다.

### P3: 다중 CLI 오케스트레이션

- Process graph builder: fan-out, fan-in, merge gate, validation gate를 UI에서 설정한다.
- Best-of-N mode: 같은 작업을 다른 CLI/모델/프롬프트로 나눠 실행하고 결과를 비교한다.
- Worktree isolation: 각 lane이 같은 파일을 동시에 건드리지 않게 isolated worktree를 사용한다.
- Merge review: accepted/rejected/conflicting/deferred 결과를 나눠 보여준다.

### P4: 지식 축적/재사용

- Terminal output을 그대로 저장하지 말고 structured run record로 요약한다.
- 반복되는 prompt, workflow, command, validation은 Raycast/Docker extension처럼 catalog화한다.
- Knowledge promotion inbox: “문서화할 학습”, “요구사항 후보”, “스펙 후보”, “테스트 후보”, “스킬 후보”로 분류한다.
- Vector DB는 기본값이 아니라 검색량/latency 병목이 측정된 뒤 선택한다.

## 새 제품 아이디어

1. **Agent Run Board**: 여러 CLI lane을 칸반이 아니라 process graph + timeline으로 보여준다.
2. **Decision Replay**: 사람이 늦게 답한 결정을 어느 session에 어떻게 재주입했는지 replay 가능하게 한다.
3. **Capability Marketplace**: CLI, prompt, workflow, skill, validator, source adapter를 같은 catalog UI에서 관리한다.
4. **Task Recipe Builder**: “조사 -> 계획 -> 구현 -> 검증 -> 기록 -> 커밋” 같은 작업 레시피를 시각적으로 만든다.
5. **Evidence Panel**: agent가 주장한 내용, 출처, 실행 결과, 변경 파일, 테스트 로그를 한 화면에서 묶는다.
6. **Failure Recovery Center**: missing CLI, auth expired, command hung, output overflow, merge conflict, unsafe file write를 recovery card로 보여준다.
7. **Workspace Memory Map**: requirements, specs, history, decisions, artifacts, source files를 graph로 연결한다.
8. **Mode Switcher**: User Task, Platform Improvement, Knowledge Accumulation, Review & Verify 외에 `Ship`, `Research`, `Audit`, `Learning Capture` preset을 추가한다.
9. **Privacy Scope Preview**: 작업 시작 전 읽을 폴더, 쓸 폴더, 실행할 CLI, 저장될 log를 요약한다.
10. **Agent Scorecard**: CLI별 성공률, 질문 빈도, 평균 runtime, test pass rate, user intervention count를 누적한다.

## 구현 순서 제안

1. `platform-desktop-app` 개발 환경 설치 감사: Rust/Tauri CLI 설치 계획, rollback, validation command 기록.
2. Tauri `.app` developer-local run smoke: `workspace-monitor/out` 로딩, snapshot fetch, Desktop tab command invoke 확인.
3. xterm.js terminal lane POC: 기존 pipe session output을 xterm.js에 연결하고 output bound 유지.
4. Monaco scoped editor POC: 현재 textarea editor를 Monaco로 교체하되 path boundary와 backup save 유지.
5. Run record schema: session, decision, artifacts, validation, source changes를 JSON schema로 고정.
6. Multi-lane supervisor: 2개 adapter fan-out 실행, cancellation, pause/resume, merge review 구현.
7. Worktree isolation: source-affecting run은 lane별 worktree로 제한.
8. Packaging gate: macOS signing/notarization 전 내부 `.app` smoke와 public-ready gate 분리.

## 구현하지 말아야 할 것

- 첫 버전에서 자동 CLI 설치, provider credential 저장, public-ready 주장, autonomous merge, unrestricted shell execution을 하지 않는다.
- terminal output 전체를 무제한 저장하지 않는다.
- vector DB를 먼저 넣지 않는다.
- 앱 identity를 Codex/Claude/Gemini/OpenCode 중 하나로 만들지 않는다.

## 강한 근거

- Tauri 공식 배포 문서는 platform-specific installer, signing, macOS notarization을 명시한다.
- VS Code 공식 문서는 terminal, shell integration, webview 사용 discipline을 제공한다.
- Docker Desktop 공식 문서는 integrated terminal, extensions, notification/docs/dashboard pattern을 제공한다.
- Gemini CLI 공식 README/CLI reference는 pipe, interactive, resume, extensions, MCP 같은 adapter capability 설계 근거를 제공한다.
- OpenCode 공식 사이트는 terminal/IDE/desktop, multi-session, multiple provider 방향이 실제 시장 신호임을 보여준다.
