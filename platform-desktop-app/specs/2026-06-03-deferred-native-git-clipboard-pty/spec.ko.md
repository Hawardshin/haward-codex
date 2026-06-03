# Spec: Deferred Native Git, Clipboard QA, PTY Decision

## 범위

- Native runtime: selected workspace 기반 Git status/action command.
- Renderer: desktop runtime 화면의 Native Git Workbench UI.
- Source editing QA: clipboard abstraction과 deterministic unit test.
- Architecture docs: PTY/xterm decision, Native Git credential/SSH boundary.
- Registry/readiness: product gap closure와 remaining gate 검증.

## 비범위

- 앱이 SSH key, token, credential helper를 직접 관리하는 기능.
- public macOS/Windows release readiness claim.
- 전체 `MonitorShell.tsx` 대분해 완료.
- xterm/PTY dependency 설치와 interactive pseudo-terminal 구현.

## 설계

Native Git은 Tauri command가 selected workspace의 Git root를 찾고 시스템 `git`을 bounded subprocess로 실행한다. Renderer는 `NativeGitWorkbench` 컴포넌트로 status/action UI를 제공하며, parent shell은 Tauri invocation state만 소유한다.

Clipboard는 `writeClipboardText` module로 분리한다. navigator clipboard가 가능하면 먼저 사용하고, 실패하면 readonly textarea fallback으로 copy를 시도한다.

PTY는 현재 기본 product slice가 아니다. pipe-first supervisor는 task-run store, decision inbox, bounded logs, stdin/defer/cancel 흐름을 보존하므로 기본으로 유지한다.

## 남은 Gate

- `componentized_desktop_ui_architecture`: 전체 shell/source/settings/operator component ownership split은 계속 남는다.
- `public_distribution_gates`: Developer ID signing, notarization, updater, clean-machine smoke가 없으므로 public readiness는 계속 blocked이다.
