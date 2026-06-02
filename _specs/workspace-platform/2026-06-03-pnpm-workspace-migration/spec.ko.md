# 스펙: pnpm workspace migration

## 목표

- npm lockfile 기반 Node 프로젝트들을 pnpm workspace 기반으로 전환한다.
- 현재 검증 명령과 설치 문서가 pnpm을 기준으로 동작하게 한다.

## 범위

- 추가: 루트 `package.json`, `pnpm-workspace.yaml`, `pnpm-lock.yaml`.
- 변경: `workspace-monitor`, `platform-desktop-app`, `presentation-agent` package manifest와 실행 문서/config.
- 제거: project별 `package-lock.json`.

## 비범위

- 새 런타임 dependency 추가.
- Rust/Cargo dependency 변경.
- 과거 히스토리 문서의 명령어 전면 소급 수정.

## 수용 기준

- `corepack pnpm install --frozen-lockfile`이 통과한다.
- `workspace-monitor` test/check/build/perf/customer checks가 pnpm으로 통과한다.
- `platform-desktop-app` test/check/monitor build가 pnpm으로 통과한다.
- `presentation-agent`는 package resolution이 pnpm으로 가능하고 browser harness 명령은 pnpm 기준으로 문서화된다.

