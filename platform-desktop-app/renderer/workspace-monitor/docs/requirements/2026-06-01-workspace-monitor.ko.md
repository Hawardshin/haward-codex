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
- Vercel 배포 문서

## 제외 범위

- 인증, 로그인, 실시간 서버 monitoring
- client-side view mode를 보안 경계로 취급하는 것
- client-side language mode를 snapshot redaction 또는 보안 경계로 취급하는 것
- Tauri 데스크톱 런타임과 scoped backup gate 없이 순수 브라우저에서 소스 코드를 편집하거나 저장하는 것
- GitHub API 연동
- 원격 DB 저장
- private secret 또는 원본 대화 전문 공개
