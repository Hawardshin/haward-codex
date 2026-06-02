# 사용자 의도 기반 기능 지도

## 범위

- 기준 날짜: 2026-06-03
- 입력 기록:
  - `_history/user-requests/2026/2026-05-31.ko.md`: 지속 의도 46개
  - `_history/user-requests/2026/2026-06-01.ko.md`: `UR-2026-06-01-001` ~ `UR-2026-06-01-035`
  - `_history/user-requests/2026/2026-06-02.ko.md`: `UR-2026-06-02-001` ~ `UR-2026-06-02-060`
  - `_history/user-requests/2026/2026-06-03.ko.md`: `UR-2026-06-03-001` ~ `UR-2026-06-03-014`
- 총 구조화 의도: 155개
- 제외: `_private/`, build output, dependency folders, 원문 채팅 전문, 민감 로컬 내용

## 요약 결론

사용자의 반복 의도는 “AI가 대답을 잘하는 도구”가 아니라 “사람의 반복 업무 프로세스를 연구, 판단, 실행, 검증, 기록, 제품화하는 개인 에이전트 운영체계”로 수렴한다.

기능은 크게 12개 축으로 정리된다.

| 축 | 사용자 의도 | 이미 구현된 핵심 기능 | 다음 기능 후보 |
| --- | --- | --- | --- |
| 1. 플랫폼 정체성과 운영 루프 | 이 레포를 개인 에이전트 구축 플랫폼으로 만들고, 의도-요구사항-스펙-검증-평가-커밋으로 이어지게 한다. | `_philosophy/`, `_requirements/`, `_specs/`, `_history/`, work evaluator, memory bootstrap | Intent cockpit, 의도-기능 roadmap UI |
| 2. 조사와 근거 엔진 | 웹 검색을 먼저 하고, 다양한 출처를 사람처럼 찾아 인사이트와 계획으로 바꾼다. | source registry, human search profile, research/deep/coding/marketing profiles, grounding guard | source freshness monitor, citation audit dashboard |
| 3. 요구사항/스펙/검증 체계 | 지시를 요구사항 후보로 만들고, 스펙/계획/작업/검증/추적성으로 구현한다. | requirements lifecycle, spec-driven artifacts, spec reconciliation, omission/resource/grounding guards | trace matrix dashboard, one-click rework plan |
| 4. 능력 승격과 스킬/도구 생명주기 | 반복되는 작업을 prompt/workflow/template/tool/skill/agent/feature로 승격한다. | capability promotion registry, skill lifecycle, skill activation checker, `_tools/` | capability inbox, installed skill inventory, usage-based promotion signal |
| 5. 에이전트 생성과 오케스트레이션 | 다양한 에이전트를 만들고, 에이전트끼리 역할을 나눠 일하게 한다. | agent orchestration registry, specialized agents, parallel work, merge gates | agent marketplace, role composition UI, agent run comparison |
| 6. 사람 판단과 질문 병목 해소 | 질문 하나 때문에 전체가 멈추지 않고, 필요한 답변은 inbox로 모아 재개한다. | bounded clarification, non-blocking clarification, human decision inbox, human arbitration | decision SLA, resume queue, user answer impact preview |
| 7. 설치형 데스크톱 플랫폼 | 플랫폼이 먼저 실행되고, 여러 AI CLI는 guest adapter로 붙는다. | `platform-desktop-app/`, Tauri/Rust build, CLI adapters, task pipe, CLI session supervisor | persistent workspace chooser, adapter setup wizard, signed updater |
| 8. 런타임 데이터/로그/고객 경계 | 고객은 플랫폼 소스를 보지 않고, runtime data/log/agent workspace를 별도 축적한다. | runtime data boundary, app-data task-run store, support bundle, customer snapshot sanitization | retention UI, redaction preview, customer export lifecycle |
| 9. Workspace Monitor와 운영 UI | 히스토리, 프로젝트, 에이전트, 소스, 모드, 작업 상태를 한 화면에서 본다. | Workspace Monitor, unified ops timeline, mode/function switchboard, source viewer, collaboration board | intent-feature map tab, roadmap/changelog surface, blocker triage surface |
| 10. 발표/디자인/에셋 생태계 | 좋은 PPT/HTML 발표 레퍼런스와 에셋을 모아 발표 자료를 만든다. | `presentation-agent/`, PPTX/HTML generation, Open Impress collection, SVG asset library, Playwright validation | deck quality scoring, template picker, license gate automation |
| 11. 보안/프라이버시/가드레일 | 금지 문구가 아니라 구조적 실행 경계와 rollback으로 위험을 통제한다. | sensitive boundary, structural guardrails, privacy audit, install audit, view/install/language modes | permission review UI, policy violation monitor, public release privacy gate |
| 12. 서비스 준비도와 제품화 | 실제 서비스라고 부를 수 있는 수준의 release/support/update/privacy/onboarding blocker를 노출한다. | service readiness registry, readiness script, Desktop panel, internal/public blocker split | Developer ID signing, notarization, clean-machine smoke, production update channel |

## 날짜별 의도 흐름

### 2026-05-31: 운영체계의 뼈대

사용자는 처음부터 이 레포를 단순 코드 저장소가 아니라 개인 에이전트 구축 플랫폼으로 만들려 했다. 핵심은 지속 규칙, 프로젝트 경계, git/push 운영, 히스토리, 요구사항, spec-driven 개발, 평가, 웹 검색, 리서치 축적, 스킬/도구 승격이었다.

기능으로 보면 다음이 시작점이다.

- workspace operating loop: 웹 우선 접수, memory bootstrap, work mode, 요구사항/스펙/검증/평가/커밋
- durable memory: `_history`, `_requirements`, `_specs`, `_research`, `_docs`, `_ops`
- source quality: 출처 registry, enterprise/high-quality source lists, coding research, architecture-first
- capability factory: 반복 작업을 tool/skill/workflow/agent로 승격
- governance baseline: naming, project boundary, git rules, persistent instructions

### 2026-06-01: 조사/발표/모니터/운영 자동화 확장

이 날의 의도는 “플랫폼 운영 루프를 더 실제적인 작업 능력으로 확장”하는 쪽이었다. 발표 에이전트, Workspace Monitor, 병렬 작업, 딥리서치, 마케팅 근거 조사, AI 사용 격차 해소, 모델별 프롬프팅, 작업 시간 기록이 추가됐다.

기능군은 다음처럼 묶인다.

- research engine: human-like search, deep research, marketing evidence, stack-aware coding research
- planning engine: language/architecture/folder decision, parallel work, merge gates, spec reconciliation
- presentation product: PPT/HTML reference collection, HTML deck, PPT generation, imported PPT reference workflow
- observability: Workspace Monitor, history timeline, folder map, workspace health
- productivity tooling: coding project bootstrap, work timing, source collector, naming/structure/docs audits
- AI usage improvement: poor instruction rewriting, bounded clarification, model-adaptive prompting

### 2026-06-02: 플랫폼-first 데스크톱과 강한 거버넌스

이 날의 의도는 “에이전트 운영체계를 실제 설치형 제품으로 만들기”였다. 질문 병목, decision inbox, install/user/view/language mode, CLI adapter, multi-process pipeline, agent orchestration, macOS/Windows execution, sensitive boundary, structural guardrail, design assets, desktop CLI supervisor까지 확장됐다.

가장 중요한 기능 흐름은 다음이다.

- desktop host runtime: 플랫폼이 먼저 실행되고 Codex/Gemini/Claude/OpenCode/Cursor 등은 guest CLI adapter로 붙는다.
- CLI orchestration: task intake, task pipe, multi-process CLI, stdout/stderr, file handoff, source editing
- decision flow: pending question, human decision inbox, answer/resume, human arbitration
- product mode split: user/developer install mode, user/developer/superadmin view mode, language mode
- app productization: Tauri shell, macOS/Windows profiles, first-run onboarding, workspace chooser, recovery
- governance gates: work mode enforcement, omission guard, resource guard, structural guardrails, sensitive file boundary
- design ecosystem: generated/external SVG asset library, Open Impress template collection, UX deep research

### 2026-06-03: 실제 구현, 고객 경계, 서비스 준비도

이 날의 의도는 “스펙이 아니라 실제 구현”과 “설치형 고객 제품으로 볼 때 부족한 부분을 메우기”였다. task-run 저장소, Rust/Tauri build, customer source hiding, runtime data root, service readiness, overview UX, philosophy feature factory, skill activation audit가 추가됐다.

기능군은 다음처럼 정리된다.

- executable desktop: Rust/Tauri local build, `.app`/DMG, codesign/hdiutil smoke
- task run persistence: task-run record, stdout/stderr logs, detail preview, prune
- customer boundary: source tree hidden from customer snapshot, app-data runtime store, redacted support bundle
- release readiness: customer bundle audit, internal/public release preflight, hardened runtime, public blocker report
- UX surface: operator strip, service readiness panel, runtime shortcuts, mode/function switchboard
- philosophy-to-feature: philosophy feature extraction registry, feature candidate contract, Workspace Monitor panel
- skill readiness: installed skill activation registry, missing installed skill sync, source/install drift check

## 현재 기능 인벤토리

### Core Platform

- `agent-platform` CLI: work evaluation, grounding, omission/resource guards, config contract, work/view/install/language modes, skill activation, philosophy trace/features
- 공통 configs: research, usage, integrations, orchestration, governance, runtime, security, workflows
- 공통 agents: research, coding, deep research, orchestration, capability promotion, human arbitration, infrastructure, timekeeper, profit, positive vision, principle guardian 등
- 공통 tools: source collector, workspace health/index, structure/naming/docs/privacy audit, work timer, coding project bootstrap

### Desktop Product

- Tauri/Rust desktop shell
- CLI session supervisor
- task pipe init
- deferred question handling
- scoped source editing
- task-run store and log preview
- runtime data boundary and support diagnostic export
- customer bundle audit
- service readiness surface

### Monitor UI

- Workspace snapshot collector
- History/project/docs/source browsing
- agent/history visualization
- collaboration board
- unified ops timeline
- view/language/mode switchers
- overview operator strip
- service readiness and runtime shortcuts

### Presentation And Design

- presentation-agent project
- reference catalogs
- PPTX-to-HTML conversion path
- HTML deck and script collaboration
- PPT artifact generation
- Open Impress template download/conversion/gallery
- generated and external SVG asset libraries
- Playwright validation for HTML decks

## 제품 관점의 남은 큰 기능

### Now

| 기능 후보 | 이유 | 의존성 |
| --- | --- | --- |
| Intent Feature Map UI | 지금 만든 의도-기능 지도를 Workspace Monitor에서 직접 볼 수 있어야 다음 우선순위 판단이 쉬워진다. | Workspace Monitor snapshot 확장 |
| Persistent Workspace Chooser | public service blocker로 남아 있고, 고객이 source tree를 보지 않게 하는 핵심 UX다. | `platform-desktop-app` runtime settings |
| Installed Skill Inventory | 스킬 자동 적용 문제를 다시 막으려면 설치된 스킬과 레포 source의 대응표가 필요하다. | `skill-activation-registry.json` |
| Capability Candidate Inbox | 철학/반복/병목에서 나온 기능 후보를 한 곳에서 보고 선택해야 한다. | capability promotion registry, philosophy feature registry |

### Next

| 기능 후보 | 이유 | 의존성 |
| --- | --- | --- |
| CLI Adapter Setup Wizard | 외부 CLI가 missing일 때 전체 플랫폼이 막히지 않도록 사용자 setup flow가 필요하다. | cli adapter registry, desktop UI |
| Data Quality Dashboard | 고품질 데이터 축적 철학을 실제 지표로 보여줘야 한다. | history/search/evaluation/work-timing records |
| Release Readiness Playbook UI | public blocker가 앱에 보이지만 해결 절차를 단계별로 실행하는 UI는 아직 약하다. | service readiness registry |
| Support Bundle Review/Redaction Preview | 고객 지원 시 무엇이 나가는지 사람이 확인해야 한다. | runtime data boundary, support diagnostics |
| Deck/Asset Template Picker | 발표/디자인 에셋이 축적됐지만 선택/적용 UI가 더 필요하다. | presentation-agent, design-asset-library |

### Later

| 기능 후보 | 이유 | 의존성 |
| --- | --- | --- |
| Developer ID Signing/Notarization/Stapling | public macOS release의 실제 배포 게이트다. | Apple credentials, human checkpoint |
| Signed Updater Channel | 설치형 제품은 업데이트/rollback 경로 없이는 public service로 보기 어렵다. | update endpoint, signing key policy |
| Clean-Machine Smoke Automation | 고객 설치 환경 검증이 필요하다. | release package, external clean machine or VM |
| Cross-Platform Windows Installer Hardening | Windows productization이 설계돼 있으나 public-ready 검증은 별도다. | Windows signing/NSIS/WebView2 checks |

## 우선순위 해석

사용자의 의도는 기능을 많이 쌓는 것보다 “의도와 기능이 서로 보이고, 반복되는 작업이 자동으로 작아지고, 고객 제품으로 갈 때 내부 소스와 런타임 데이터가 분리되는 것”에 있다.

따라서 다음 우선순위는 다음이 자연스럽다.

1. Intent Feature Map UI: 지금 이 문서를 Workspace Monitor/desktop surface에 연결한다.
2. Persistent Workspace Chooser: 고객 설치형 제품의 첫 관문을 runtime-enforced로 만든다.
3. Capability Candidate Inbox: 철학/반복/병목에서 나온 후보를 사람이 선택할 수 있게 한다.
4. CLI Adapter Setup Wizard: optional CLI missing을 제품 UX로 흡수한다.
5. Data Quality Dashboard: 고품질 데이터 축적을 측정 가능한 제품 기능으로 만든다.

## 출처와 한계

- 이 정리는 `_history/user-requests`, `_history/work-summaries`, 주요 registry/spec를 기반으로 한 synthesis다.
- 모든 파일을 열람하지 않았다. large-scope 원칙에 따라 request summaries, work summaries, registry/spec 대표 샘플을 사용했다.
- 외부 자료는 기능 정리 방식의 참고로만 사용했다. Atlassian 자료는 user feedback을 backlog/roadmap에 연결하고, roadmap을 Now/Next/Later로 볼 수 있다는 점을 참고했다.
- public release readiness 같은 사실 주장은 repository의 service readiness 기록과 validation output을 기준으로 했다.
