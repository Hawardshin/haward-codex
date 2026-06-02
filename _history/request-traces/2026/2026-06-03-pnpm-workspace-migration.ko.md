# 요청-결과 추적: pnpm workspace migration

## 요청

- 사용자가 npm보다 pnpm이 낫지 않냐고 확인한 뒤 전환을 요청했다.

## 결과

- 루트 pnpm workspace를 추가했다.
- `pnpm@10.34.1`을 `packageManager`로 고정했다.
- project별 `package-lock.json`을 제거하고 루트 `pnpm-lock.yaml`로 통합했다.
- Node 관련 durable 실행 명령을 pnpm/Corepack 기준으로 정리했다.
- pnpm workspace override로 `dompurify@3.4.7`, `postcss@8.5.10` 보안 pin을 유지했다.

## 주요 산출물

- `package.json`
- `pnpm-workspace.yaml`
- `pnpm-lock.yaml`
- `_history/installations/2026/2026-06-03-pnpm-workspace-migration.ko.md`
- `_specs/workspace-platform/2026-06-03-pnpm-workspace-migration/`

## 검증 요약

- pnpm frozen install 통과.
- pnpm audit 0 vulnerabilities.
- Workspace Monitor test/check/build/perf/intent-map/customer checks 통과.
- Platform Desktop test/check/monitor build 통과.
- Presentation browser validation 26개 통과.

