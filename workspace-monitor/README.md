# Workspace Monitor

저장소의 히스토리, 프로젝트, 에이전트/작업 상태, 요구사항, 스펙, 평가 문서를 정적 snapshot으로 모아 보여주는 Next.js 모니터링 사이트다.

## 목적

- private repository 상태에서는 로컬에서 문서 기반 운영 현황을 빠르게 본다.
- 나중에 repository를 public으로 바꾸면 Vercel에 배포할 수 있다.
- Markdown 문서는 snapshot 생성 시 읽기 쉬운 HTML preview로 변환한다.

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

`npm run collect`는 repository root의 `_history`, `_ops`, `_requirements`, `_specs`, 프로젝트 docs/specs를 읽어 `src/generated/workspace-snapshot.json`과 `public/workspace-snapshot.json`을 만든다.

## Vercel 배포

- Vercel에서 프로젝트 root directory를 `workspace-monitor`로 설정한다.
- Install command: `npm ci`
- Build command: `npm run build`
- Output은 Next.js가 관리한다. `next.config.mjs`는 `output: "export"`를 사용한다.

## 공개 전 점검

public 배포 전에 반드시 `src/generated/workspace-snapshot.json`을 확인한다.

- private note, secret, raw prompt, 로컬 절대 경로가 공개되어도 되는지 확인한다.
- 공개하면 안 되는 문서가 있으면 원천 문서 또는 collector 범위를 조정한다.
- 조정 후 `npm run collect`와 `npm run build`를 다시 실행한다.

