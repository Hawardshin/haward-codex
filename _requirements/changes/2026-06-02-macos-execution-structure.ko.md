# macOS 실행 구조 요구사항 변경

## 변경 요약

- 요청 요약: 플랫폼이 macOS에서 실행 가능한 구조를 가져야 한다.
- 변경 요구사항: `REQ-WS-069`
- 소유 프로젝트: `platform-desktop-app`
- 관련 내부 구성:
  - `platform-desktop-app/configs/macos-execution-profile.json`
  - `platform-desktop-app/configs/desktop-distribution-registry.json`
  - `platform-desktop-app/docs/macos-execution-structure.ko.md`

## 변경 내용

설치형 데스크톱 플랫폼의 macOS 실행 구조를 개발자 로컬 실행, 내부 테스트 `.app`, 외부 배포 앱으로 분리했다. 외부 배포 앱은 Developer ID signing, hardened runtime, notarization, 가능한 경우 stapling, update/rollback, clean Mac smoke test를 release gate로 갖는다.

## 근거

- Apple은 Mac App Store 밖 배포에서 Developer ID signing과 notarization, Gatekeeper-enabled Mac launch test를 요구/권장한다.
- Apple은 notarization을 위해 hardened runtime을 활성화해야 한다고 안내한다.
- Tauri는 macOS App Bundle, DMG, signing, notarization, updater 경로를 제공한다.
- 기존 플랫폼 방향은 Python agent-platform, Next.js workspace-monitor, Tauri-first desktop shell, optional CLI adapter 경계를 이미 분리하고 있었다.

## 영향

- `platform-desktop-app`는 macOS 실행 가능성을 주장하기 전 `macos-execution-profile.json`을 확인해야 한다.
- 실제 Tauri/Electron 설치, `.app` 구현, signing certificate, notarization 실행은 별도 설치 감사와 구현 스펙이 필요하다.
- 이 변경은 구조 고정이며 실제 빌드 산출물 생성은 포함하지 않는다.

