# 설치형 소프트웨어 제품화 요구사항 변경

## 변경 개요

- 날짜: 2026-06-02
- 출처 요청: `UR-2026-06-02-004`
- 추가 요구사항: `REQ-WS-050`
- 작업 모드: `governance`

## 사용자 요청 요약

사용자는 플랫폼을 Visual Studio 같은 설치형 소프트웨어 구조로 만드는 방향을 생각하고 있다고 밝혔다.

## 변경 내용

`REQ-WS-050`을 추가해 end-user installer packaging을 별도 제품화 프로젝트로 관리한다.

- 새 루트 프로젝트: `platform-desktop-app/`
- 기존 `install_mode`와 desktop installer packaging을 분리한다.
- Tauri, Electron, native packaging-only 후보를 비교한다.
- signing, notarization, update, uninstall, rollback, privacy, dependency/license review를 release gate로 둔다.
- 실제 dependency 설치가 발생하면 설치 감사 기록을 남긴다.

## 근거

- Electron 공식 문서는 application packaging/distribution을 별도 주제로 다룬다.
- Tauri 공식 문서는 OS별 배포와 installer 경로를 제공한다.
- Microsoft MSIX 문서는 Windows 앱 패키징 형식을 설명한다.
- Apple Developer 문서는 macOS 외부 배포 전 notarization을 요구 신뢰 단계로 다룬다.
