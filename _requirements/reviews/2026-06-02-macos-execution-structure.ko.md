# macOS 실행 구조 요구사항 검토

## 검토 대상

- 요구사항: `REQ-WS-069`
- 요청: `UR-2026-06-02-027`
- 범위: macOS에서 실행 가능한 설치형 데스크톱 플랫폼 구조

## 수용 기준 검토

- 개발자 로컬 실행, 내부 테스트 `.app`, 외부 배포 앱이 분리되어야 한다: 수용.
- `platform-desktop-app`가 소유해야 한다: 수용.
- 실제 macOS public 배포를 주장하려면 Developer ID signing, hardened runtime, notarization, 가능한 경우 stapling, clean Mac smoke test가 필요하다: 수용.
- optional CLI가 없을 때 전체 앱 실행을 막지 않고 capability-level degrade가 필요하다: 수용.
- 실제 dependency 설치와 빌드 산출물 생성은 이번 변경에 포함하지 않는다: 수용.

## 검토 판단

승인. 이 요구사항은 기존 설치형 소프트웨어 제품화, runtime/language direction, CLI adapter boundary, user-flow registry와 충돌하지 않고, macOS 전용 실행 가능성의 release gate를 더 명확하게 만든다.

## 후속 작업

- Tauri 프로젝트를 실제로 scaffold할 때 설치 감사와 `macos-execution-profile.json` 기반 검증을 추가한다.
- public 배포 전 Apple Developer 계정, certificate, notarization credential, update signing key를 저장소 밖 secret으로 관리하는 release 절차를 만든다.

