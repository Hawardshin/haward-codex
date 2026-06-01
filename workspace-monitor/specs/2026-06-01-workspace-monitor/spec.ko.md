# 스펙: Workspace Monitor

## 목표

현재 저장소를 기반으로 히스토리, 에이전트/작업 상태, 프로젝트, 요구사항, 스펙, 평가, Markdown 문서를 보기 쉽게 시각화하는 Next.js 모니터링 사이트를 만든다. 로컬에서는 private repository 기반으로 사용하고, 나중에 repository를 public으로 전환하면 Vercel에 배포할 수 있어야 한다.

## 요구사항

- `REQ-WM-001` - `REQ-WM-006`

## 동작

- `scripts/collect-workspace.mjs`가 repository 문서를 읽어 `src/generated/workspace-snapshot.json`을 생성한다.
- Next.js UI는 snapshot JSON만 읽어 정적 렌더링한다.
- 메인 화면은 Overview, Projects, History, Documents, Requirements, Agents 섹션을 제공한다.
- 검색어와 category filter로 문서를 좁힐 수 있다.
- Markdown은 escaped HTML preview로 보여준다.
- Vercel 배포 전 snapshot 공개 범위와 민감 정보 점검 절차를 문서화한다.

## 수용 기준

- `npm run collect`, `npm test`, `npm run check`, `npm run build`가 통과한다.
- 로컬 브라우저에서 주요 섹션이 보이고 문서 preview가 비어 있지 않다.
- project registry에 `workspace-monitor/`가 등록된다.
- 설치 기록과 lock 파일이 남는다.

## 제외 범위

- 실시간 push 알림, 인증, 데이터베이스, GitHub OAuth
- Markdown 전체 spec 완전 렌더링
- private repository를 자동 public으로 전환하는 기능

