# 설치형 소프트웨어 제품화 정책

## 목적

플랫폼을 사용자가 설치하는 소프트웨어로 만들 때는 레포지토리 setup과 end-user installer packaging을 구분한다. 사용자가 말하는 Visual Studio 같은 설치형 구조는 `platform-desktop-app/` 프로젝트가 소유한다.

## 규칙

- 설치형 desktop app 제품화는 `platform-desktop-app/`에서 관리한다.
- `agent-platform/configs/installations/install-mode-registry.json`은 레포지토리 사용/개발 환경 설치 모드이고, DMG/MSIX/MSI/NSIS 같은 배포 패키징과 다르다.
- desktop shell은 처음에는 `workspace-monitor/` 재사용을 우선 검토한다.
- Tauri, Electron, native packaging-only 중 최소 두 경로를 비교한 뒤 framework나 packager dependency를 설치한다.
- 실제 dependency 설치, 업그레이드, 제거가 발생하면 설치 감사 기록을 남긴다.
- installer에는 실제 token, webhook URL, browser cookie, private snapshot, 로컬 전용 secret을 넣지 않는다.
- macOS 배포는 signing과 notarization, Windows 배포는 signing과 installer format, Linux 배포는 배포판별 format과 uninstall behavior를 release gate로 둔다.
- production-ready라고 부르기 전 install, first-run, update, uninstall, rollback smoke test와 privacy/security/license review를 완료한다.

## Source Of Truth

- 프로젝트: `platform-desktop-app/`
- 배포 설정: `platform-desktop-app/configs/desktop-distribution-registry.json`
- workflow: `_ops/workflows/63-installable-software-productization.md`
- prompt: `_ops/prompts/93-installable-software-productization.md`

## 현재 기준

2026-06-02 현재 추천은 Tauri-first prototype이다. 다만 final decision은 잠그지 않는다. Electron과 native packaging-only는 비교 후보로 유지한다.
