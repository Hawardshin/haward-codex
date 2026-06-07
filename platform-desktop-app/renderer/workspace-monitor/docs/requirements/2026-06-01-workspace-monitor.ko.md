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
| REQ-WM-011 | 웹 UI는 `agent-platform/configs/access/view-mode-registry.json`을 읽어 `user`, `developer`, `superadmin_developer` 보기 모드를 선택할 수 있어야 하며, 현재 기본값은 사용자 보기여야 한다. | must | snapshot의 `viewModeCatalog`, 상단 view mode selector, `check-view-modes` 확인 |
| REQ-WM-012 | 웹 UI는 developer와 superadmin 개발 보기에서 주요 프로젝트와 도구의 소스 코드를 읽기 전용으로 탐색할 수 있어야 한다. | must | snapshot의 `sourceFiles`, Source 탭, `pnpm run build` 확인 |
| REQ-WM-013 | 웹 UI는 에이전트들이 어떤 작업 lane에서 움직이고 어떤 task/project와 연결되어 있는지 협업 작업판과 흐름도로 보여줘야 한다. | must | snapshot의 `collaborationBoard`, Agents UI 협업 lane/flow, `pnpm run build` 확인 |
| REQ-WM-014 | 웹 UI는 운영 대시보드의 밀도와 신뢰를 유지하면서 은근히 귀엽고 조용히 기분 좋은 visual tone을 허용해야 한다. | should | UI tone policy, `globals.css`, `pnpm run build` 확인 |
| REQ-WM-015 | 웹 UI는 `agent-platform/configs/access/language-mode-registry.json`을 읽어 전체, 한국어만, 영어만 문서 보기 모드를 선택할 수 있어야 하며 문서/히스토리/요약 카운트에 동일한 언어 렌즈를 적용해야 한다. | must | snapshot의 `languageModeCatalog`, 언어 selector, `pnpm run collect`, `pnpm test`, `pnpm run check`, `pnpm run build` 확인 |
| REQ-WM-076 | 기본 사용자 보기는 작업 요청 입력, 자동 실행 시작, 실행 상태, 결과 확인만 전면에 두고 커스텀 에이전트/툴/소스/운영 기능은 developer 또는 superadmin 보기로 숨겨야 한다. | must | `user` view mode allowed sections, 홈 `data-simple-user-start`, 좌측 레일, `pnpm test`, `pnpm run check`, `pnpm run build` 확인 |
| REQ-WM-077 | 터미널 탭은 고급 설정과 원시 세션 목록을 먼저 보여주는 화면이 아니라, 런타임/어댑터/실제 셸/작업 폴더 준비 상태, 바로 작업 시작, 실제 셸 열기, CLI 연결 점검, 설정 복구 액션을 한 화면에서 제공하는 실행 허브여야 한다. 고급 프롬프트/작업 폴더 세부 조정은 접힌 영역에 둔다. | must | `data-terminal-readiness`, `data-terminal-start-command-center`, `data-terminal-primary-action`, `terminal-advanced-start`, `pnpm test`, `pnpm run check`, `pnpm run build` 확인 |
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
| REQ-WM-030 | 데스크톱 제품 UI의 반복 액션 버튼, 세그먼트, 툴바, Source/Explorer 컨트롤은 일관된 클릭 타깃 크기를 사용해야 하며, 터치/모바일 환경에서는 더 큰 타깃으로 올라가야 한다. | must | `globals.css` button token audit, `pnpm run check`, `pnpm test`, `pnpm exec next build`, localhost visual smoke 확인 |
| REQ-WM-031 | 데스크톱 제품 UI는 전체 화면에서만 동작하는 고정 높이/압축형 배치를 피하고, 핵심 작업을 먼저 보여준 뒤 보조 정보는 접힘/세로 흐름으로 노출해야 한다. | must | `pnpm run check`, `pnpm test`, `pnpm exec next build`, responsive Browser smoke, body/viewport horizontal overflow 확인 |
| REQ-WM-032 | 데스크톱 제품 UI의 보이는 기능, 패널, 버튼, workflow step은 한 가지 목적만 명확히 수행해야 하며, 상태/설정/이동/실행/근거 보기를 한 컨트롤이나 패널에 섞지 않아야 한다. | must | Overview home single-purpose control audit, disclosure count/label Browser smoke, `pnpm run check`, `pnpm test`, `pnpm exec next build` 확인 |
| REQ-WM-033 | 데스크톱 제품 UI는 한 탭에 여러 기능 패널을 얕게 넣지 않아야 하며, 탭이 여러 기능을 담기 시작하면 기본 탭은 선택 메뉴로 낮추고 각 기능은 더 깊은 단일 기능 화면으로 열어야 한다. | must | Overview drill-down smoke, 기본 홈 panel count 확인, drill-down back interaction, `pnpm run check`, `pnpm test`, `pnpm exec next build` 확인 |
| REQ-WM-034 | 데스크톱 제품 UI의 주요 섹션은 전체 화면이 아닌 900px, 720px, 540px, 390px 창에서도 루트 수평 overflow 없이 reflow되어야 하며, 핵심 navigation과 반복 컨트롤은 44px 이상 클릭 타깃을 유지해야 한다. | must | 정적 export Playwright audit 5개 섹션 x 5개 viewport, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run build:customer`, `platform-desktop-app check` 확인 |
| REQ-WM-035 | 데스크톱 제품 UI의 텍스트는 실제 번들에 포함된 self-hosted `Pretendard Variable`/`Pretendard` 우선 한/영 혼합 sans fallback stack과 역할 기반 typography scale을 따라야 하며, 작은 보조 텍스트는 명시적 small token으로 작게 유지하되 브라우저 기본 축소나 컴포넌트별 임의 `font-size`로 화면마다 크기가 들쭉날쭉해지면 안 된다. | must | bundled Pretendard import/package audit, `globals.css` font family/font-size token audit, in-app Browser computed font-family smoke, 정적 export Playwright typography audit 5개 섹션 x 5개 viewport, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `platform-desktop-app check` 확인 |
| REQ-WM-036 | 데스크톱 제품 UI의 어두운 배경, dark theme, dark rail, primary action, active tab, code/source/terminal surface 위의 텍스트는 회색 반투명 대신 명시적 흰색 foreground token을 사용해야 한다. | must | `globals.css` dark foreground token audit, in-app Browser dark foreground smoke, 정적 export Playwright dark surface audit, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `platform-desktop-app check` 확인 |
| REQ-WM-037 | 데스크톱 제품 UI의 주요 섹션은 한 페이지에 진단, 기록, 인벤토리, 생성기, 실행 보조 패널을 동시에 펼쳐 사용자를 압박하지 않아야 하며, 초기 화면은 주 작업 하나와 제한된 보조 요약만 보여주고 나머지는 명명된 세부 disclosure 아래에 둬야 한다. | must | Agents/Desktop 초기 visible panel count audit, disclosure closed-by-default audit, disclosure open interaction, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, 정적 export Playwright audit 확인 |
| REQ-WM-038 | 에이전트 코어 채팅 UI는 ChatGPT/Claude/Gemini처럼 중앙 대화 로그와 하단 composer를 주 작업면으로 삼고, provider/model 선택은 compact 보조 컨트롤로 낮추며, 작업 컨텍스트와 계약 정보는 대화 입력을 밀어내지 않는 drawer/요약 영역으로 분리해야 한다. Agents 화면에서는 공통 상태 strip, 문서 필터, 지표, 계약 카드가 기본 채팅 화면을 밀어내면 안 되며, 390px 모바일 첫 화면에서도 composer가 보여야 한다. | must | Agents 정적 export Browser chat audit, 390px composer first-viewport fit audit, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `platform-desktop-app check` 확인 |
| REQ-WM-039 | 주요 탭 간 이동은 닫힌 보조 기능군까지 마운트하느라 느려지면 안 되며, Agents/Desktop Runtime의 section-level disclosure 내부 무거운 패널은 사용자가 열 때까지 React 트리에 붙지 않아야 한다. | must | CPU throttle 6 정적 export tab switch audit, 닫힌 disclosure DOM mount audit, disclosure open interaction, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget`, `platform-desktop-app check` 확인 |
| REQ-WM-040 | 터미널/CLI 실행 UI는 일반 카드형 패널이 아니라 오픈소스 개발 도구에 익숙한 terminal chrome, tab strip, dark emulator surface, monospace output, prompt input, status/cwd bar를 기본 구조로 사용해야 하며, 전역 터미널 버튼은 어느 화면에서 눌러도 실제 터미널이 마운트된 화면으로 이동해 열려야 한다. | must | xterm.js/VS Code/GNOME Terminal reference 기록, in-app Browser 터미널 버튼 smoke, 1280/900/390px 정적 export terminal overflow audit, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget`, `platform-desktop-app check` 확인 |
| REQ-WM-041 | 버튼 클릭은 heavy workbench mount, native refresh, source filtering, evidence assembly 같은 보조 작업 때문에 첫 응답 paint를 막으면 안 되며, 주요 섹션의 대표 버튼 표본은 CPU throttle 6 정적 export audit에서 long task 없이 p95 60ms 이하를 유지해야 한다. | must | 67개 버튼 표본 click-to-paint audit, staged Desktop/Source shell settled smoke, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget`, `platform-desktop-app check` 확인 |
| REQ-WM-042 | Tool Studio는 툴 제작, 툴 배포, Python 실행환경, 가상 환경, 툴 전용 registry를 Source/Agents와 분리된 독립 작업면으로 제공해야 하며, 드롭다운/우클릭/단축키는 접근성 있는 오픈소스 UI primitive를 사용하고 3D 에이전트 협업 장면은 해당 화면에서만 lazy mount되어야 한다. | must | Tool Studio section smoke, Radix dropdown/context menu interaction, keyboard shortcut audit, Three.js lazy import/cleanup test, canvas nonblank pixel smoke, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget`, `platform-desktop-app check` 확인 |
| REQ-WM-043 | Overview와 command palette는 섹션 이름을 외운 사용자만 빠르게 이동할 수 있는 구조가 아니라, "에이전트 만들기", "툴 만들기", "작업 실행", "파일/소스 열기", "막힌 결정 처리", "설정 점검" 같은 목표 기반 진입점을 먼저 보여줘야 한다. | must | task-intent route static test, command palette goal item test, responsive home visual smoke, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-044 | Overview 첫 화면은 보조 운영 strip, 문서 필터, 상태 숫자보다 사용자가 즉시 실행할 목표 선택 카드를 먼저 보여야 하며, 현재 작업량 지표는 목표 선택 이후의 보조 상태로 낮춰야 한다. | must | Overview render order static test, operator/filter absence smoke, desktop/mobile first intent position smoke, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-045 | 사용자가 Overview 목표 카드를 선택해 다른 작업면으로 이동하면, 대상 화면은 선택한 목표, 다음 행동, 목표 변경/숨기기 제어를 포함한 handoff 피드백을 즉시 보여줘야 한다. | must | task handoff static test, click-through Playwright smoke, desktop/mobile handoff screenshot, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-046 | 목표 기반 이동으로 대상 작업면에 도착한 화면은 단일 next step만이 아니라 3개 이하의 짧은 순서형 작업 흐름을 표시해 사용자가 현재 화면에서 어떤 순서로 진행할지 즉시 이해할 수 있어야 하며, 모바일에서는 흐름 단계가 한 열로 쌓여 수평 overflow를 만들면 안 된다. | must | task flow rail static test, desktop/mobile click-through Playwright smoke, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-047 | 목표 기반 작업 흐름의 단계는 정적인 설명에 머물면 안 되며, 가능한 경우 클릭 가능한 primary flow action으로 실제 대상 작업면의 핵심 mode를 전환해야 한다. `툴 만들기` 흐름의 `소스 선택`, `입력과 venv 확인`, `검증 후 배포`는 각각 Tool Studio의 build, environment, deploy mode를 열어야 한다. | must | task flow action static test, desktop/mobile click-through mode smoke, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-048 | AgentCore Quick Builder는 하나의 블루프린트만 선택하는 구조에 머물지 않고 Runtime, Memory, Gateway, Browser, Code Interpreter, Identity, Policy, Observability, Evaluations 같은 capability를 여러 개 동시에 선택해 agent proposal 입력, guardrail, output contract에 반영할 수 있어야 한다. | must | multi-capability bundle static test, desktop/mobile bundle smoke, proposal form fill assertion, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-049 | AgentCore Quick Builder는 선택된 capability 묶음을 Runtime, Memory, Gateway, Built-in Tools, Identity, Policy, Observability, Evaluations 같은 AgentCore식 리소스 토폴로지와 Create, Configure, Invoke, Observe, Evaluate 생명주기로 표시해 사용자가 플랫폼 구조를 즉시 이해할 수 있어야 하며, 모바일에서도 수평 overflow 없이 접혀야 한다. | must | AgentCore resource topology static test, desktop/mobile topology smoke, resource card count and overflow assertion, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-050 | Tool Studio의 `툴 만들기` 화면은 등록 툴 목록이나 환경 상태에 묻히지 않고, 새 툴 제작에 필요한 template 선택, manifest, source path, input schema, 실행 검증 명령, 패키지 점검 명령, 출력 계약, 소스/콘솔/배포/명세 복사 액션을 하나의 전용 제작 작업대로 제공해야 하며 860px 이하에서도 한 열로 접혀야 한다. | must | tool builder workbench static test, desktop/mobile builder smoke, action marker and overflow assertion, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-051 | Tool Studio의 `툴 배포` 화면은 local registry, AgentCore Gateway, desktop bundle 같은 배포 target 선택, release target, artifact, 배포 명령, preflight checklist, 권한/관측, rollback, 사전점검/패키지/registry/계획 복사 액션을 하나의 전용 배포 작업대로 제공해야 하며 860px 이하에서도 한 열로 접혀야 한다. | must | tool deploy workbench static test, desktop/mobile deploy smoke, action marker and overflow assertion, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-052 | Tool Studio의 `파이썬 환경` 화면은 local venv, isolated runner, agent sandbox 실행환경 프로필을 선택하게 하고 interpreter, venv path, dependency file, lock/report, 설치 명령, 실행 명령, 격리 경계, cache 정책, health check, venv 생성/의존성 설치/smoke/환경 계획 복사 액션을 하나의 전용 실행환경 작업대로 제공해야 하며 860px 이하에서도 한 열로 접혀야 한다. | must | tool environment workbench static test, desktop/mobile environment smoke, action marker and overflow assertion, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-053 | Tool Studio의 `파이썬 환경` 화면 안에서 가상환경 관리는 별도 관리 패널로 분리되어야 하며, create/activate/install/freeze/rebuild lifecycle step, 선택 step command, evidence, terminal/copy-command/copy-workflow 액션을 제공하고 860px 이하에서도 단계와 액션이 한 열로 접혀야 한다. | must | virtual environment manager static test, desktop/mobile venv manager smoke, action marker and overflow assertion, screenshot artifact, `pnpm run check`, `pnpm test`, `pnpm run build:customer` 확인 |
| REQ-WM-054 | 탭 간 이동은 어떤 화면으로 전환해도 heavy body mount 때문에 active 탭, 제목, 전환 피드백의 첫 paint가 막히면 안 된다. 섹션 body는 첫 paint 이후 staged mount로 붙어야 하며, Source 검색처럼 대량 데이터를 훑는 작업은 해당 섹션 body가 준비된 뒤에만 실행해야 한다. | must | `readySection` staged mount static test, CPU throttle 6 tab active-response audit, section transition shell smoke, Source query gate audit, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-055 | 모든 버튼/버튼형 컨트롤은 React click handler, workbench mount, native 호출, clipboard, modal open, section 이동 같은 실제 작업이 시작되기 전에 capture-phase 즉시 눌림 피드백을 표시해야 한다. 대표 67개 버튼 press sample과 실제 nav click sample은 CPU throttle 6 정적 export audit에서 feedback p95 60ms 이하를 유지해야 한다. | must | instant button feedback static test, `perf:buttons` CPU throttle 6 audit, in-app Browser button smoke, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-056 | Tool Studio의 `툴 만들기` 화면은 Python tool source 관리를 별도 하위 작업대로 제공해야 하며, template별 package name, module name, `src/` 편집 대상, `pyproject.toml`, console entry point, smoke test path, init/run/package command, checklist, 소스 계획 복사 액션을 한 곳에서 보여줘야 한다. | must | python source manager static test, copy payload marker audit, desktop/mobile source manager smoke, overflow assertion, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-057 | Overview 첫 화면은 동등한 카드 목록이 아니라 하나의 추천 작업, 다음 단계 preview, primary action을 먼저 보여주는 Focus Command Surface여야 하며, 다른 목표와 운영 상태는 별도 dock/strip으로 낮춰야 한다. | must | focus command static test, desktop/mobile Browser smoke, target order assertion, overflow assertion, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-058 | 데스크톱 제품 UI는 앱 셸, 상단바, 레일, Overview 주 작업면에서 일관된 색상/타이포그래피/그림자/버튼 상태 토큰을 사용해야 하며, 화면에 디자인 원칙 설명 문구를 노출하지 않고 실제 작업 목표와 다음 행동을 중심으로 시각 위계를 만들어야 한다. | must | shell visual token static test, meta-copy absence test, desktop/mobile Browser smoke, overflow assertion, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-059 | Overview 작업 dock의 목표 버튼은 산업 디자인 관점의 조작 affordance를 가져야 하며, 번호, 기능 아이콘, 작업 설명, 상태 badge, 진행 화살표를 분리해 손이 갈 위치와 실행 결과가 즉시 보이고 모바일에서는 핵심 조작부만 남아 깨지지 않아야 한다. | must | task intent affordance static test, desktop/mobile Browser smoke, action cue count, primary target size, overflow assertion, `pnpm run check`, `pnpm test`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-060 | Agents 세부 Collaboration 작업면은 에이전트 협업을 3D 캐릭터, 작업 lane, 연결선으로 시각화해야 하며 `@react-three/fiber`와 `@react-three/drei`를 클라이언트 lazy mount로 사용해 기본 채팅 화면, 탭 전환, 닫힌 disclosure 성능을 방해하지 않아야 한다. 390px 모바일에서도 수평 overflow 없이 nonblank canvas로 렌더링되어야 한다. | must | React Three Fiber/Drei exact dependency audit, lazy import static test, desktop/mobile canvas nonblank pixel smoke, in-app Browser visual smoke, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-061 | Agents 세부 기능 disclosure는 블루프린트, 생성기, 학습, 협업, 흐름, 인벤토리, 런타임을 한 화면에 모두 쌓지 않아야 하며, 세부 기능 선택기를 통해 한 번에 하나의 active workspace만 렌더링해야 한다. 기본 세부 화면은 Collaboration으로 시작하고, 다른 기능을 선택하면 3D canvas와 이전 기능 DOM은 사라져야 한다. | must | one-active-workspace static test, in-app Browser switcher smoke, mobile 390px selected-tab/overflow smoke, builder 전환 시 canvas absence assertion, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run perf:budget` 확인 |
| REQ-WM-062 | Agents 세부 기능 선택은 클릭 즉시 선택 버튼과 pressed feedback을 갱신해야 하며, 3D canvas/폼/표 같은 active workspace 교체는 첫 paint 이후 staged commit으로 처리해 버튼 응답을 무거운 패널 mount와 묶지 않아야 한다. 빠르게 여러 세부 기능을 눌러도 최신 선택만 렌더링되어야 하며, 닫힌 disclosure나 다른 섹션에서는 예약된 mount가 취소되어야 한다. | must | deferred agent detail switch static test, in-app Browser switcher smoke, stale canvas absence assertion, pending state audit, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-063 | 기본 activity rail은 사용자가 아이콘 의미를 기억해야 하는 구조가 아니라, 축약 라벨과 아이콘을 함께 보여줘 주요 목적지를 인식으로 선택할 수 있게 해야 한다. 데스크톱 기본 폭, 확장 폭, 720px 이하 상단 rail, 420px 이하 가로 스크롤 rail 모두에서 라벨은 잘리지 않고 버튼 클릭 타깃은 44px 이상을 유지해야 한다. | must | activity rail readable labels static test, desktop/mobile Browser rail smoke, active label/current state assertion, horizontal overflow assertion, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-064 | Tool Studio는 제작/실행환경/배포/registry 세부 기능을 같은 깊이의 탭처럼 모두 펼쳐 놓지 않아야 하며, 먼저 `제작 준비`와 `출시 관리` 같은 상위 흐름을 선택한 뒤 해당 흐름의 세부 모드만 보여줘야 한다. 단축키나 외부 task flow가 세부 모드로 직접 진입해도 parent flow 선택 상태가 함께 맞춰져야 한다. | must | Tool Studio parent-stage depth static test, requested mode parent sync test, desktop/mobile Browser depth rail smoke, current child mode count assertion, overflow assertion, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-065 | Tool Studio의 기본 드롭다운 버튼은 현재 선택된 세부 기능, 상위 흐름, 메뉴 affordance, 열림 상태를 한 컨트롤 안에서 명확히 보여줘야 하며 `aria-haspopup="menu"`, Radix open state, 44px 이상 타깃, 텍스트 ellipsis, 860px 이하 overflow 없는 폭 조정을 유지해야 한다. | must | dropdown trigger static test, Radix `aria-expanded`/`data-state` Browser smoke, desktop/mobile overflow assertion, `pnpm run check`, `pnpm test`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-066 | 데스크톱 제품 UI의 기본 버튼은 임의 CSS 조합이 아니라 라이브러리 기반 공통 Button primitive를 통해 variant, size, icon-only, `asChild`, loading/disabled 상태를 통일해야 하며, titlebar/작업 handoff/Tool Studio 같은 대표 기본 액션은 이 Button을 사용해야 한다. | must | Radix Slot/CVA dependency audit, Button component static test, 대표 액션 import/use test, desktop/mobile Browser smoke, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-067 | 데스크톱 제품 UI의 반복 액션 묶음은 화면마다 임의 flex/div 구조를 새로 만들지 않고 공통 ActionGroup primitive로 정렬, 간격, wrap, role, density를 통일해야 하며 titlebar, task handoff, command palette, Tool Studio 대표 액션 묶음은 이 구조를 사용해야 한다. | must | ActionGroup static test, representative action group Browser smoke, desktop/mobile overflow assertion, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-068 | Tool Studio의 depth와 상세 기능은 한 화면에 모두 펼치지 않고 IntelliJ식 action access로 접근해야 한다. 사용자는 primary dropdown, `Alt+Enter` 빠른 액션 메뉴, 상위 흐름/세부 기능 우클릭 context menu, `Alt+1/2`, `Alt+←/→`, 기존 mode 단축키로 같은 기능에 도달할 수 있어야 하며 좌클릭은 직접 선택, 우클릭은 해당 위치의 context action을 열어야 한다. | must | Tool Studio action access static test, Radix dropdown/context menu Browser smoke, keyboard shortcut smoke, desktop/mobile overflow assertion, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-069 | 데스크톱 제품 UI의 문장형 텍스트, 버튼/컨트롤 라벨, 경로/명령/코드 같은 긴 토큰은 같은 줄바꿈 계약을 따라야 한다. 한글/한영 혼합 문장은 글자 단위로 어색하게 깨지지 않도록 `word-break: keep-all`과 자연 줄바꿈을 사용하고, 경로/명령/코드 토큰은 화면을 밀어내지 않도록 `overflow-wrap: anywhere` 계열을 사용해야 하며, 버튼 내부 라벨은 부모 폭을 넘지 않아야 한다. | must | text wrapping static test, desktop/mobile Browser smoke, long-token overflow audit, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-070 | 데스크톱 제품 UI는 전체 페이지, activity rail, 설정, 터미널, 소스 탐색, Tool Studio 목록/상세/환경처럼 서로 다른 작업 범위의 스크롤을 분리해야 한다. 각 스크롤 범위는 `overscroll-behavior`, 안정적인 gutter, 절제된 scrollbar 색상 토큰, 필요한 페인트 containment를 가져야 하며, 화면 밖 3D/애니메이션 작업은 상호작용 속도를 방해하지 않도록 정지해야 한다. | must | scoped scroll static test, scroll color token test, Tool Studio 3D pause test, desktop/mobile Browser scroll smoke, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-071 | Tool Studio 소스는 하나의 거대 컴포넌트 안에 타입, 정적 카탈로그 데이터, UI 렌더링, 3D effect를 모두 섞어두지 않아야 한다. 최소한 public 타입과 정적 Tool Studio catalog는 별도 모듈로 분리하고, 기존 `ToolStudioPanel` export와 mode request 계약은 호환되게 유지해야 한다. | must | Tool Studio module separation static test, type re-export test, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-072 | 에이전트 협업 캐릭터는 단순 원통/구 조합이 아니라 역할과 상태를 읽을 수 있는 일관된 로봇형 실루엣을 가져야 한다. Agents 협업 장면과 Tool Studio 캐릭터 맵은 visor, chest/status detail, role halo 같은 공통 디자인 언어를 공유하되, 애니메이션은 산만하지 않고 기존 reduce-motion/offscreen pause 계약을 유지해야 한다. | must | character design static test, desktop/mobile Browser canvas smoke, nonblank screenshot QA, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-073 | 에이전트 협업 캐릭터는 너무 현실적이거나 딱딱한 장비처럼 보이면 안 되며, 동물형 마스코트처럼 귀엽고 추상적인 실루엣을 가져야 한다. 귀, 볼, 작은 muzzle, 꼬리 같은 soft detail은 추가할 수 있지만 털/해부학/과한 표정 연출은 피하고, 상태/역할 정보와 성능 계약은 유지해야 한다. | must | cute mascot character static test, desktop/mobile Browser canvas smoke, nonblank screenshot QA, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run perf:budget` 확인 |
| REQ-WM-074 | 에이전트 협업 캐릭터는 작은 크기에서도 사용자가 어떤 에이전트인지 쉽게 알 수 있도록 agent code, compact name label, mode legend를 제공해야 하며, label은 3D 장면과 Tool Studio 캐릭터 맵에서 화면을 가리거나 overflow를 만들면 안 된다. | must | agent identity label static test, desktop/mobile Playwright label smoke, nonblank canvas QA, `pnpm test`, `tsc --noEmit`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |
| REQ-WM-075 | 데스크톱 제품 UI는 Apple Human Interface Guidelines의 hierarchy, harmony, consistency 방향을 참고해 앱 셸, rail, titlebar, 반복 panel, dark 3D/terminal surface, primary control에 절제된 neutral material, 선명한 foreground, 통일된 border/shadow/control token을 적용해야 하며 JS 초기 비용이나 모바일 overflow를 늘리면 안 된다. | must | premium visual token static review, desktop/mobile Playwright screenshot smoke, canvas nonblank QA, `pnpm test`, `pnpm run check`, `pnpm run build`, `pnpm run build:customer`, `pnpm run perf:budget` 확인 |

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
- 반복 액션 버튼과 Source/Explorer/toolbar 컨트롤의 클릭 타깃 크기 체계
- 전체 화면 의존 고정 높이 shell 제거, 홈 보조 정보 progressive disclosure, responsive reflow
- 홈 핵심 기능 탭의 단일 CTA, 단일 목적 action 버튼, 한 disclosure panel당 한 정보 역할
- 홈 탭의 다기능 패널 제거, drill-down 선택 메뉴, 단일 기능 child view
- 주요 desktop/source/agent/intent 섹션의 비전체화면 reflow와 작은 창 navigation
- 역할 기반 typography scale과 브라우저 기본 small text 축소 방지
- 어두운 surface 위 흰색 foreground token
- 에이전트 코어 채팅의 중앙 대화 로그, 하단 composer, compact provider/model selector, 접힌 context drawer, Agents 전용 primary work surface
- 탭 이동 시 닫힌 보조 패널 lazy mount와 전환 지연 audit
- 오픈소스 개발 도구형 터미널 chrome, 탭 strip, emulator output, prompt input, 전역 터미널 버튼 라우팅
- 버튼 클릭 첫 paint와 heavy workbench/native refresh/evidence 계산 분리
- Tool Studio의 툴 제작/배포/Python venv/registry 전용 작업면, Radix 메뉴, Three.js lazy 3D 협업 장면
- Overview와 command palette의 목표 기반 task-intent route
- Overview의 task-first visual hierarchy와 보조 상태 요약
- 목표 선택 후 대상 작업면의 task handoff feedback
- 목표 선택 후 대상 작업면의 3단계 이하 task flow rail
- 목표 작업 흐름 단계와 Tool Studio 핵심 mode 연결
- AgentCore Quick Builder의 multi-capability bundle 선택과 proposal form 반영
- Tool Studio `파이썬 환경` 전용 실행환경 작업대
- Tool Studio `파이썬 환경` 내부 가상환경 lifecycle 관리 패널
- Tool Studio `툴 만들기` 내부 Python source/package/pyproject 관리 작업대
- Overview 첫 화면의 Focus Command Surface와 보조 작업 dock
- 앱 셸/상단바/레일/Overview 주 작업면에 적용되는 시각 디자인 토큰과 실제 작업 중심 카피
- Overview 작업 dock 목표 버튼의 번호/아이콘/status/action cue affordance
- Agents 세부 Collaboration 작업면의 React Three Fiber/Drei 기반 3D 에이전트 캐릭터 협업 장면
- Agents 세부 기능 선택기와 한 번에 하나만 렌더링되는 active workspace 구조
- Agents 세부 기능 선택 버튼의 즉시 피드백과 첫 paint 이후 active workspace staged commit
- 기본 activity rail의 아이콘+축약 라벨 목적지 버튼과 모바일 가로 스크롤 라벨 유지
- Tool Studio의 상위 흐름 선택 후 세부 모드로 들어가는 parent-child depth navigation
- Tool Studio 드롭다운 버튼의 현재 선택값, 상위 흐름, 메뉴 상태, 모바일 안전 폭
- Radix Slot/CVA 기반 공통 Button primitive와 대표 기본 액션 버튼 migration
- 공통 ActionGroup primitive 기반 반복 액션 묶음 정렬, 간격, wrap, role, density 통일
- Tool Studio 상세 기능의 primary dropdown, 빠른 액션 메뉴, 우클릭 context menu, 키보드 단축키 접근
- 문장형 텍스트, 버튼/컨트롤 라벨, 긴 경로/명령/코드 토큰의 공통 줄바꿈 계약
- 전체 페이지, rail, 설정, 터미널, 소스 탐색, Tool Studio 내부 영역의 범위별 스크롤과 절제된 scrollbar 색상/성능 계약
- Tool Studio public 타입과 정적 catalog data의 별도 모듈화, 기존 export 호환성 유지
- Agents 협업 장면과 Tool Studio 캐릭터 맵의 공통 로봇형 캐릭터 디자인 언어
- Agents 협업 장면과 Tool Studio 캐릭터 맵에서 작은 크기로도 역할을 읽을 수 있는 identity label/legend
- Apple HIG 참고 기준의 hierarchy, harmony, consistency를 반영한 neutral material, dark foreground, 반복 surface/control token
- Vercel 배포 문서

## 제외 범위

- 인증, 로그인, 실시간 서버 monitoring
- client-side view mode를 보안 경계로 취급하는 것
- client-side language mode를 snapshot redaction 또는 보안 경계로 취급하는 것
- Tauri 데스크톱 런타임과 scoped backup gate 없이 순수 브라우저에서 소스 코드를 편집하거나 저장하는 것
- GitHub API 연동
- 원격 DB 저장
- private secret 또는 원본 대화 전문 공개
