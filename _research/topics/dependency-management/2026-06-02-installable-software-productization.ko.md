# 설치형 소프트웨어 제품화 조사 노트

## 조사일

2026-06-02

## 확인한 출처

- Electron application distribution official docs: `https://www.electronjs.org/docs/tutorial/application-distribution/`
- Electron Forge makers official docs: `https://www.electronforge.io/config/makers`
- Tauri distribute official docs: `https://tauri.app/distribute/`
- Tauri Windows installer official docs: `https://tauri.app/distribute/windows-installer/`
- Microsoft MSIX official docs: `https://learn.microsoft.com/en-us/windows/msix/`
- Apple notarization official docs: `https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution`

## 핵심 인사이트

- 설치형 앱은 local setup script가 아니라 배포 신뢰 체인이다.
- macOS는 signing/notarization이 release gate다.
- Windows는 MSIX/MSI/NSIS 같은 installer format과 signing 선택이 필요하다.
- Tauri와 Electron은 모두 web UI를 desktop shell로 감쌀 수 있지만, bundle size, runtime, updater, ecosystem trade-off가 다르다.
- 현재 플랫폼에는 `workspace-monitor`라는 web UI 후보가 있으므로 새 UI보다 desktop shell 경계를 먼저 검증하는 편이 유지보수에 유리하다.

## 결정 반영

- `platform-desktop-app/`를 새 루트 프로젝트로 만들었다.
- 첫 방향은 Tauri-first prototype으로 기록하되 Electron과 native packaging-only를 비교 후보로 유지했다.
- 실제 dependency 설치는 하지 않았다.
