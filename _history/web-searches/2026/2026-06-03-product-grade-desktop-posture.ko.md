# 웹 검색 기록: 제품급 데스크톱 구조 전환

- 날짜: 2026-06-03
- 요청 요약: 설치형 플랫폼을 더 이상 초기 UI 후보나 PoC로 다루지 않고 판매 가능한 데스크톱 제품 구조로 승격한다.

## 검색어

- `Tauri 2 security capabilities permissions official docs`
- `Tauri updater distribution signing official docs`
- `Apple notarizing macOS software Developer ID official docs`
- `Microsoft app package signing official docs`

## 확인한 강한 출처

- Tauri Distribute: `https://v2.tauri.app/distribute/`
  - 앱 build/bundle, OS별 배포, code signing이 배포 절차의 일부임을 확인했다.
- Tauri Windows Code Signing: `https://tauri.app/distribute/sign/windows/`
  - Windows installer signing은 code-signing certificate와 signing command 구성이 필요하다는 점을 확인했다.
- Tauri ACL Permission/Capabilities: `https://v2.tauri.app/reference/acl/permission/`, `https://v2.tauri.app/security/capabilities/`
  - 데스크톱 shell의 native command 노출은 permission/capability boundary로 다뤄야 한다는 점을 재확인했다.
- Apple Developer Notarization: `https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution`
  - outside-App-Store 배포는 Developer ID signing, hardened runtime, notarization gate를 갖는다는 기준을 확인했다.
- Apple Platform Security app signing: `https://support.apple.com/guide/security/app-code-signing-process-sec3ad8e6e53/web`
  - Gatekeeper-friendly macOS 배포의 signing/notarization 신뢰 모델을 확인했다.
- Microsoft code signing options: `https://learn.microsoft.com/en-us/windows/apps/package-and-deploy/code-signing-options`
  - Windows public distribution에서 unsigned/self-signed 경로는 public user에게 적합하지 않다는 기준을 확인했다.

## 약한 출처 제외

- Reddit과 일반 블로그는 signing/updater 실무 위험 신호로만 참고 가능하지만, 이번 정책 변경의 근거로 사용하지 않았다.

## 계획 반영

- 선택된 Tauri/workspace-monitor 경로는 제품 구조로 고정하고, PoC/prototype 용어는 새 대체 경로 실험에만 허용한다.
- public-ready 표현은 signing, notarization, signed updater, clean-machine smoke, privacy/dependency review가 끝나기 전까지 gated/blocked로 유지한다.
- readiness status는 dependency audit 후보나 release candidate가 아니라 제품 구조 준비/public gate 분리 상태를 표현하도록 수정한다.

## 남은 불확실성

- Windows public distribution은 실제 certificate, Store/MSIX/MSI/NSIS 선택, SmartScreen trust 계획이 필요하다.
- macOS public distribution은 실제 Developer ID credential과 notarization smoke가 필요하다.
