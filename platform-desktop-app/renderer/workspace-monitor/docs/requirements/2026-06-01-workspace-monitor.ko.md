# 요구사항: Workspace Monitor

## 상태

- 상태: `baseline`
- 기준일: 2026-06-01
- 소유 프로젝트: `platform-desktop-app/renderer/workspace-monitor/`
- 출처 요청: `UR-2026-06-01-008`

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-WM-001 | Vercel에 배포 가능한 Next.js 프로젝트여야 한다. | must | `pnpm run build` 통과, `README.md`에 Vercel 설정 기록 |
| REQ-WM-002 | 저장소의 히스토리, 작업 요약, 요청 추적, 프로젝트, 에이전트/작업 상태, 요구사항, 스펙, 평가 문서를 한 화면에서 탐색할 수 있어야 한다. | must | 생성된 snapshot과 UI 섹션 확인 |
| REQ-WM-003 | Markdown 문서를 읽기 편한 HTML preview로 보여줄 수 있어야 한다. | must | snapshot 문서에 escaped HTML preview 포함 |
| REQ-WM-004 | 현재 private repository에서도 로컬로 쓸 수 있고, 나중에 public 전환 후 Vercel에 올릴 수 있어야 한다. | must | 정적 snapshot 기반 build, 배포 문서 확인 |
| REQ-WM-005 | 확장 가능한 구조여야 하며 문서 파싱, UI 컴포넌트, 데이터 모델, 배포 설정이 분리되어야 한다. | should | 폴더 구조와 타입 분리 검토 |
| REQ-WM-006 | public 배포 전 민감 정보가 snapshot에 들어가는지 검토할 수 있어야 한다. | must | README와 deployment docs에 공개 전 점검 절차 기록 |
| REQ-WM-007 | `_history/`의 작업 요약, 요청 요약, 요청 추적, 웹 검색, 계획, 평가, 일일 기록을 날짜별로 모아 웹 UI에서 날짜와 유형으로 탐색할 수 있어야 한다. | must | snapshot의 `historyDays`와 History UI 날짜 filter 확인 |
| REQ-WM-008 | 웹 UI는 루트 폴더 구조, `_docs` 카테고리, 프로젝트별 top-level home, 히스토리 수집 위치를 보여줘 폴더 경계와 데이터 출처를 이해할 수 있어야 한다. | should | snapshot의 `folderStructure`와 Structure UI 확인 |
| REQ-WM-009 | 웹 UI는 `agent-platform/configs/agents/`의 에이전트 정의와 coordination runtime 상태를 합쳐 어떤 에이전트가 있는지 시각적으로 보여줘야 한다. | must | snapshot의 `agentCatalog`와 Agents UI 구성 맵 확인 |
| REQ-WM-010 | 웹 UI는 `_history/` 문서의 날짜별 밀도와 유형별 분포를 시각화해야 한다. | must | History UI의 밀도 차트와 유형 막대 확인 |
| REQ-WM-011 | 웹 UI는 `agent-platform/configs/access/view-mode-registry.json`을 읽어 `user`, `developer`, `superadmin_developer` 보기 모드를 선택할 수 있어야 하며, 현재 기본값은 슈퍼어드민 개발 보기여야 한다. | must | snapshot의 `viewModeCatalog`, 상단 view mode selector, `check-view-modes` 확인 |
| REQ-WM-012 | 웹 UI는 developer와 superadmin 개발 보기에서 주요 프로젝트와 도구의 소스 코드를 읽기 전용으로 탐색할 수 있어야 한다. | must | snapshot의 `sourceFiles`, Source 탭, `pnpm run build` 확인 |
| REQ-WM-013 | 웹 UI는 에이전트들이 어떤 작업 lane에서 움직이고 어떤 task/project와 연결되어 있는지 협업 작업판과 흐름도로 보여줘야 한다. | must | snapshot의 `collaborationBoard`, Agents UI 협업 lane/flow, `pnpm run build` 확인 |
| REQ-WM-014 | 웹 UI는 운영 대시보드의 밀도와 신뢰를 유지하면서 은근히 귀엽고 조용히 기분 좋은 visual tone을 허용해야 한다. | should | UI tone policy, `globals.css`, `pnpm run build` 확인 |
| REQ-WM-015 | 웹 UI는 `agent-platform/configs/access/language-mode-registry.json`을 읽어 전체, 한국어만, 영어만 문서 보기 모드를 선택할 수 있어야 하며 문서/히스토리/요약 카운트에 동일한 언어 렌즈를 적용해야 한다. | must | snapshot의 `languageModeCatalog`, 언어 selector, `pnpm run collect`, `pnpm test`, `pnpm run check`, `pnpm run build` 확인 |
| REQ-WM-016 | 웹 UI는 대용량 workspace snapshot을 client JavaScript bundle에 직접 포함하지 않아야 하며, 초기 JS chunk 크기가 성능 예산을 초과하지 않도록 회귀 검사를 제공해야 한다. | must | `pnpm run build`, `pnpm run perf:budget`, 정적 Playwright smoke 확인 |
| REQ-WM-017 | 정적 export는 HTTP root뿐 아니라 데스크톱 shell, file/subpath 유사 context, repository 서브패스 정적 serving에서도 `_next` asset과 `workspace-snapshot.json`을 상대 경로로 읽어 주요 대시보드를 렌더링해야 한다. | must | `pnpm run build`, `pnpm run perf:budget`, repository-root 정적 서버의 `/workspace-monitor/out/index.html` Playwright smoke 확인 |
| REQ-WM-018 | 웹 UI는 분리된 히스토리 기록, 평가, 웹 검색, 작업 시간, 요청 추적, 협업 task/blocker/next action을 `unifiedOps` 이벤트 stream으로 합쳐 한 화면에서 탐색할 수 있어야 한다. | must | snapshot의 `unifiedOps`, Overview/History `Unified Ops` UI, `pnpm run collect`, `pnpm test`, `pnpm run check`, `pnpm run build`, `pnpm run perf:budget` 확인 |
| REQ-WM-019 | 웹 UI는 view/work/install/language/desktop session/task pipe/CLI adapter/monitor section 모드와 기능을 한 곳에서 명시적으로 보여주고, 각 항목을 어디에서 선택하거나 열 수 있는지 안내해야 한다. | must | snapshot의 `modeFunctionCatalog`, Overview `Mode & Function Switchboard`, desktop readiness test, `pnpm run collect`, `pnpm test`, `pnpm run check`, `pnpm run build` 확인 |
| REQ-WM-020 | 웹 UI는 Overview 상단에서 현재 섹션의 상태, 주의 수준, 다음 행동, 근거 카운트, runtime 바로가기를 한 줄 작업면으로 제공해야 한다. | should | section tab badge와 `operator-strip` 렌더링 확인, `pnpm test`, `pnpm run check`, `pnpm run build` 확인 |
| REQ-WM-021 | 웹 UI는 히스토리의 최신 사용자 의도 기반 기능 지도를 읽어 의도 수, 기능 축, 구현된 기능, 다음 기능 후보, Now/Next/Later 로드맵, source freshness를 developer/superadmin 보기에서 탐색할 수 있어야 한다. | must | snapshot의 `intentFeatureMap`, `Intent Map` 탭, customer snapshot sanitization, `pnpm run collect`, `pnpm test`, `pnpm run check:intent-map`, `pnpm run check:intent-map:customer`, `pnpm run check`, `pnpm run build` 확인 |
| REQ-WM-022 | repository snapshot collector는 기능별 데이터 추출 로직을 명확한 모듈 경계로 분리해, 지속 리팩터링 중에도 동작 보존과 테스트 가능한 책임 경계를 유지해야 한다. | should | `intent-feature-map` collector 모듈 경계, 기존 collector export 호환성, `pnpm test`, `pnpm run collect`, `pnpm run check:intent-map`, `pnpm run check` 확인 |
| REQ-WM-023 | 웹 UI는 플랫폼의 운영 메모리, 플랫폼 코어, 데스크톱 제품, 모니터 UI, 도메인 프로젝트, 런타임/로컬 데이터 계층을 한눈에 보여주고 각 계층의 소유 경계, 주요 경로, 금지 경계, 복잡도 압력점을 표시해야 한다. | must | snapshot의 `structureOverview`, Structure 탭의 Architecture Backbone/Boundary Rules/Pressure, customer snapshot sanitization, `pnpm test`, `pnpm run check`, `pnpm run build`, `pnpm run check:intent-map:customer` 확인 |
| REQ-WM-024 | 웹 UI는 핵심 기능 위치를 첫 화면에서 바로 보여주고, 모니터 섹션 탭을 기능군별로 나눠 사용자가 현재 위치와 다음 이동 경로를 즉시 이해할 수 있어야 한다. | must | 상단 `core-feature-rail`, Overview `Core Functions`, 기능군별 `section-tab-groups`, `pnpm test`, `pnpm run check`, `pnpm run build`, desktop customer bundle 확인 |
| REQ-WM-025 | 웹 UI는 실제 앱처럼 섹션, 보기 모드, 언어 모드, 문서 필터, 주요 action을 전역 command palette와 pinned/recent quick controls로 실행할 수 있어야 한다. | should | `app-control-bar`, `command-palette`, pinned/recent controls, keyboard lifecycle cleanup, `pnpm test`, `pnpm run check`, `pnpm run build`, static export smoke 확인 |
| REQ-WM-026 | 데스크톱 제품 UI는 런타임, task pipe, service readiness, source editor 같은 운영 패널을 좁은 웹 카드처럼 찌그러뜨리지 않고 full-width workbench surface로 렌더링해야 하며, 대형 workspace snapshot을 JS fallback chunk로 포함하지 않아야 한다. | must | `pnpm run perf:budget`, customer bundle audit, Browser smoke에서 body/viewport overflow 0, runtime/source panel visual check |
| REQ-WM-027 | 데스크톱 source editor는 범용 웹 에디터가 아니라 플랫폼 작업에 맞춘 편집 워크벤치여야 하며, 요구사항/스펙/검증/Tauri command/agent config/decision item 템플릿, 경로 기반 편집 프로필, 패치 컨텍스트 복사를 제공해야 한다. | must | `source-customization-bar`, Monaco custom theme/options, template insertion, patch context copy, `pnpm run check`, `pnpm run build:customer`, Browser smoke 확인 |
| REQ-WM-028 | 데스크톱 Source Review는 runtime workspace file index refresh, open editor tab strip, Monaco command toolbar, edit/diff mode, editor settings popup을 제공해 실제 코드 편집 워크벤치로 동작해야 한다. | must | `Refresh Files`, `Open Editors`, `source-command-toolbar`, `MonacoDiffEditor`, `Editor Settings`, `pnpm run check`, `pnpm test`, Browser smoke 확인 |
| REQ-WM-029 | 데스크톱 Source Review는 Source 화면 진입 전 불필요한 runtime source catalog scan을 실행하지 않아야 하며, 파일 목록 렌더링은 중복 리스트와 전체 기본 전개 트리를 피해야 한다. | must | `pnpm run check`, `pnpm test`, `pnpm exec next build`, `pnpm run perf:budget`, localhost smoke 확인 |

## 범위

- Next.js UI
- repository snapshot 생성기
- 문서 요약, HTML preview, 프로젝트/히스토리/요구사항/평가 데이터 카드
- 날짜별 히스토리 타임라인과 폴더 구조 지도
- 에이전트 인벤토리와 히스토리 밀도/유형 시각화
- 사용자/개발자/슈퍼어드민 개발 view mode 선택 UI
- 전체/한국어만/영어만 document language mode 선택 UI
- developer/superadmin용 읽기 전용 소스 코드 뷰어
- 에이전트 협업 lane, agent-task-project 흐름도, blocker/next-action 표시
- 운영 가독성을 해치지 않는 작은 accent와 micro-interaction
- 대용량 snapshot의 public JSON fetch, MonitorShell lazy loading, JS chunk 성능 예산 검사
- 패키징/서브패스 안전성을 위한 상대 static asset 경로와 snapshot fetch
- 히스토리와 모니터링 신호를 합친 `unifiedOps` 운영 이벤트 stream
- 모드와 기능 선택 위치를 한 곳에 모으는 `modeFunctionCatalog`와 Overview switchboard
- 현재 상태, 다음 행동, evidence/runtime shortcut을 묶는 Overview 운영 작업면
- 사용자 의도 기반 기능 지도를 노출하는 `intentFeatureMap` snapshot과 `Intent Map` 섹션
- snapshot collector의 기능별 데이터 추출 모듈 경계
- 플랫폼 계층, 소유 경계, 복잡도 압력점을 보여주는 `structureOverview` snapshot과 Structure 탭
- 핵심 기능 바로가기와 기능군별 탭 정보구조
- 전역 command palette, pinned/recent quick controls
- Tauri 데스크톱 런타임에서만 활성화되는 platform source editor 템플릿, 프로필, 패치 컨텍스트 복사
- Tauri 데스크톱 런타임 파일 인덱스, open editor tabs, editor command toolbar, Monaco diff/settings surface
- Source 화면 진입 전 파일 catalog scan 지연, 중복 source list 제거, 접힌 tree 렌더링
- Vercel 배포 문서

## 제외 범위

- 인증, 로그인, 실시간 서버 monitoring
- client-side view mode를 보안 경계로 취급하는 것
- client-side language mode를 snapshot redaction 또는 보안 경계로 취급하는 것
- Tauri 데스크톱 런타임과 scoped backup gate 없이 순수 브라우저에서 소스 코드를 편집하거나 저장하는 것
- GitHub API 연동
- 원격 DB 저장
- private secret 또는 원본 대화 전문 공개
