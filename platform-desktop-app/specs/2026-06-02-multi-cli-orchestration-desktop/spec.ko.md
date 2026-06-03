# 다중 CLI 오케스트레이션 데스크톱 스펙

## 목표

설치형 데스크톱 앱이 Claude Code CLI, Gemini CLI, Codex CLI, OpenCode, Claw Code를 선택형 capability로 설정하고, 여러 CLI를 동시에 감독하며, 질문/결정/출력/코드 편집/데이터 축적을 플랫폼 상태로 관리할 수 있는 제품 계약을 만든다.

## 요구사항

- `REQ-WS-085`
- `PDA-REQ-013` - `PDA-REQ-027`
- `PDA-UX-009` - `PDA-UX-020`

## 범위

- `cli-adapter-registry.json`의 concrete AI CLI adapter 후보
- `user-flow-registry.json`의 AI CLI orchestration flow
- `desktop-distribution-registry.json`의 multi-CLI supervisor release gate
- project-local architecture 문서
- readiness/test가 새 문서를 확인하도록 보강
- Tauri backend의 allowlist CLI 탐지와 bounded health/version check
- Tauri backend의 task pipe preset 조회와 task intake 기반 multi-CLI lane init command
- Workspace Monitor의 Desktop 탭과 browser fallback
- Tauri backend의 pipe 기반 CLI session start/poll/stdin/defer/cancel command와 defer 시 human decision inbox append
- Tauri backend의 human decision inbox 조회/답변 command
- Tauri backend의 linked active CLI session answer-and-resume command
- Tauri backend의 workspace-scoped source file read/write와 backup
- Workspace Monitor의 CLI setup guide, 작업 모드 프리셋, decision inbox answer UI, CLI session console, scoped source editor
- Workspace Monitor의 command palette, capability center card, run board, process graph, terminal event rail, grouped decision inbox, decision replay, source diff review, evidence/promotion surface
- Workspace Monitor의 multi-file source editing draft queue, direct path open, indexed file browser, dirty state, save current, save all, revert, close, backup result surface
- platform-first host runtime 계약: 플랫폼이 먼저 실행되고 외부 AI CLI는 guest adapter lane으로만 붙는 구조
- pipe-first task init 계약: 하나의 task intake가 여러 optional CLI lane의 stdin init, stdout/stderr capture, decision inbox pipe, merge gate edge를 만든다

## 비범위

- Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, Antigravity 같은 외부 AI 도구를 제품 host runtime으로 삼는 구조
- interactive PTY 실행과 autonomous source-affecting long-running task release
- Rust/Tauri, xterm.js, Monaco, PTY dependency 설치
- provider 인증 관리
- public installer 생성 또는 release-ready 주장

## 기능 계약

- 플랫폼은 먼저 실행되는 host runtime이며 task state, durable memory, decision inbox, artifact, validation, UI authority를 소유한다.
- 네 CLI는 optional guest adapter lane으로 표시되고, 누락 시 `capability_missing`으로 해당 lane만 비활성화한다.
- 첫 supervisor MVP는 allowlist된 CLI의 PATH 탐지와 stdin 없는 bounded version check를 실행한다.
- 두 번째 supervisor MVP는 shell plugin 없이 allowlist된 CLI에 한해 pipe 기반 session start/poll/stdin/defer/cancel을 제공하고, defer 시 감지된 질문을 `_ops/coordination/human-decision-inbox.json`에 저장한다.
- 세 번째 supervisor MVP는 task pipe preset을 통해 여러 optional CLI lane을 한 번에 init하고, 각 lane의 pipe edge와 merge gate를 platform-owned report로 반환한다.
- 사용자는 Desktop 탭에서 CLI별 설치 힌트와 검증 명령을 확인하고, 작업 모드 프리셋으로 session prompt를 만들며, 보류된 decision item에 답변을 저장할 수 있다.
- session metadata가 있는 보류 decision은 사용자가 명시적으로 answer-and-resume을 선택했을 때만 answer 저장 후 linked active CLI session stdin으로 같은 답변을 보내고 session report를 갱신한다.
- Desktop 탭은 레퍼런스 UI 적용 결과로 quick action command, capability status, lane timeline, process graph, structured terminal event, grouped decision, replay metadata, source diff, evidence/promotion 후보를 함께 보여준다.
- 여러 CLI의 autonomous source-affecting long-running 실행은 process graph와 merge gate를 가진 다음 supervisor 단계에서 구현한다.
- CLI 질문은 decision inbox로 route하고 dependent lane만 pause한다.
- 터미널 output은 bounded/redacted raw log와 structured durable records를 분리한다.
- 코드 편집은 현재 textarea 기반 scoped editor, multi-file draft queue, diff preview, backup save로 시작하고, Monaco Editor 같은 오픈소스 editor surface는 dependency audit 후 교체한다.
- 데이터 축적은 파일 시스템 index와 structured records를 기본으로 하고, vector DB는 측정된 병목 이후 비교한다.

## 수용 기준

- JSON config가 문법과 self-documenting config contract를 통과한다.
- desktop readiness test가 multi-CLI architecture doc과 orchestration registry fields를 확인한다.
- `workspace-monitor` Desktop 탭은 Tauri runtime이 있으면 CLI adapter 상태와 health check 결과를 표시하고, browser-only 환경에서는 unavailable fallback을 표시한다.
- `workspace-monitor` Desktop 탭은 CLI session console과 scoped source editor를 표시한다.
- `workspace-monitor` Desktop 탭은 CLI setup guide, 작업 모드 프리셋, human decision inbox 조회/답변 UI를 표시한다.
- `workspace-monitor` Desktop 탭은 linked active CLI session이 있는 decision에 대해 `Answer`와 `Answer & Resume`를 구분하고 resume 결과를 표시한다.
- `workspace-monitor` Desktop 탭은 `Command Palette`, `Capability Center`, `Run Board`, process graph, terminal event, decision replay, `Source Review`, `Evidence / Promotion` 문자열과 관련 UI state를 포함한다.
- `workspace-monitor` Desktop 탭은 `Multi-file scoped editor`, `File Edit Queue`, `Open Path`, `Save Current`, `Save All`, `Revert Draft`를 포함하고 열린/dirty 드래프트 수와 backup 저장 결과를 표시한다.
- `workspace-monitor` Desktop 탭은 `Platform-first host`, `Guest adapters`, `Platform state owner` 문자열과 관련 UI state를 포함해 외부 AI CLI가 플랫폼 위의 guest lane임을 보여준다.
- `workspace-monitor` Desktop 탭은 `Task Pipe Init`, `Init task pipe`, `Init Pipe`, `merge gate` 문자열과 관련 UI state를 포함해 task intake 기준 multi-CLI lane init을 보여준다.
- Tauri file command는 `_private/`, `outputs/`, workspace 밖 경로, symlink escape를 차단하고 backup을 만든다.
- 요구사항, 스펙, traceability가 새 기능을 연결한다.
- 평가 기록에 resource risk와 CLI pipeline risk가 현재 bounded health/session/file-edit 구현 범위와 후속 PTY supervisor 리스크를 구분해 기록된다.
