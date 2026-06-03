# Requirements: Deferred Native Git, Clipboard QA, PTY Decision

## 목적

사용자가 “아까 미뤄진 것”으로 지적한 제품 갭 중 현재 구현으로 닫을 수 있는 항목을 실제 기능, 테스트, 문서, readiness gate로 닫는다. 단순 PoC나 후보 UI가 아니라 설치형 데스크톱 앱의 작업 환경 안에 녹아야 한다.

## 요구사항

### PDA-REQ-040 Native Git Workbench

- 설치형 앱은 선택된 workspace에서 Git 상태, 브랜치, 변경 파일, remote, ahead/behind를 읽을 수 있어야 한다.
- 앱은 브랜치 생성, 전체 변경 커밋, `pull --ff-only`, `push`를 desktop workbench action으로 제공해야 한다.
- 모든 Git 명령은 선택된 workspace 아래 Git root에서 실행되어야 하며, 출력은 redaction과 길이 제한을 거친 bounded command output이어야 한다.
- 앱은 SSH private key, 토큰, credential helper 저장소를 직접 읽거나 저장하지 않아야 한다.

### PDA-REQ-064 GitHub Desktop 수준 Git 작업대

- Native Git Workbench는 단순 status/action 패널이 아니라 GitHub Desktop처럼 변경 파일 선택, 선택 파일 diff preview, commit box, pull/push 동기화가 한 화면에서 이어져야 한다.
- Git status payload는 파일별 staged/unstaged/untracked/conflicted 상태, additions/deletions, bounded diff preview를 제공해야 한다.
- Renderer는 왼쪽 변경 파일 목록, 중앙 diff preview, 오른쪽 commit/sync panel의 3-pane 작업대를 제공해야 한다.
- 큰 diff, binary, preview 제한 파일은 앱 전체를 막지 않고 preview unavailable 상태로 degrade해야 한다.

### PDA-REQ-065 GitHub Desktop Parity Layer

- Native Git Workbench는 Changes, History, Stash를 같은 Git 작업대 안에서 전환할 수 있어야 한다.
- Changes는 GitHub Desktop처럼 파일별 include checkbox를 제공하고, 선택 파일만 커밋하거나 stash할 수 있어야 한다.
- Discard는 선택 파일에 대해서만 실행되어야 하며, tracked 변경 복원과 untracked 삭제를 구분해서 처리해야 한다.
- Status payload는 최근 commit history와 stash 목록을 bounded payload로 제공해야 한다.
- Stash는 apply, pop, drop을 명시적으로 선택한 stash ref에 대해서만 실행해야 한다.

### PDA-REQ-041 Clipboard QA

- code editing copy action은 브라우저 permission 상태에만 의존하지 않는 clipboard abstraction을 사용해야 한다.
- navigator clipboard 실패 시 textarea fallback path를 제공해야 한다.
- navigator success, fallback success, no-write-path 실패를 deterministic unit test로 검증해야 한다.

### PDA-REQ-042 PTY Terminal Product Decision

- xterm/PTY를 기본 터미널 구현으로 채택할지, pipe-first supervisor를 기본으로 유지할지 명확히 결정해야 한다.
- 현재 기본은 task-run persistence, decision inbox, bounded stdout/stderr, stdin/defer/cancel을 보존하는 pipe-first CLI supervisor이다.
- xterm/PTY는 optional extension으로만 남기며, 설치/보안/자원 cleanup audit 없이는 기본 기능으로 올리지 않는다.

### PDA-REQ-043 Gap Ledger Accuracy

- product gap registry는 구현으로 닫힌 Git, clipboard QA, PTY decision을 partial/test gap으로 계속 표시하면 안 된다.
- 전체 MonitorShell componentization과 public distribution signing/notarization/updater/clean-machine smoke는 아직 닫히지 않은 별도 gate로 남겨야 한다.

## Acceptance

- Rust/Tauri command, renderer UI, runtime contract, readiness script/test가 Native Git Workbench를 검증한다.
- Native Git Workbench는 changed-file list, include checkbox, selected-file diff preview, history list, stash list, commit/sync panel token을 readiness test에서 검증한다.
- clipboard unit tests가 추가되고 `platform-desktop-app test`에서 통과한다.
- PTY decision bilingual docs가 추가되고 readiness가 optional extension boundary를 확인한다.
- Browser smoke에서 실행 화면의 Git panel과 terminal drawer가 다크 테마로 정상 렌더링된다.
