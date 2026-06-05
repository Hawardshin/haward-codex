# 요구사항: Agent CLI Cockpit

## 사용자 요구

유사 오픈소스 플랫폼을 깊게 리서치하고, 직접 오픈소스 코드를 탐구한 뒤 현재 데스크톱 플랫폼에 실제 기능을 추가한다. 기능은 단순 렌더 개선이 아니라 데스크톱 앱의 agent/CLI 운영 장점을 더 살리는 방향이어야 한다.

## 기능 요구사항

- Desktop Runtime 화면은 guest CLI adapter를 한 화면에서 비교하고 통제할 수 있는 cockpit을 제공한다.
- cockpit은 adapter 설치/준비 상태, provider 로그인 상태, 활성 native session 수, task-run 수, decision inbox 수를 함께 보여준다.
- 사용자는 cockpit에서 adapter를 선택하거나 바로 시작할 수 있어야 한다.
- 설정이 필요한 adapter는 텍스트 설명만 노출하지 않고 설치/설정 경로로 이동하는 명확한 버튼을 제공한다.
- 오픈소스 탐구에서 얻은 control-plane 패턴을 UI 안에서 운영 기준으로 노출한다.

## 비기능 요구사항

- 기존 Rust/Tauri adapter, provider credential, native PTY, decision inbox, task-run 상태를 재사용하고 새 long-running process를 만들지 않는다.
- terminal drawer처럼 무거운 xterm surface는 기존 lazy boundary를 유지한다.
- 버튼과 상태 chip은 기존 app primitive/tone 체계를 사용해 기본 브라우저 UI처럼 보이지 않아야 한다.
- 구현 후 workspace monitor test, check, performance budget, renderer build, 내부 `.app`/`.dmg` 패키지 빌드를 실행한다.

## 제외

- 이번 변경은 새 Rust session orchestrator나 tmux supervisor를 추가하지 않는다.
- 외부 CLI를 자동 설치하거나 secret-bearing login을 자동 실행하지 않는다.
- 공개 배포용 서명, 공증, updater 설정은 이번 범위가 아니다.
