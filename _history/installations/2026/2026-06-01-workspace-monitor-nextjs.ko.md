# 2026-06-01 설치 기록: workspace-monitor Next.js dependencies

## 상태

- 상태: installed
- 설치 대상: Next.js, React, React DOM, lucide-react, TypeScript type tooling
- 소유 프로젝트/도구: `workspace-monitor`
- 설치 범위: project
- 환경 경로: `workspace-monitor/node_modules/`

## 설치 이유

- 사용자가 Vercel 배포 가능한 Next.js 모니터링 사이트를 요청했다.
- UI 버튼/탭 icon은 `lucide-react`를 사용한다.
- TypeScript build/check를 위해 project-local dev dependencies가 필요하다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| `https://nextjs.org/docs/app/guides/static-exports` | 2026-06-01 | static export 설정 근거 |
| `https://vercel.com/docs/frameworks/full-stack/nextjs` | 2026-06-01 | Vercel Next.js 배포 근거 |
| `https://www.npmjs.com/package/lucide-react` | 2026-06-01 | icon dependency와 라이선스 확인 |
| `_docs/open-source-installation-policy.ko.md` | 2026-06-01 | 설치 기록과 rollback 정책 |

## 설치 계획

- 정확한 설치 명령:
  - `npm install --save-exact next@16.2.2 react@latest react-dom@latest lucide-react@latest`
  - `npm install --save-dev --save-exact typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest`
- dependency 기록 파일: `workspace-monitor/package.json`, `workspace-monitor/package-lock.json`
- lock/SBOM 상태: `package-lock.json` 생성 예정
- 예상 변경 파일: `package.json`, `package-lock.json`, `node_modules/` local install
- 권한 승인 필요 여부: 네트워크 접근이 필요하면 승인 요청

## 보안/라이선스 검토

- 보안 검토: 설치 후 `npm audit` 또는 install audit output을 확인한다.
- 라이선스 검토: Next.js/React ecosystem은 일반적으로 OSS 라이선스로 사용되며, lucide-react는 npm package metadata에서 license를 확인한다.
- 유지보수/커뮤니티 신호: Next.js와 React는 주요 web framework/runtime이며 Vercel 공식 지원을 받는다.
- 알려진 위험: transitive dependency 수가 늘어난다. lock 파일과 audit 결과로 추적한다.

## 설치 후 실제 결과

- 실행한 명령:
  - `npm install --save-exact next@16.2.2 react@latest react-dom@latest lucide-react@latest`
  - `npm audit --json`
  - `npm install --save-exact next@16.2.6`
  - `npm audit --json`
  - `npm install --save-dev --save-exact typescript@latest @types/node@latest @types/react@latest @types/react-dom@latest`
  - `npm install` after adding `overrides.postcss=8.5.10`
  - `npm audit --json`
- 설치된 버전:
  - `next@16.2.6`
  - `react@19.2.6`
  - `react-dom@19.2.6`
  - `lucide-react@1.17.0`
  - `typescript@6.0.3`
  - `@types/node@25.9.1`
  - `@types/react@19.2.15`
  - `@types/react-dom@19.2.3`
  - `postcss@8.5.10 overridden`
- 변경된 파일:
  - `workspace-monitor/package.json`
  - `workspace-monitor/package-lock.json`
  - `workspace-monitor/node_modules/` local install, git ignored
- 생성/갱신된 lock 파일: `workspace-monitor/package-lock.json`
- 검증 명령과 결과:
  - 초기 audit: Next 16.2.2에서 high/moderate 취약점 확인
  - Next 16.2.6 업데이트 후 audit: PostCSS moderate 취약점 2개 잔존
  - `overrides.postcss=8.5.10` 적용 후 audit: `0 vulnerabilities`
  - `npm ls --depth=0`: 설치 버전 확인
  - `npm ls postcss`: `postcss@8.5.10 overridden`
  - `npm test`: 4 tests 통과
  - `npm run check`: 통과
  - `npm run build`: 통과

## Rollback

- 제거 명령: `rm -rf workspace-monitor/node_modules workspace-monitor/package-lock.json` 후 `package.json` dependency 제거
- 되돌릴 파일: `workspace-monitor/package.json`, `workspace-monitor/package-lock.json`
- 복구 검증: `git status`, 필요 시 `npm install` 재실행

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- 작업 요약: `_history/work-summaries/2026/2026-06-01.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-06-01-workspace-monitor.ko.md`
- 커밋: `a8c085e`
