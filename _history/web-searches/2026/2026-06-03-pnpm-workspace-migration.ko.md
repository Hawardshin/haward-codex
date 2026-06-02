# 웹 검색 기록: pnpm workspace migration

## 사용자 지시 요약

- 기존 npm 기반 Node 프로젝트들을 pnpm 기반 workspace로 전환한다.

## 검색어

- `pnpm official installation corepack packageManager pnpm workspace docs`
- `pnpm official pnpm-workspace.yaml workspace docs`
- `npm official package-lock npm ci docs lockfile`

## 확인한 출처

| 출처 | 유형 | 확인일 | 계획 반영 |
| --- | --- | --- | --- |
| https://pnpm.io/installation | 공식 문서 | 2026-06-03 | Corepack과 `packageManager`로 pnpm 버전을 고정한다. 현재 Node 21 환경에서는 pnpm 11이 아니라 pnpm 10을 선택한다. |
| https://pnpm.io/workspaces | 공식 문서 | 2026-06-03 | workspace root에 `pnpm-workspace.yaml`을 추가한다. |
| https://pnpm.io/10.x/settings | 공식 문서 | 2026-06-03 | pnpm 10 dependency build script 정책을 확인하고 `sharp`를 명시 승인한다. |
| https://nodejs.org/download/release/v22.4.0/docs/api/corepack.html | 공식 문서 | 2026-06-03 | Corepack을 package manager version manager로 사용한다. |
| https://docs.npmjs.com/cli/commands/npm-ci/ | 공식 문서 | 2026-06-03 | 기존 `package-lock.json`/`npm ci` 기반을 전환 대상으로 분류한다. |

## 무시한 약한 출처

- Reddit/일반 블로그 검색 결과는 환경별 경험담으로만 보고, 전환 기준에는 공식 문서와 로컬 검증을 사용한다.

## 공개 판단 요약

- pnpm은 이 저장소처럼 여러 Node 프로젝트가 병존하는 workspace에 더 적합하다.
- 현재 로컬 Node는 `v21.7.1`이므로 pnpm 11의 Node 22+ 요구에 맞지 않는다. `pnpm@10.34.1`은 `node >=18.12`로 확인되어 현재 환경에 맞다.
- npm lockfile은 현재 실행 이력으로 유지하지 않고, 루트 `pnpm-lock.yaml` 하나로 전환한다.
- pnpm 10의 dependency build script 정책에 따라 `sharp`는 `onlyBuiltDependencies`로 명시 승인한다.
