# Workspace Monitor

저장소의 히스토리, 프로젝트, 에이전트/작업 상태, 요구사항, 스펙, 평가 문서를 정적 snapshot으로 모아 보여주는 Next.js 모니터링 사이트다.

## 목적

- private repository 상태에서는 로컬에서 문서 기반 운영 현황을 빠르게 본다.
- 나중에 repository를 public으로 바꾸면 Vercel에 배포할 수 있다.
- Markdown 문서는 snapshot 생성 시 읽기 쉬운 HTML preview로 변환한다.
- `_history/` 문서는 날짜별 타임라인으로 묶어 어떤 날 어떤 작업이 있었는지 본다.
- `agent-platform/configs/agents/`의 에이전트 정의와 `_ops/coordination/status.json`의 runtime 상태를 합쳐 에이전트 인벤토리를 본다.
- Agents 탭에서 에이전트별 작업 lane, agent-task-project 연결 흐름, blocker와 next action을 본다.
- 히스토리 문서의 날짜별 밀도와 유형별 분포를 CSS 기반 차트로 본다.
- 루트 폴더, `_docs` 카테고리, 프로젝트 홈, 히스토리 수집 위치를 구조 지도에서 확인한다.
- `agent-platform/configs/access/view-mode-registry.json`을 읽어 사용자 보기, 개발자 보기, 슈퍼어드민 개발 보기를 전환한다. 현재 기본값은 `superadmin_developer`다.
- 개발자 보기와 슈퍼어드민 개발 보기에서는 주요 프로젝트와 `_tools`의 소스 코드를 읽기 전용으로 탐색한다.
- 운영 도구의 밀도와 신뢰를 유지하면서도 작은 색상 신호와 micro-interaction으로 은근히 귀여운 톤을 허용한다.

## 구조

```text
workspace-monitor/
  app/                  Next.js App Router 화면
  components/           dashboard UI 컴포넌트
  lib/                  snapshot 타입과 표시 helper
  scripts/              repository snapshot 생성기
  src/generated/        commit되는 정적 snapshot
  public/               브라우저에서 직접 확인 가능한 snapshot 복사본
  docs/                 배포와 요구사항 문서
  specs/                spec-driven 산출물
  tests/                snapshot generator 테스트
```

## 명령

```bash
npm run collect
npm test
npm run check
npm run build
npm run dev
```

`npm run collect`는 repository root의 `_history`, `_ops`, `_requirements`, `_specs`, 프로젝트 docs/specs, 에이전트 설정, view mode 설정, source code catalog를 읽어 `src/generated/workspace-snapshot.json`과 `public/workspace-snapshot.json`을 만든다. snapshot에는 문서 목록뿐 아니라 `historyDays` 날짜 index, `agentCatalog`, `collaborationBoard`, `folderStructure`, `viewModeCatalog`, `sourceFiles`도 포함된다.

## Vercel 배포

- Vercel에서 프로젝트 root directory를 `workspace-monitor`로 설정한다.
- Install command: `npm ci`
- Build command: `npm run build`
- Output은 Next.js가 관리한다. `next.config.mjs`는 `output: "export"`를 사용한다.

## 공개 전 점검

public 배포 전에 반드시 `src/generated/workspace-snapshot.json`을 확인한다.

- private note, secret, raw prompt, 로컬 절대 경로가 공개되어도 되는지 확인한다.
- 공개하면 안 되는 문서가 있으면 원천 문서 또는 collector 범위를 조정한다.
- 소스 코드도 snapshot에 포함되므로 public 배포 전에 `sourceFiles` 범위를 반드시 검토한다.
- view mode selector는 보안 경계가 아니다. public 사용자용으로 제한해야 하는 정보는 collector 범위나 배포 전 redaction에서 제거한다.
- 조정 후 `npm run collect`와 `npm run build`를 다시 실행한다.
