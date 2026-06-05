# Local History Hook Componentization Validation

## 초기 검증

- `corepack pnpm --filter workspace-monitor test`: 통과, 52 tests
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `python3 -m json.tool platform-desktop-app/configs/product-gap-registry.json`: 통과
- `PYTHONPATH=src python3 -m agent_platform.cli check-config-contract ../platform-desktop-app/configs/product-gap-registry.json`: 통과
- `corepack pnpm --filter workspace-monitor collect`: 통과, inline documents 650개와 admin history records 2,227개 생성
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run audit:surfaces -- http://127.0.0.1:4185/#section-overview`: 통과, failures 없음
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734,386 bytes
- `corepack pnpm --filter workspace-monitor run check:history-payload`: 통과, documentJsonBytes 1,652,532 bytes
- `git diff --check`: 통과

## 측정

- `MonitorShell.tsx`: 13,108 lines에서 12,970 lines로 감소
- 신규 hook: `components/history/useAdminHistoryIndex.ts`, 207 lines
- 관리자 기록 index는 module cache와 idle preload 경로를 가진다.

## 남은 검증

- 없음
