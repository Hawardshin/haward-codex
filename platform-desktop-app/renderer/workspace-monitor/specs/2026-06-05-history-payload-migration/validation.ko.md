# History Payload Migration Validation

## 실행한 검증

- `node --check platform-desktop-app/renderer/workspace-monitor/scripts/collect-workspace.mjs`: 통과
- `node --check platform-desktop-app/renderer/workspace-monitor/scripts/check-history-payload.mjs`: 통과
- `corepack pnpm --filter workspace-monitor collect`: 통과, inline documents 650개와 admin history records 2,220개 생성
- `corepack pnpm --filter workspace-monitor run check:history-payload`: 통과
- `corepack pnpm --filter workspace-monitor test`: 통과, 51 tests
- `corepack pnpm --filter workspace-monitor run check`: 통과
- `corepack pnpm --filter workspace-monitor run build`: 통과
- `corepack pnpm --filter workspace-monitor run audit:surfaces -- http://127.0.0.1:4184/#section-overview`: 통과, failures 없음
- `corepack pnpm --filter workspace-monitor run build:customer`: 통과, public admin history index empty 확인
- `corepack pnpm --filter workspace-monitor run perf:budget`: 통과, largest chunk 734,386 bytes

## 측정

- 기본 snapshot documents: 1200개 상한에서 650개 상한으로 감소
- 기본 snapshot `documents` JSON: 1,651,769 bytes
- inline history documents: 96개
- `admin-history-index.json`: 2,220 records, 3,207,045 bytes

## 남은 검증

- 최종 close-out 전에 `git diff --check`를 실행한다.
