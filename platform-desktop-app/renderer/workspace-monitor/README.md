# Workspace Monitor

설치형 데스크톱 제품 안에서 저장소의 히스토리, 프로젝트, 에이전트/작업 상태, 요구사항, 스펙, 평가 문서를 정적 snapshot으로 모아 보여주는 Next.js renderer다.

## 목적

- 데스크톱 앱의 renderer UI로 동작하며, Tauri runtime이 있을 때 Workspace Host, CLI session, task run, support bundle 같은 desktop command를 호출한다.
- private repository 상태에서는 로컬에서 문서 기반 운영 현황을 빠르게 본다.
- 독립 웹 배포는 1차 제품 경로가 아니며, 필요한 경우 별도 배포 검토를 거친다.
- Markdown 문서는 snapshot 생성 시 읽기 쉬운 HTML preview로 변환한다.
- `_history/` 문서는 날짜별 타임라인으로 묶어 어떤 날 어떤 작업이 있었는지 본다.
- `agent-platform/configs/agents/`의 에이전트 정의와 `_ops/coordination/status.json`의 runtime 상태를 합쳐 에이전트 인벤토리를 본다.
- Agents 탭에서 에이전트별 작업 lane, agent-task-project 연결 흐름, blocker와 next action을 본다.
- 히스토리 문서의 날짜별 밀도와 유형별 분포를 CSS 기반 차트로 본다.
- 루트 폴더, `_docs` 카테고리, 프로젝트 홈, 히스토리 수집 위치를 구조 지도에서 확인한다.
- Structure 탭에서 운영 메모리, 플랫폼 코어, 데스크톱 제품, 모니터 UI, 도메인 프로젝트, 런타임/로컬 데이터 계층과 각 계층의 소유 경계, 주요 경로, 복잡도 압력점을 먼저 확인한다.
- `agent-platform/configs/access/view-mode-registry.json`을 읽어 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 전환한다. 현재 기본값은 `user`다.
- `agent-platform/configs/access/language-mode-registry.json`을 읽어 전체, 한국어만, 영어만 문서 보기 모드를 전환한다.
- 개발자 보기와 슈퍼어드민 개발 보기에서는 주요 프로젝트와 `_tools`의 소스 코드를 읽기 전용으로 탐색한다.
- 운영 도구의 밀도와 신뢰를 유지하면서도 작은 색상 신호와 micro-interaction으로 은근히 귀여운 톤을 허용한다.

## 구조

```text
platform-desktop-app/renderer/workspace-monitor/
  app/                  Next.js App Router 화면
  components/           dashboard UI 컴포넌트
  lib/                  snapshot 타입과 표시 helper
  scripts/              repository snapshot 생성기와 성능 예산 검사
  src/generated/        commit되는 정적 snapshot
  public/               브라우저에서 직접 확인 가능한 snapshot 복사본
  docs/                 배포와 요구사항 문서
  specs/                spec-driven 산출물
  tests/                snapshot generator 테스트
```

## 명령

```bash
pnpm run collect
pnpm test
pnpm run check
pnpm run build
pnpm run perf:budget
pnpm run dev
```

`pnpm run collect`는 repository root의 `_history`, `_ops`, `_requirements`, `_specs`, 프로젝트 docs/specs, 에이전트 설정, view mode 설정, language mode 설정, source code catalog를 읽어 `src/generated/workspace-snapshot.json`과 `public/workspace-snapshot.json`을 만든다. snapshot에는 문서 목록뿐 아니라 `historyDays` 날짜 index, `agentCatalog`, `collaborationBoard`, `folderStructure`, `structureOverview`, `viewModeCatalog`, `languageModeCatalog`, `sourceFiles`도 포함된다.

UI는 대용량 snapshot을 client JavaScript bundle에 정적으로 포함하지 않고 `/workspace-snapshot.json`을 fetch한 뒤 `MonitorShell`을 lazy-load한다. `pnpm run perf:budget`은 build 후 가장 큰 JavaScript chunk가 1MB를 넘지 않는지 확인해 snapshot bundle 회귀를 막는다.

## 선택적 웹 배포

- Vercel 같은 웹 배포는 현재 1차 제품 경로가 아니다.
- 별도 배포가 필요하면 root directory를 `platform-desktop-app/renderer/workspace-monitor`로 설정한다.
- Install command: `pnpm install --frozen-lockfile`
- Build command: `pnpm run build`
- Output은 Next.js가 관리한다. `next.config.mjs`는 production build에서만 `output: "export"`와 상대 `assetPrefix`를 사용하고, dev 서버는 일반 Next dev hydration 경로를 유지한다.

## 공개 전 점검

public 배포 전에 반드시 `src/generated/workspace-snapshot.json`을 확인한다.

- private note, secret, raw prompt, 로컬 절대 경로가 공개되어도 되는지 확인한다.
- 공개하면 안 되는 문서가 있으면 원천 문서 또는 collector 범위를 조정한다.
- 소스 코드도 snapshot에 포함되므로 public 배포 전에 `sourceFiles` 범위를 반드시 검토한다.
- view mode selector는 보안 경계가 아니다. public 사용자용으로 제한해야 하는 정보는 collector 범위나 배포 전 redaction에서 제거한다.
- language mode selector는 표시 렌즈다. public 배포에서 특정 언어 문서를 제외해야 하면 원천 문서나 collector 범위를 조정한다.
- 조정 후 `pnpm run collect`와 `pnpm run build`를 다시 실행한다.
