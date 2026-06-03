# Requirements: Deferred Native Git, Clipboard QA, PTY Decision

## 목적

사용자가 “아까 미뤄진 것”으로 지적한 제품 갭 중 현재 구현으로 닫을 수 있는 항목을 실제 기능, 테스트, 문서, readiness gate로 닫는다. 단순 PoC나 후보 UI가 아니라 설치형 데스크톱 앱의 작업 환경 안에 녹아야 한다.

## 요구사항

### PDA-REQ-040 Native Git Workbench

- 설치형 앱은 선택된 workspace에서 Git 상태, 브랜치, 변경 파일, remote, ahead/behind를 읽을 수 있어야 한다.
- 앱은 브랜치 생성, 전체 변경 커밋, `pull --ff-only`, `push`를 desktop workbench action으로 제공해야 한다.
- 모든 Git 명령은 선택된 workspace 아래 Git root에서 실행되어야 하며, 출력은 redaction과 길이 제한을 거친 bounded command output이어야 한다.
- 앱은 SSH private key, 토큰, credential helper 저장소를 직접 읽거나 저장하지 않아야 한다.

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
- clipboard unit tests가 추가되고 `platform-desktop-app test`에서 통과한다.
- PTY decision bilingual docs가 추가되고 readiness가 optional extension boundary를 확인한다.
- Browser smoke에서 실행 화면의 Git panel과 terminal drawer가 다크 테마로 정상 렌더링된다.
