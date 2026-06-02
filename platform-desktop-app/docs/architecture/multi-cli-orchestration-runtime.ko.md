# 다중 CLI 오케스트레이션 런타임

## 목적

이 문서는 `platform-desktop-app`이 먼저 실행되는 platform-first host runtime이 되고, Claude Code CLI, Gemini CLI, Codex CLI, OpenCode 같은 AI CLI를 그 위의 guest adapter lane으로 동시에 활용하되 어느 하나에도 종속되지 않는 설치형 데스크톱 플랫폼이 되기 위한 런타임 구조를 정의한다.

핵심 결론은 다음이다.

- 데스크톱 앱의 정체성은 CLI wrapper가 아니라 workspace, task state, decision, artifact, history, validation, reusable data를 소유하는 platform-first supervisor다.
- CLI는 플랫폼 위에 올라오는 guest adapter-backed execution provider다. 없으면 `capability_missing`이 되고 앱 자체는 계속 열려야 한다.
- 여러 CLI 실행은 터미널 창 여러 개가 아니라 process graph, lane status, output bound, cancellation, cleanup, merge gate가 있는 supervised run이다.
- CLI가 사용자 질문을 만들면 dependent lane만 멈추고, 질문은 decision inbox로 들어가며, 독립 lane은 계속 진행한다.
- 터미널 output은 관찰 가능한 evidence지만 durable state는 구조화된 record로 저장한다.

## 런타임 레이어

```text
Platform-first host runtime
  -> Tauri desktop shell
  -> workspace-monitor / future desktop UI
      -> command center
      -> run timeline
      -> decision inbox
      -> terminal lane panels
      -> source editor
  -> platform supervisor boundary
      -> adapter registry
      -> process graph planner
      -> PTY/stream supervisor
      -> decision deferral router
      -> artifact/log/data retention manager
      -> validation and evaluation runner
  -> external AI CLI guest adapters
      -> Claude Code CLI
      -> Gemini CLI
      -> Codex CLI
      -> OpenCode
```

## 후보 기술

| 영역 | 우선 후보 | 이유 | 구현 전 확인 |
| --- | --- | --- | --- |
| 데스크톱 셸 | Tauri v2/Rust | 기존 스캐폴드와 macOS/Windows 배포 프로파일이 Tauri-first다. | Rust/Tauri 설치 감사, shell permission, sidecar, signing gate |
| 터미널 UI | xterm.js | 브라우저 기반 terminal emulator 표준 후보이며 web UI에 붙이기 쉽다. | addon, theme, accessibility, output bounding, mobile 비목표 |
| PTY/process | Tauri shell plugin, sidecar, 별도 supervisor 후보 | Tauri shell은 scoped process execution을 제공한다. sidecar는 Python/service packaging 후보를 제공한다. | 실제 interactive PTY에는 별도 POC가 필요하다. Node `node-pty`는 Electron/Node supervisor 후보이며 Tauri 기본 선택은 아니다. |
| 코드 편집 | Monaco Editor | VS Code에서 나온 browser-based editor이며 source editing을 처음부터 직접 만들지 않아도 된다. | file URI, model lifecycle, dispose, workers, schema/LSP 연결, dependency audit |
| editor-agent protocol | Agent Client Protocol | editor와 coding agent decoupling의 향후 후보이다. | 지금은 CLI supervisor가 우선이며 ACP는 editor interoperability가 핵심 병목일 때 검토 |
| 장기 supervisor | Go 또는 Python sidecar | Go는 장기 실행 process supervisor 후보, Python은 기존 agent-platform 정책/검증 계층이다. | 측정된 병목, lifecycle cleanup, packaging, signing, rollback |

## 다중 CLI 실행 계약

1. 사용자가 작업 목표, 프로젝트, output type을 입력한다.
2. preflight가 Claude Code, Gemini CLI, Codex CLI, OpenCode의 availability, version, auth/session, permission scope를 확인한다.
3. 선택된 CLI마다 process node를 만든다.
4. fan-out/fan-in이 있으면 merge gate를 명시한다.
5. 각 lane은 cwd, env allowlist, timeout, output bound, cancellation, cleanup policy를 가진다.
6. 실행 중 terminal output은 lane panel에 보이고, 의미 있는 event는 구조화 record가 된다.
7. CLI가 질문하면 adapter가 가능한 경우 짧은 defer message를 보내고, dependent lane만 멈춘다.
8. decision packet은 decision inbox에 저장된다.
9. 사용자가 답하면 checkpoint에서 resume한다.
10. merge gate는 accepted, rejected, conflicting, deferred evidence를 분리한 뒤 downstream 결과를 release한다.

## 데이터 축적 구조

| 데이터 | 저장 방향 | durable 승격 조건 |
| --- | --- | --- |
| raw terminal scrollback | product-local runtime log, bounded retention | 보통 승격하지 않음 |
| terminal output summary | task run record | redaction, source lane, timestamp |
| CLI process event | process event record | adapter, version, cwd, exit, duration |
| artifact | owning project `artifacts/` 또는 task artifact store | path boundary, provenance, validation |
| user question | decision inbox | decision impact, blocked/unblocked work, resume action |
| accepted learning | project docs, `_research/`, requirement/spec, reusable asset | provenance, freshness, validation, ambiguity handling |
| large historical corpus | packaged archive, index, optional vector DB | volume/latency/retrieval measurement 후 선택 |

벡터 DB는 기본값이 아니다. 파일 시스템 기반 index와 구조화 JSON/Markdown이 먼저이며, 검색량과 재사용량이 늘어 retrieval bottleneck이 측정될 때 packaging, vector DB, hybrid search를 비교한다.

## 권한과 보안

- desktop shell이 local command를 실행하려면 command allowlist, args policy, workspace path scope, stdin write scope, timeout, kill permission이 명시되어야 한다.
- API key, token, browser cookie, provider session secret은 installer나 durable log에 들어가면 안 된다.
- interactive stdin write는 adapter별로 안전성이 기록된 경우에만 켠다.
- public macOS readiness는 Developer ID signing, hardened runtime, notarization, stapling, clean Mac smoke test 없이는 주장하지 않는다.
- CLI 출력의 raw 저장은 size, sensitivity, retention이 정해진 경우에만 허용한다.

## MVP 절단 순서

1. Adapter status UI: 네 CLI의 availability/version/setup-later 상태를 보여준다.
2. Run timeline model: process lane, artifact, decision, validation record를 UI 데이터 모델로 만든다.
3. Single-CLI supervised prototype: 한 CLI를 bounded output/cancel/cleanup으로 실행한다.
4. Decision deferral prototype: CLI 질문을 decision inbox로 보내고 dependent lane만 pause한다.
5. Multi-CLI fan-out/fan-in: process graph validation과 merge gate를 붙인다.
6. Source editor: Monaco 기반 read/write scope, diff/review, save policy를 구현한다.
7. Data quality layer: terminal-derived records를 reusable knowledge candidate로 승격하는 validation을 붙인다.

## 구현 상태: Supervisor MVP 1

2026-06-02 기준 첫 실제 구현은 1번 slice의 제한된 버전이다.

- `platform-desktop-app/src-tauri/src/lib.rs`가 `claude`, `gemini`, `codex`, `opencode`를 allowlist로 두고 PATH에서 탐지한다.
- Tauri command는 `list_cli_adapters`, `run_cli_adapter_health`, `run_all_cli_adapter_health`를 제공한다.
- health check는 각 CLI의 `--version`만 실행한다.
- stdin은 닫혀 있고, output은 `MAX_HEALTH_OUTPUT_BYTES`로 제한되며, timeout은 `HEALTH_TIMEOUT_MS`로 제한된다.
- CLI가 없으면 `capability_missing`으로 보고하고 데스크톱 UI는 계속 열린다.
- `workspace-monitor`의 `Desktop` 탭은 Tauri 런타임에 연결되면 실제 health check를 실행하고, 일반 브라우저에서는 unavailable fallback을 보여준다.
- health output에서 질문처럼 보이는 라인은 decision prompt 후보로 표시한다. session MVP에서는 `send_cli_adapter_defer_message`가 stdin defer message를 보내고 감지된 질문을 `_ops/coordination/human-decision-inbox.json`에 저장한다.

## 구현 상태: Pipe Session / Source Editor MVP 2

2026-06-02 후속 구현은 dependency 설치 없이 가능한 pipe 기반 실행과 scoped file editing을 추가한다.

- Tauri backend는 `start_cli_adapter_session`, `poll_cli_adapter_session`, `list_cli_adapter_sessions`, `write_cli_adapter_stdin`, `send_cli_adapter_defer_message`, `cancel_cli_adapter_session`을 제공한다.
- 실행 대상은 `ADAPTERS` allowlist의 CLI만 가능하다. shell plugin 권한은 추가하지 않았다.
- 각 session은 stdout/stderr를 bounded buffer에 수집하고, stdin 입력은 크기 제한을 둔다.
- `send_cli_adapter_defer_message`는 고정 defer message를 stdin으로 보내고, 감지된 질문을 `_ops/coordination/human-decision-inbox.json`에 중복 없이 저장하며, session report에 저장된 inbox item 수를 표시한다.
- `cancel_cli_adapter_session`은 child process를 kill/wait하고 report를 유지한다.
- Tauri backend는 `read_workspace_text_file`, `write_workspace_text_file`을 제공한다.
- 파일 작업은 workspace root 상대 경로만 허용하고 `_private/`, `outputs/`, workspace 밖 경로, symlink escape를 차단한다.
- 저장 전 `platform-desktop-app/artifacts/source-editor-backups/` 아래 backup을 만든다.
- Workspace Monitor `Desktop` 탭은 CLI session console과 textarea 기반 scoped editor를 표시한다.

## 구현 상태: User Controls MVP 3

2026-06-02 추가 개선은 사용자 입장에서 설정, 모드 선택, 보류 결정 처리를 한 화면에서 다루도록 한다.

- Tauri backend는 `list_human_decision_inbox`, `answer_human_decision`을 제공한다.
- `answer_human_decision`은 선택된 decision의 `status`를 `answered`로 바꾸고 answer payload와 `decision_history` 항목을 저장한다.
- Workspace Monitor `Desktop` 탭은 각 CLI adapter의 설치 힌트, 검증 명령, 공식 참조 링크를 보여준다. 자동 설치는 하지 않는다.
- session launcher는 `User Task`, `Platform Improvement`, `Knowledge Accumulation`, `Review & Verify` 모드 프리셋을 제공하고 prompt를 채운다.
- decision inbox panel은 open/answered/total count, decision 목록, answer type/text 입력, 저장된 답변 상태를 보여준다.

## 구현 상태: Decision Resume MVP 4

2026-06-02 후속 개선은 저장된 decision answer를 linked active CLI session으로 재주입하는 명시적 resume path를 추가한다.

- Tauri backend는 `answer_and_resume_human_decision`을 제공한다.
- command는 먼저 decision answer와 `decision_history`를 저장하고, decision metadata의 `session_id`가 현재 active session에 연결되어 있을 때만 같은 answer text를 session stdin으로 보낸다.
- session이 없거나 이미 끝났거나 stdin이 없으면 answer 저장은 유지하고 resume status/detail로 이유를 돌려준다.
- Workspace Monitor `Desktop` 탭은 linked session id/status를 표시하고, 일반 `Answer`와 `Answer & Resume` action을 구분한다.
- resume이 성공하면 session report를 갱신하고 `defer_message_sent` 표시를 해제해 lane이 다시 running 상태로 보이게 한다.

## 비범위

- 이번 MVP는 PTY 기반 terminal implementation이 아니다.
- autonomous source-affecting CLI execution과 merge gate release는 아직 구현하지 않았다.
- 실제 Rust/Tauri, xterm.js, Monaco, PTY dependency 설치는 설치 감사 전에는 하지 않는다.
- provider authentication을 앱이 대신 소유하지 않는다.
- public installer readiness를 주장하지 않는다.
