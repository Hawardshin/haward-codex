# Vercel 배포 가이드

## 전제

- 이 프로젝트는 `workspace-monitor/`를 Vercel root directory로 설정하는 것을 기준으로 한다.
- 현재 repository가 private이면 로컬 사용을 우선한다.
- repository를 public으로 바꾼 뒤 배포할 때는 generated snapshot을 먼저 검토한다.

## Vercel 설정

| 항목 | 값 |
| --- | --- |
| Root Directory | `workspace-monitor` |
| Framework Preset | Next.js |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | Next.js 기본값 |

## 배포 전 체크리스트

1. `npm run collect`로 snapshot을 최신화한다.
2. `src/generated/workspace-snapshot.json`에 공개하면 안 되는 정보가 들어있는지 확인한다.
3. `npm test`, `npm run check`, `npm run build`를 실행한다.
4. repository를 public으로 전환하거나 Vercel에 private repository 접근 권한을 부여한다.
5. Vercel에서 root directory를 `workspace-monitor`로 설정하고 배포한다.

## 운영 방식

- 새 작업이 끝난 뒤 모니터에 반영하려면 `npm run collect`를 실행하고 snapshot을 commit한다.
- Vercel build에서도 `prebuild`가 best-effort로 collect를 실행한다.
- Vercel 환경에서 parent repository 접근이 제한되면 commit된 snapshot으로 build가 계속된다.

