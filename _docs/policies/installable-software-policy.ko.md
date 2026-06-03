# 설치형 소프트웨어 제품화 정책

## 목적

플랫폼을 사용자가 설치하는 소프트웨어로 만들 때는 레포지토리 setup과 end-user installer packaging을 구분한다. 사용자가 말하는 Visual Studio 같은 설치형 구조는 `platform-desktop-app/` 프로젝트가 소유한다.

## 규칙

- 설치형 desktop app 제품화는 `platform-desktop-app/`에서 관리한다.
- `agent-platform/configs/installations/install-mode-registry.json`은 레포지토리 사용/개발 환경 설치 모드이고, DMG/MSIX/MSI/NSIS 같은 배포 패키징과 다르다.
- desktop shell은 선택된 제품 UI 원천으로 `platform-desktop-app/renderer/workspace-monitor/`를 소유한다. 별도 UI로 바꾸려면 release-quality migration plan, trace update, validation run을 먼저 남긴다.
- desktop UI나 installer 구현 전에 `platform-desktop-app/configs/user-flow-registry.json`을 확인하고 첫 실행, workspace chooser, view mode, optional setup deferral, task timeline, decision inbox, recovery 흐름을 검토한다.
- 설치형 앱은 특정 CLI wrapper가 아니다. 외부 CLI는 `agent-platform/configs/integrations/cli-adapter-registry.json`의 adapter contract를 통해 optional capability로 붙인다.
- Tauri는 현재 선택된 제품 런타임이다. Electron, Wails, native packaging-only는 새 release blocker나 유지보수 근거가 생길 때만 비교 경로로 재검토한다.
- PoC, prototype, initial candidate 표현은 새 대체 경로의 제한된 실험에만 사용한다. 선택된 `platform-desktop-app/` 제품 구조를 PoC나 초기 후보로 강등하지 않는다.
- 실제 dependency 설치, 업그레이드, 제거가 발생하면 설치 감사 기록을 남긴다.
- installer에는 실제 token, webhook URL, browser cookie, private snapshot, 로컬 전용 secret을 넣지 않는다.
- macOS 배포는 signing과 notarization, Windows 배포는 signing과 installer format, Linux 배포는 배포판별 format과 uninstall behavior를 release gate로 둔다.
- production-ready라고 부르기 전 install, first-run, update, uninstall, rollback smoke test와 privacy/security/license review를 완료한다.

## Source Of Truth

- 프로젝트: `platform-desktop-app/`
- 배포 설정: `platform-desktop-app/configs/desktop-distribution-registry.json`
- 사용자 플로우 설정: `platform-desktop-app/configs/user-flow-registry.json`
- CLI adapter 설정: `agent-platform/configs/integrations/cli-adapter-registry.json`
- workflow: `_ops/workflows/63-installable-software-productization.md`
- prompt: `_ops/prompts/93-installable-software-productization.md`

## 현재 기준

2026-06-03 현재 기준은 Tauri-first 제품 런타임이다. `platform-desktop-app/renderer/workspace-monitor`는 데스크톱 제품이 소유하는 선택된 renderer UI 원천이며, Electron, Wails, native packaging-only는 기록된 release blocker나 유지보수 근거가 있을 때만 fallback/comparison route로 재평가한다.
