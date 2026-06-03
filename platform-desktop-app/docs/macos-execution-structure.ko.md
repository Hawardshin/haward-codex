# macOS 실행 구조

이 문서는 플랫폼을 macOS에서 실행 가능한 설치형 앱으로 만들 때의 구조를 정의한다. 원천 설정은 `platform-desktop-app/configs/macos-execution-profile.json`이다.

## 실행 단계

### 1. 개발자 로컬 실행

- 목적: 저장소를 가진 개발자의 Mac에서 빠르게 확인한다.
- 허용: `platform-desktop-app/renderer/workspace-monitor` dev server, static export preview, future unsigned/ad-hoc signed desktop app.
- 금지: public distribution-ready라고 표현하는 것.

### 2. 내부 테스트 앱

- 목적: `.app` bundle 또는 DMG/ZIP을 신뢰된 내부 테스트에 사용한다.
- 필요: dependency install audit, clean macOS account smoke test, workspace open/create/demo flow, optional CLI missing-capability behavior.

### 3. 외부 배포 앱

- 목적: 일반 사용자가 다운로드 후 Gatekeeper 우회 없이 실행한다.
- 필요: Developer ID signing, hardened runtime, 최소 entitlements, notarization, 가능한 경우 stapling, fresh Mac install/open smoke test, update/rollback/privacy/dependency review.

## 프로세스 모델

초기 추천은 Tauri-first macOS `.app` shell이다.

- Desktop shell: macOS 앱 진입점, native window lifecycle, workspace folder picker, platform-first host boundary를 담당한다.
- Workspace Monitor UI: dashboard, history, docs, agents, source viewer, decision inbox 화면을 재사용한다.
- Agent Platform: Python-first agent, research, planning, evaluation, config check를 담당한다.
- Guest CLI adapters: Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, GitHub CLI, package manager, deployment CLI 등은 플랫폼이 실행된 뒤 adapter contract를 통해 붙는다.

핵심 원칙은 하나다. 사용자는 하나의 앱을 실행하지만, 내부 agent logic과 CLI 실행은 명확한 경계와 검증 가능한 contract 뒤에 있어야 한다.

## macOS 배포 조건

- `.app`: desktop shell의 기본 실행 단위
- DMG: 일반 사용자 배포의 1차 후보
- ZIP: updater 또는 단순 archive 배포 후보
- PKG: privileged installer나 managed deployment가 필요할 때만 검토

## 권한과 보안

- workspace는 사용자가 선택한 경로만 읽는다.
- network access는 update, web research, notification 등 실제 기능이 필요할 때만 문서화해 연다.
- local command execution은 adapter allowlist, timeout, output redaction, visible consent 없이 실행하지 않는다.
- token, webhook URL, Apple signing credential, update private key는 저장소나 installer에 넣지 않는다.

## 아직 하지 않은 것

- Tauri/Electron 설치
- `.app` bundle 구현
- signing certificate 준비
- notarization 실행
- auto-update 구현

이 문서는 실행 구조와 release gate를 고정하는 작업이며, 실제 dependency 설치나 빌드는 별도 설치 감사와 함께 진행해야 한다.
