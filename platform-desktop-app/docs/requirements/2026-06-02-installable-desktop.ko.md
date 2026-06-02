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
| PDA-REQ-008 | Windows 실행 가능 구조는 개발자 로컬 실행, 내부 테스트 installer, 공개 signed distribution을 구분하고, MSI/NSIS/MSIX, WebView2, code signing, SmartScreen, update, uninstall, clean Windows smoke test 기준을 명시해야 한다. | must | `windows-execution-profile.json`, config contract |
| PDA-REQ-009 | 첫 구현 스캐폴드는 Tauri v2/Rust 데스크톱 셸, `workspace-monitor` 정적 UI, `agent-platform` Python 계층, optional external CLI adapter 구조를 따라야 한다. | must | `src-tauri/`, `package.json`, desktop distribution registry |
| PDA-REQ-010 | Codex, Claude Code, Cursor, Antigravity 같은 AI 코딩 도구는 플랫폼 필수 런타임이 아니라 설정 가능한 선택형 capability로 처리해야 한다. | must | CLI adapter registry와 desktop registry 검토 |
| PDA-REQ-011 | Rust/Tauri dependency 설치 또는 빌드 실행 전에는 설치 감사 기록, license/security 검토, rollback 계획을 남겨야 한다. | must | 설치 기록과 `planned_commands` 검토 |
| PDA-REQ-012 | public-ready 또는 “설치만 하면 됨” 수준의 표현은 macOS/Windows signing, notarization 또는 code-signing, clean-machine smoke test, update/uninstall/rollback test가 끝나기 전까지 금지해야 한다. | must | release gate와 평가 기록 |
| PDA-REQ-013 | 설치형 앱은 Claude Code CLI, Gemini CLI, Codex CLI, OpenCode를 첫 AI CLI adapter 후보로 표시하되 어떤 CLI도 앱 실행, 워크스페이스 보기, 히스토리 보기의 필수 런타임으로 만들지 않아야 한다. | must | CLI adapter registry, user-flow registry, readiness test |
| PDA-REQ-014 | 다중 AI CLI 실행은 여러 터미널을 단순히 여는 방식이 아니라 process graph, lane status, bounded terminal output, stdin policy, cancellation, orphan cleanup, merge gate를 가진 platform supervisor가 관리해야 한다. | must | multi-CLI architecture doc, CLI pipeline validation, resource check |
| PDA-REQ-015 | CLI가 사용자 질문을 만들고 사용자가 부재 중이면 앱은 안전한 defer message를 보낼 수 있는 경우에만 보내고, dependent lane만 멈추며, 결정 항목을 decision inbox에 저장하고, 독립 작업은 계속해야 한다. | must | `ai_cli_orchestration_flow`, human decision inbox, omission check |
| PDA-REQ-016 | 터미널 output은 raw scrollback으로만 보존하지 않고, task event, process event, artifact, decision packet, verification, reusable knowledge candidate로 구조화해 provenance, redaction, validation, retention을 기록해야 한다. | must | data accumulation contract, history/evaluation records |
| PDA-REQ-017 | 소스코드 편집은 처음부터 직접 구현하지 않고 Monaco Editor 같은 성숙한 오픈소스 editor surface를 우선 검토해야 하며, 파일 URI/model lifecycle, dispose, worker/runtime 제약을 구현 전에 검증해야 한다. | should | architecture doc, dependency audit, UI prototype test |
| PDA-REQ-018 | 첫 실제 supervisor 구현은 allowlist된 AI CLI에 대해서만 PATH 탐지와 stdin 없는 bounded health/version check를 제공하고, 누락된 CLI는 `capability_missing`으로 표시해야 한다. | must | Tauri commands, Desktop tab, readiness/test |
| PDA-REQ-019 | desktop UI는 Tauri runtime이 없을 때도 브라우저에서 안전하게 열려야 하며, CLI 실행 기능은 unavailable fallback으로 degrade해야 한다. | must | workspace-monitor build, TypeScript check |

## 현재 상태

- 상태: baseline draft
- 실제 desktop dependency 설치: 없음
- 현재 선택: Tauri-first scaffold
- 다음 단계: Rust/Tauri 설치 감사 기록을 만든 뒤 developer-local Tauri 실행 검증
