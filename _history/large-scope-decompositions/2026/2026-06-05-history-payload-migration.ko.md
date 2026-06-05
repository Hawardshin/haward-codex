# Large Scope Decomposition: History Payload Migration

## 범위

- 소스 inventory: `workspace-monitor` collector, snapshot type, MonitorShell History/Documents UI, payload check, generated snapshot files, requirements/spec/history records.
- 제외: `_history` 원본 파일 rename/delete, SQLite/DB runtime 도입, 관리자 페이지 전체 재설계.

## Slice

| ID | touch paths | 목적 | 검증 |
| --- | --- | --- | --- |
| HPM-1 | `scripts/collect-workspace.mjs`, generated JSON | 기존 history 기록을 `admin-history-index.json` 색인으로 생성 | collect, payload check |
| HPM-2 | `components/MonitorShell.tsx`, `lib/snapshot.ts` | History/Documents에서만 lazy load | TypeScript, tests |
| HPM-3 | `scripts/check-history-payload.mjs`, tests | 앞으로 payload 비대화 재발 방지 | test, check |
| HPM-4 | requirements/spec/history | 변경 계약과 close-out 추적 | trace/evaluation |

## Merge Gate

- `test`, `check`, `build`, `build:customer`, `perf:budget`, `audit:surfaces`, `git diff --check`가 통과해야 한다.
