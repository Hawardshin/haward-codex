# 설치형 데스크톱 앱 요구사항

## 범위

플랫폼을 Visual Studio Code처럼 사용자가 설치하는 소프트웨어로 만들기 위한 첫 요구사항이다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| PDA-REQ-001 | 설치형 앱 제품화는 `platform-desktop-app/` 루트 프로젝트가 소유해야 한다. | must | 프로젝트 등록부와 구조 감사 |
| PDA-REQ-002 | 레포지토리 setup `install_mode`와 end-user installer packaging을 문서와 설정에서 구분해야 한다. | must | product boundary 문서와 registry 검토 |
| PDA-REQ-003 | 첫 desktop prototype은 `workspace-monitor` 재사용을 우선 검토해야 한다. | should | desktop distribution registry 확인 |
| PDA-REQ-004 | Tauri, Electron, native packaging 후보를 비교한 뒤 dependency 설치나 구현을 시작해야 한다. | must | packaging strategy와 spec traceability |
| PDA-REQ-005 | 배포 가능 상태는 signing, notarization/OS trust, install/update/uninstall smoke test, privacy review, dependency/license review가 끝나야 한다. | must | release gate checklist |
| PDA-REQ-006 | 실제 token, webhook URL, browser cookie, private snapshot을 installer에 번들하지 않아야 한다. | must | privacy/security review |
| PDA-REQ-007 | macOS 실행 가능 구조는 개발자 로컬 실행, 내부 테스트 `.app`, 외부 배포 앱을 구분하고, `.app` bundle/process model, workspace 선택, optional CLI adapter, Developer ID signing, hardened runtime, notarization, stapling, update, clean Mac smoke test 기준을 명시해야 한다. | must | `macos-execution-profile.json`, macOS 실행 문서, config contract |

## 현재 상태

- 상태: baseline draft
- 실제 desktop dependency 설치: 없음
- 다음 단계: `macos-execution-profile.json` 기준으로 Tauri/Electron/native packaging 비교를 더 깊게 한 뒤 prototype 구현 여부 결정
