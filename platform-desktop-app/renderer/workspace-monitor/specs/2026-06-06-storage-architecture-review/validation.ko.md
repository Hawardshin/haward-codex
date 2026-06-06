# Storage Architecture Review 검증 계획

## 정적 검증

- `python3 -m json.tool platform-desktop-app/configs/storage-architecture-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/product-feature-registry.json`
- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`

## Workspace Monitor 검증

- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm --filter workspace-monitor run check`
- `corepack pnpm --filter workspace-monitor test`
- `corepack pnpm --filter workspace-monitor run build`

## Desktop package 검증

- `corepack pnpm run desktop:package:internal`

## 수동 검토 기준

- DB는 operational plane으로만 정의되어야 한다.
- 파일 기반 durable knowledge를 DB로 옮긴다는 문장이 없어야 한다.
- SQLite 설치가 이번 변경에 포함되지 않았음을 명확히 해야 한다.
- 다음 구현자가 `db-001`부터 시작할 수 있어야 한다.

## 실행 결과

- `python3 -m json.tool platform-desktop-app/configs/storage-architecture-registry.json`: passed
- `python3 -m json.tool platform-desktop-app/configs/product-feature-registry.json`: passed
- `python3 -m json.tool platform-desktop-app/configs/desktop-distribution-registry.json`: passed
- `corepack pnpm --filter workspace-monitor run collect`: passed, 650 inline documents and 2599 admin history records
- `corepack pnpm --filter workspace-monitor run check`: passed
- `corepack pnpm --filter workspace-monitor test`: passed, 75 tests
- `corepack pnpm --filter workspace-monitor run build`: passed
- `corepack pnpm run desktop:package:internal`: passed, internal `.app` and DMG generated and verified
