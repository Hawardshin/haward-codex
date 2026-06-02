# 요구사항 변경: pnpm workspace migration

## 요구사항

| ID | 요구사항 | 우선순위 | 검증 |
| --- | --- | --- | --- |
| REQ-WS-088 | 저장소의 JavaScript/TypeScript 프로젝트는 pnpm workspace와 루트 `pnpm-lock.yaml`을 기준으로 의존성을 설치하고 검증해야 한다. | must | `corepack pnpm install --frozen-lockfile`, 프로젝트별 pnpm test/check/build |
| REQ-WS-089 | package manager 버전은 Corepack이 읽을 수 있도록 `packageManager`로 고정되어야 한다. | must | `corepack pnpm --version`이 고정 버전 출력 |
| REQ-WS-090 | 실행 문서와 durable config는 현재 설치/검증 명령을 npm이 아니라 pnpm으로 안내해야 한다. | must | npm 명령 참조 audit |

## 이유

- 여러 Node 프로젝트가 분산된 구조에서는 루트 workspace lockfile이 유지보수와 재현성에 더 적합하다.
- 사용자가 pnpm 전환을 명시적으로 요청했다.

