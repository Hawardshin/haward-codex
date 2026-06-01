# 2026-06-02 macOS 실행 구조 웹 검색 기록

## 검색 목적

플랫폼을 macOS에서 실행 가능한 설치형 앱으로 만들 때 필요한 공식 실행/배포 조건을 확인한다.

## 검색어

- `Apple Developer macOS app distribution notarization hardened runtime official`
- `Apple Developer Notarizing macOS software before distribution official`
- `Tauri v2 macOS code signing notarization distribute official`
- `Tauri v2 macOS updater official docs`
- `Electron macOS code signing notarization auto updater official documentation`

## 확인한 출처

| 출처 | 유형 | 확인 내용 | 반영 |
| --- | --- | --- | --- |
| Apple Developer: Notarizing macOS software before distribution | 공식 문서 | Mac App Store 밖 배포 시 notarization 필요성 확인 | public distribution release gate |
| Apple Developer: Hardened Runtime | 공식 문서 | notarization 전 hardened runtime 필요성 확인 | release gate와 entitlement 최소화 |
| Xcode Help: Distribute outside the Mac App Store | 공식 문서 | Developer ID signing, notarization, Gatekeeper-enabled launch test 확인 | external distribution 조건 |
| Tauri: Distribute | 공식 문서 | App Bundle, DMG, platform-specific installer, signing/notarization 경로 확인 | Tauri-first 배포 구조 |
| Tauri: macOS Code Signing | 공식 문서 | Developer ID Application, notarization credential, ad-hoc signing 한계 확인 | local/internal/public 실행 레벨 분리 |
| Tauri: Updater | 공식 문서 | updater는 별도 signature/manifest 계획이 필요함 확인 | update strategy gate |
| Electron: Code Signing | 공식 문서 | Electron fallback의 macOS signing/notarization 고려사항 확인 | fallback 비교 근거 |
| Electron: autoUpdater | 공식 문서 | Electron updater는 별도 update channel 설계가 필요함 확인 | fallback update 비교 |

## 제외한 약한 출처

- 개인 블로그의 ad-hoc codesign 예시는 공식 문서로 대체했다.
- 오래된 `altool` 중심 튜토리얼은 현재 구조 결정에 쓰지 않았다.
- Stack Overflow 답변은 이번 작업이 구현 디버깅이 아니라 배포 구조 정의라서 보조 신호로도 사용하지 않았다.

## 계획 반영

- `platform-desktop-app/configs/macos-execution-profile.json`을 macOS 실행 구조의 source of truth로 추가했다.
- macOS 실행 레벨을 `developer_local_run`, `internal_test_app`, `public_outside_app_store`로 나눴다.
- public macOS ready는 Developer ID signing, hardened runtime, notarization, 가능한 경우 stapling, clean Mac smoke test 없이는 주장하지 않도록 했다.
- Tauri-first를 유지하되 Electron은 fallback 비교로만 남겼다.

## 불확실성

- 실제 signing/notarization은 Apple Developer account, certificate, credential, CI secret 준비가 필요하다.
- 이번 작업은 구조 정의이며 실제 `.app` 빌드와 공증 실행은 하지 않았다.

