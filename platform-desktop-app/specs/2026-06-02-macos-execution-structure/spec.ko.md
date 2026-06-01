# macOS 실행 구조 스펙

## 목표

`platform-desktop-app`가 macOS에서 실행 가능한 설치형 앱으로 발전할 수 있도록 실행 레벨, 프로세스 경계, 배포 포맷, 보안/권한, release gate를 명시한다.

## 범위

- 포함:
  - 개발자 로컬 실행
  - 내부 테스트 `.app`
  - 외부 배포 앱
  - Tauri-first `.app` shell 구조
  - `workspace-monitor` UI 재사용
  - Python `agent-platform` sidecar/local service 경계
  - optional CLI adapter degrade
  - Developer ID signing, hardened runtime, notarization, stapling
  - update/rollback, clean Mac smoke test
- 제외:
  - Tauri/Electron dependency 설치
  - 실제 `.app`, DMG, ZIP, PKG 생성
  - Apple Developer certificate 준비
  - notarization 실제 실행

## 실행 구조

1. Desktop shell은 macOS 앱 진입점과 window lifecycle, workspace chooser를 담당한다.
2. `workspace-monitor`는 문서, 히스토리, 에이전트, source viewer, decision inbox UI를 제공한다.
3. `agent-platform`은 Python-first local agent/service layer로 남고, shell과 명확한 command/service contract로 통신한다.
4. Codex, Claude Code, Cursor, GitHub CLI, package manager 같은 외부 CLI는 optional adapter capability로만 붙는다.
5. 사용자가 workspace를 선택하기 전에는 임의 폴더를 스캔하거나 command를 실행하지 않는다.

## 성공 기준

- `platform-desktop-app/configs/macos-execution-profile.json`이 self-documenting config 계약을 만족한다.
- macOS 실행 레벨이 문서와 설정에서 동일하게 설명된다.
- public macOS 배포 readiness는 signing/notarization/stapling/smoke test 없이는 주장하지 않는다.
- missing optional CLI는 앱 전체 실패가 아니라 capability missing 상태로 취급한다.

