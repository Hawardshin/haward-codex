# 설치형 데스크톱 앱 요구사항

## 범위

플랫폼을 Visual Studio Code처럼 사용자가 설치하는 소프트웨어로 만들기 위한 첫 요구사항이다.

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| PDA-REQ-001 | 설치형 앱 제품화는 `platform-desktop-app/` 루트 프로젝트가 소유해야 한다. | must | 프로젝트 등록부와 구조 감사 |
| PDA-REQ-002 | 레포지토리 setup `install_mode`와 end-user installer packaging을 문서와 설정에서 구분해야 한다. | must | product boundary 문서와 registry 검토 |
| PDA-REQ-003 | 현재 desktop product shell은 `platform-desktop-app/renderer/workspace-monitor/`를 선택된 제품 UI 원천으로 소유해야 한다. | should | desktop distribution registry 확인 |
| PDA-REQ-004 | Tauri, Electron, native packaging 후보를 비교한 뒤 dependency 설치나 구현을 시작해야 한다. | must | packaging strategy와 spec traceability |
| PDA-REQ-005 | 배포 가능 상태는 signing, notarization/OS trust, install/update/uninstall smoke test, privacy review, dependency/license review가 끝나야 한다. | must | release gate checklist |
| PDA-REQ-006 | 실제 token, webhook URL, browser cookie, private snapshot을 installer에 번들하지 않아야 한다. | must | privacy/security review |
| PDA-REQ-007 | macOS 실행 가능 구조는 개발자 로컬 실행, 내부 테스트 `.app`, 외부 배포 앱을 구분하고, `.app` bundle/process model, workspace 선택, optional CLI adapter, Developer ID signing, hardened runtime, notarization, stapling, update, clean Mac smoke test 기준을 명시해야 한다. | must | `macos-execution-profile.json`, macOS 실행 문서, config contract |
| PDA-REQ-008 | Windows 실행 가능 구조는 개발자 로컬 실행, 내부 테스트 installer, 공개 signed distribution을 구분하고, MSI/NSIS/MSIX, WebView2, code signing, SmartScreen, update, uninstall, clean Windows smoke test 기준을 명시해야 한다. | must | `windows-execution-profile.json`, config contract |
| PDA-REQ-009 | 현재 구현 제품 shell은 Tauri v2/Rust 데스크톱 셸, project-owned `renderer/workspace-monitor` 정적 UI, `agent-platform` Python 계층, optional external CLI adapter 구조를 따라야 한다. | must | `src-tauri/`, `package.json`, desktop distribution registry |
| PDA-REQ-010 | Codex, Claude Code, Cursor, Antigravity 같은 AI 코딩 도구는 플랫폼 필수 런타임이 아니라 설정 가능한 선택형 capability로 처리해야 한다. | must | CLI adapter registry와 desktop registry 검토 |
| PDA-REQ-011 | Rust/Tauri dependency 설치 또는 빌드 실행 전에는 설치 감사 기록, license/security 검토, rollback 계획을 남겨야 한다. | must | 설치 기록과 `planned_commands` 검토 |
| PDA-REQ-012 | public-ready 또는 “설치만 하면 됨” 수준의 표현은 macOS/Windows signing, notarization 또는 code-signing, clean-machine smoke test, update/uninstall/rollback test가 끝나기 전까지 금지해야 한다. | must | release gate와 평가 기록 |
| PDA-REQ-013 | 설치형 앱은 Claude Code CLI, Gemini CLI, Codex CLI, OpenCode를 첫 AI CLI adapter 후보로 표시하되 어떤 CLI도 앱 실행, 워크스페이스 보기, 히스토리 보기의 필수 런타임으로 만들지 않아야 한다. | must | CLI adapter registry, user-flow registry, readiness test |
| PDA-REQ-014 | 다중 AI CLI 실행은 여러 터미널을 단순히 여는 방식이 아니라 process graph, lane status, bounded terminal output, stdin policy, cancellation, orphan cleanup, merge gate를 가진 platform supervisor가 관리해야 한다. | must | multi-CLI architecture doc, CLI pipeline validation, resource check |
| PDA-REQ-015 | CLI가 사용자 질문을 만들고 사용자가 부재 중이면 앱은 안전한 defer message를 보낼 수 있는 경우에만 보내고, dependent lane만 멈추며, 결정 항목을 decision inbox에 저장하고, 독립 작업은 계속해야 한다. | must | `ai_cli_orchestration_flow`, human decision inbox, omission check |
| PDA-REQ-016 | 터미널 output은 raw scrollback으로만 보존하지 않고, task event, process event, artifact, decision packet, verification, reusable knowledge candidate로 구조화해 provenance, redaction, validation, retention을 기록해야 한다. | must | data accumulation contract, history/evaluation records |
| PDA-REQ-017 | 소스코드 편집은 처음부터 직접 구현하지 않고 Monaco Editor 같은 성숙한 오픈소스 editor surface를 우선 검토해야 하며, 파일 URI/model lifecycle, dispose, worker/runtime 제약을 제품 acceptance에서 검증해야 한다. | should | architecture doc, dependency audit, UI product acceptance |
| PDA-REQ-018 | 첫 실제 supervisor 구현은 allowlist된 AI CLI에 대해서만 PATH 탐지와 stdin 없는 bounded health/version check를 제공하고, 누락된 CLI는 `capability_missing`으로 표시해야 한다. | must | Tauri commands, Desktop tab, readiness/test |
| PDA-REQ-019 | desktop UI는 Tauri runtime이 없을 때도 브라우저에서 안전하게 열려야 하며, CLI 실행 기능은 unavailable fallback으로 degrade해야 한다. | must | workspace-monitor build, TypeScript check |
| PDA-REQ-020 | CLI supervisor는 dependency 설치 전 slice에서 shell plugin 없이 allowlist된 adapter에 한해 pipe 기반 session start, stdout/stderr polling, bounded stdin write, defer message, cancel을 제공하고, defer 시 감지된 질문을 human decision inbox에 저장해야 한다. | must | Tauri commands, Desktop tab, human decision inbox, resource/CLI pipeline check |
| PDA-REQ-021 | source editing product slice는 workspace root 안의 상대 경로만 읽고 쓸 수 있어야 하며 `_private/`, `outputs/`, workspace 밖 경로, symlink escape를 차단하고 저장 전 backup을 남겨야 한다. | must | Tauri file commands, TypeScript check, resource/security review |
| PDA-REQ-022 | Desktop product slice는 자동 설치 없이도 사용자가 각 CLI의 설치 힌트, 검증 명령, 공식 참조 링크를 보고, 작업 모드 프리셋으로 session prompt를 만들고, 보류된 human decision inbox 항목을 읽고 답변 상태로 저장할 수 있어야 한다. | must | Tauri decision commands, Desktop tab setup/mode/inbox UI, readiness/test |
| PDA-REQ-023 | Desktop product slice는 active CLI session에서 생성되어 session metadata가 있는 decision에 대해 사용자가 명시적으로 답변과 재개를 선택하면, decision answer를 저장한 뒤 같은 답변을 해당 session stdin으로 보내고 session report를 갱신해야 한다. | must | Tauri answer-and-resume command, Desktop tab Answer & Resume UI, readiness/test |
| PDA-REQ-024 | Desktop product surface는 레퍼런스 UI 적용 결과로 command palette, capability center, run board, lane timeline, process graph, grouped decision inbox, decision replay, source diff review, evidence/promotion surface를 같은 supervisor 화면에서 보여야 한다. | must | Workspace Monitor Desktop tab, readiness/test, build |
| PDA-REQ-025 | Desktop source editing product slice는 여러 workspace-scoped 파일을 동시에 열어 드래프트 큐로 관리하고, dirty 상태, diff preview, 현재 파일 저장, 전체 dirty 파일 저장, 현재 드래프트 되돌리기, 드래프트 닫기, backup 저장 결과를 같은 화면에서 제공해야 한다. | must | Workspace Monitor Desktop tab, readiness/test, TypeScript check |
| PDA-REQ-026 | 설치형 플랫폼은 Codex, Gemini CLI, Claude Code CLI, OpenCode, Cursor, Antigravity 같은 상용/외부 AI 도구 위에서 동작하는 종속 앱이 아니라, 먼저 실행되는 platform-first host runtime이어야 한다. 외부 AI CLI는 플랫폼 위의 guest adapter lane으로만 붙고, task state, durable memory, decision inbox, artifact, validation, UI authority는 플랫폼이 소유해야 한다. | must | CLI adapter registry, desktop registry, architecture docs, readiness/test |
| PDA-REQ-027 | Desktop supervisor는 단일 CLI session뿐 아니라 task intake를 기준으로 여러 optional CLI lane을 pipe graph로 초기화할 수 있어야 한다. 각 lane은 stdin init, stdout/stderr bounded capture, decision inbox routing, merge gate artifact flow를 명시해야 하며, 누락된 CLI lane은 `capability_missing`으로만 degrade해야 한다. | must | Tauri task pipe command, CLI adapter registry, Workspace Monitor Desktop tab, readiness/test |
| PDA-REQ-028 | Desktop supervisor와 monitor UI는 장시간 사용 중 CLI child process, stdout/stderr reader thread, 완료 session output buffer, polling interval, fetch/effect 같은 runtime resource가 누적되지 않도록 cleanup, retention, bounded output, abort/clear lifecycle을 가져야 한다. | must | Rust `cargo test`/`cargo build`, Workspace Monitor build/check, `check-resources` |
| PDA-REQ-029 | Desktop source editor는 Monaco를 단순 임베드하는 데서 끝나지 않고 runtime workspace file index, open editor tab strip, editor command toolbar, Monaco diff review, editor settings popup, platform template/context actions를 갖춘 코드 워크벤치여야 한다. | must | `list_workspace_text_files`, Workspace Monitor Source Review, readiness/test, Browser smoke |
| PDA-REQ-030 | 설치 앱이 띄우는 shell/runtime은 작업 전 bundled installer shell runtime contract를 읽어야 하며, 그 계약에 정의된 required read targets, enforcement gates, data accumulation targets를 따라 task, decision, evidence, validation, evaluation 기록을 구조화해 축적해야 한다. | must | `runtime-contracts/installer-shell-runtime-contract.json`, `get_installer_shell_runtime_contract`, `check-runtime-contract.mjs`, readiness/test |
| PDA-REQ-031 | 사용자는 설치형 데스크톱 앱 안에서 축적된 task run, decision inbox, payload audit, support bundle, agent workspace 데이터를 전용 Accumulated Data surface로 쉽게 볼 수 있어야 하며, 각 store의 record count, size, latest update, path, visibility, action label이 표시되어야 한다. | must | `get_accumulated_data_overview`, Workspace Monitor Accumulated Data panel, readiness/test |
| PDA-REQ-032 | Accumulated Data surface는 raw directory scan 결과만 화면에 반환하지 않고 `app_data/runtime-data/indexes/accumulated-data-overview.v1.json` versioned manifest를 저장해야 하며, UI는 schema version, storage format version, manifest path, migration status를 표시해야 한다. | must | `accumulated_data_index_path`, `AccumulatedDataOverviewReport.schemaVersion`, runtime contract target, readiness/test |
| PDA-REQ-033 | 설치형 데스크톱 앱은 사용자가 별도 터미널에서 git clone 후 그 폴더에서 작업해야 하는 구조에 의존하지 않고, 앱 안에서 기존 workspace import, repository clone, active workspace 선택, workspace state persistence를 제공해야 하며 source editor와 CLI working directory는 app-selected workspace를 우선 사용해야 한다. | must | `get_desktop_workspace_state`, `set_desktop_workspace_path`, `clone_desktop_workspace`, Workspace Host panel, readiness/test |
| PDA-REQ-034 | 설치형 데스크톱 앱의 제품 UI는 루트 `workspace-monitor/` 독립 프로젝트가 아니라 `platform-desktop-app/renderer/workspace-monitor/` 아래의 renderer package로 관리되어야 하며, pnpm workspace, Tauri `frontendDist`, readiness checks, registry, docs, generated maps는 이 소유권을 강제해야 한다. | must | pnpm workspace, Tauri config, project registry, structure audit, workspace index, readiness/test |
| PDA-REQ-035 | 설치형 데스크톱 앱은 `product-feature-registry.json`를 기준으로 현재 shell, source review, runtime data, decision inbox, history, requirements, monitoring 조각을 제품 기능 레이어로 표면화해야 하며, primary 기능은 agent orchestration, agent work environment, agent development environment, agent factory, learning/evaluation loop이고 monitoring은 supporting observability로만 취급해야 한다. | must | product feature registry, Workspace Monitor product feature architecture panel, customer snapshot, readiness/test |
| PDA-REQ-036 | 설치형 데스크톱 앱의 기본 제품 네비게이션과 user view는 `overview`, `desktop`, `agents`, `source`, `intent` 같은 작업/생성/개발/학습 섹션을 전면에 두어야 하며, `projects`, `history`, `structure`, `documents`, `requirements` 같은 운영/모니터링/문서/거버넌스 섹션은 별도 Operator Center나 settings-style 표면으로 분리해야 한다. | must | view-mode registry, product feature registry, Workspace Monitor shell, customer snapshot, readiness/test, Browser smoke |
| PDA-REQ-037 | 설치형 데스크톱 앱은 사용자 요청 커버리지와 미완성 제품 gap을 `product-gap-registry.json`에서 request ID, coverage status, remaining gap IDs, priority, acceptance criteria, recommended next slice로 관리해야 하며, readiness/test는 `agent_factory_creation_wizard`와 `learning_feedback_automation_loop` 같은 P0 gap이 구현 전 사라지지 않도록 검증해야 한다. | must | product gap registry, deferred-work coverage audit spec, readiness/test, omission/evaluation records |
| PDA-REQ-038 | 설치형 데스크톱 앱은 한국어 기본 README와 별도 영어 README를 제공해야 하며, 사용자가 테스트/빌드/내부 패키징/공개 배포 gate 확인을 여러 명령으로 흩어 치지 않도록 repository root에서 실행 가능한 원샷 명령과 한/영 release runbook을 제공해야 한다. | must | README.ko/en, release runbook ko/en, root/package scripts, desktop pipeline script, readiness/test |

## 현재 상태

- 상태: 제품 shell baseline
- 실제 desktop dependency 설치: Tauri/Rust local build path 설치 감사 완료
- 현재 선택: Tauri-first product shell
- 다음 단계: public signing/notarization, signed updater, clean-machine smoke test
