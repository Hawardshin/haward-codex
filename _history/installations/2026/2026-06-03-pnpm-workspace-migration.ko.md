# 2026-06-03 설치 기록: pnpm workspace migration

## 상태

- 상태: installed
- 설치 대상: `pnpm@10.34.1` 기반 workspace dependency resolution
- 소유 프로젝트/도구: workspace
- 설치 범위: project
- 환경 경로: repository root `pnpm-lock.yaml`, project `node_modules/`, `/Users/shinjoungeun/Library/pnpm/store/v10`

## 설치 이유

- 사용자가 npm보다 pnpm이 낫지 않냐고 확인한 뒤 전환을 요청했다.
- 저장소에는 여러 Node 프로젝트가 분산되어 있으므로 루트 workspace lockfile과 pnpm workspace 필터가 유지보수에 더 적합하다.

## 설치 전 조사

| 출처 | 확인일 | 사용한 이유 |
| --- | --- | --- |
| https://pnpm.io/installation | 2026-06-03 | Corepack과 `packageManager` 고정, pnpm/Node 호환 범위 확인 |
| https://pnpm.io/workspaces | 2026-06-03 | workspace root의 `pnpm-workspace.yaml` 필요성 확인 |
| https://nodejs.org/download/release/v22.4.0/docs/api/corepack.html | 2026-06-03 | Corepack을 package manager version manager로 사용하는 근거 |
| https://docs.npmjs.com/cli/commands/npm-ci/ | 2026-06-03 | 기존 npm lock 기반 재현 설치 모델의 전환 대상 확인 |
| https://pnpm.io/10.x/settings | 2026-06-03 | pnpm 10의 dependency build script deny/ignore 설정 확인 |

## 설치 계획

- 정확한 설치 명령:
  - `corepack prepare pnpm@10.34.1 --activate`
  - `corepack pnpm install --lockfile-only`
  - `corepack pnpm install`
- dependency 기록 파일:
  - `package.json`
  - `pnpm-workspace.yaml`
  - `pnpm-lock.yaml`
  - `workspace-monitor/package.json`
  - `platform-desktop-app/package.json`
  - `presentation-agent/package.json`
- lock/SBOM 상태: project별 `package-lock.json` 제거 후 루트 `pnpm-lock.yaml`로 통합.
- 예상 변경 파일:
  - npm lockfile 제거
  - pnpm workspace config 추가
  - package scripts/docs/configs의 npm 호출을 pnpm 호출로 교체
- 권한 승인 필요 여부: 사용자 요청으로 진행. global npm install은 하지 않는다.

## 보안/라이선스 검토

- 보안 검토: 새 직접 dependency를 추가하지 않고 기존 dependency graph를 pnpm lockfile로 재해석한다. `dompurify@3.4.7`과 `postcss@8.5.10`을 pnpm workspace override로 고정해 기존 npm override 보안 상태를 보존한다. `sharp@0.34.5`는 Next의 transitive native dependency로, install 경고를 남기지 않도록 `onlyBuiltDependencies`에 명시 승인했다.
- 라이선스 검토: 직접 dependency 목록은 기존과 동일하게 유지한다. `@tauri-apps/cli`는 기존 lockfile의 `2.11.2`를 exact pin으로 보존한다.
- 유지보수/커뮤니티 신호: pnpm 공식 문서와 Corepack 공식 문서를 기준으로 전환한다.
- 알려진 위험: pnpm의 strict node_modules 구조가 숨은 dependency 사용을 드러낼 수 있다. 이 경우 테스트/check/build 실패로 잡고 필요한 manifest를 보정한다. Dependency build scripts는 전체 허용하지 않고 `sharp`만 명시 승인한다.

## 설치 후 실제 결과

- 실행한 명령:
  - `corepack prepare pnpm@10.34.1 --activate`
  - `corepack pnpm install --lockfile-only`
  - `corepack pnpm install`
  - `corepack pnpm install --frozen-lockfile`
  - `corepack pnpm audit --prod=false`
- 설치된 버전:
  - `pnpm@10.34.1`
  - `@tauri-apps/cli@2.11.2`
  - `@playwright/test@1.60.0`
  - `@axe-core/playwright@4.11.3`
  - `next@16.2.6`
  - `react@19.2.6`
  - `sharp@0.34.5` install script approved
  - `dompurify@3.4.7`
  - `postcss@8.5.10`
- 변경된 파일:
  - 추가: root `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`
  - 변경: Node project `package.json`, Tauri/Vercel/docs/config command references
  - 제거: `workspace-monitor/package-lock.json`, `platform-desktop-app/package-lock.json`, `presentation-agent/package-lock.json`
- 생성/갱신된 lock 파일: root `pnpm-lock.yaml` 생성, project별 npm lockfile 제거.
- 검증 명령과 결과:
  - `corepack pnpm --version`: `10.34.1`
  - `corepack pnpm install --frozen-lockfile`: 통과, `sharp@0.34.5` install script completed
  - `corepack pnpm audit --prod=false`: `No known vulnerabilities found`
  - `corepack pnpm --filter workspace-monitor test`: 16 tests passed
  - `corepack pnpm --filter workspace-monitor check`: 통과
  - `corepack pnpm --filter workspace-monitor build`: 통과
  - `corepack pnpm --filter workspace-monitor perf:budget`: 통과, largest chunk 227542 bytes
  - `corepack pnpm --filter workspace-monitor check:intent-map`: 통과
  - `corepack pnpm --filter workspace-monitor check:intent-map:customer`: 통과 after customer build
  - `corepack pnpm --filter platform-desktop-app test`: 13 tests passed
  - `corepack pnpm --filter platform-desktop-app check`: 통과
  - `corepack pnpm --filter platform-desktop-app monitor:build`: 통과
  - `corepack pnpm --filter presentation-agent-browser-validation test:browser`: 26 tests passed

## Rollback

- 제거 명령:
  - `rm -rf node_modules workspace-monitor/node_modules platform-desktop-app/node_modules presentation-agent/node_modules`
  - `corepack pnpm store path`로 store 위치 확인 후 필요 시 pnpm store 정리
- 되돌릴 파일:
  - `package.json`
  - `pnpm-workspace.yaml`
  - `pnpm-lock.yaml`
  - 각 프로젝트 `package.json`
  - 제거된 `package-lock.json`
- 복구 검증: npm lockfile을 되돌린 뒤 기존 npm 기반 test/check/build 명령을 재실행.

## 연결

- 설치 레지스트리: `_ops/installations/registry.json`
- 작업 요약: `_history/work-summaries/2026/2026-06-03.ko.md`
- 평가 보고서: `_history/evaluations/2026/2026-06-03-pnpm-workspace-migration-evaluation-result.json`
- 커밋: pending
