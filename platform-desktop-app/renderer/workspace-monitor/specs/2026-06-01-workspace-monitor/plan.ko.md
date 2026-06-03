# 구현 계획: Workspace Monitor

## 근거

- Next.js App Router 공식 문서는 `app/` 기반 라우팅과 정적 export를 지원한다.
- Vercel 공식 문서는 Next.js framework preset과 repository 기반 배포를 지원한다.
- public 배포 전 민감 정보 검토가 필요하므로 runtime에서 repository 파일을 직접 읽지 않고, 사전 생성 snapshot을 사용한다.

## 구현 전략

1. `workspace-monitor/`를 새 루트 프로젝트로 등록한다.
2. Next.js App Router 프로젝트를 수동 scaffold한다.
3. `scripts/collect-workspace.mjs`로 `_history`, `_ops`, `_requirements`, `_specs`, 각 프로젝트 docs/specs를 읽어 snapshot을 만든다.
4. UI는 snapshot 기반으로 stats, projects, agents/tasks, recent history, document explorer를 렌더링한다.
5. Markdown preview는 raw HTML 삽입 위험을 줄이기 위해 escaping 기반의 제한 렌더러로 생성한다.
6. Vercel 배포 문서와 public 공개 전 점검 절차를 작성한다.
7. dependency 설치 기록, lock 파일, 테스트/빌드/브라우저 검증, 평가를 남긴다.

## 리스크

- public 배포 시 private 내용이 snapshot에 포함될 수 있다. 배포 전 snapshot 검토 절차를 README와 deployment 문서에 둔다.
- Vercel에서 parent repository 파일 접근 방식이 달라질 수 있다. snapshot을 commit해 build가 실패하지 않게 하고, build 전 collect는 best-effort로 둔다.
- Markdown renderer는 완전한 Markdown 구현이 아니다. 우선 읽기 편한 preview를 목표로 한다.

