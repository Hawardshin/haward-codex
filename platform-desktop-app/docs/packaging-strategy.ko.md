# 설치형 소프트웨어 패키징 전략

## 근거 요약

- Electron 공식 문서는 앱 패키징과 배포 과정을 별도로 다룬다.
- Electron Forge는 OS별 installer maker 구성을 제공한다.
- Tauri 공식 문서는 배포와 OS별 bundler/installer 경로를 제공한다.
- Microsoft MSIX 문서는 Windows 앱 패키징 형식과 설치 경험을 설명한다.
- Apple Developer 문서는 macOS 외부 배포 시 notarization을 신뢰 게이트로 다룬다.

## 후보 전략

### Tauri-first desktop shell

현재 추천은 Tauri-first prototype이다.

- 장점: 기존 web UI를 감싸기 쉽고, 작은 번들 목표에 맞다.
- 리스크: Rust/toolchain, Python sidecar 또는 local service 경계 설계가 필요하다.
- 확인 필요: `workspace-monitor` static export 호환성, update 전략, macOS/Windows signing.

### Electron fallback

Electron은 mature ecosystem과 풍부한 installer 사례가 강점이다.

- 장점: JavaScript 생태계, Node 통합, installer tooling 자료가 많다.
- 리스크: 번들 크기와 Chromium runtime 비용, local access security hardening.
- 확인 필요: Electron Forge와 electron-builder 중 선택, sandbox/context isolation, notarization.

### Native packaging only

데스크톱 shell이 제품 가치가 낮으면 CLI와 local web UI를 OS별 installer로 묶는 방식도 비교한다.

- 장점: 제품 표면이 작다.
- 리스크: 데스크톱 통합 경험이 약하고 사용자가 local service를 이해해야 할 수 있다.

## Release Gate

배포 가능한 설치형 앱이라고 부르기 전에는 다음을 완료한다.

- framework decision record
- project-local dependency install audit
- license/security review
- macOS signing/notarization plan
- Windows signing/installer format decision
- install/first-run/update/uninstall/rollback smoke tests
- privacy review
- 사용자 문서

## 아직 하지 않은 것

이번 작업에서는 Tauri, Electron, packager dependency를 설치하지 않았다. 제품화 구조와 판단 기준만 만들었다.
