# Large Scope Decomposition: Local History Hook Componentization

## 범위

- 포함: Workspace Monitor 관리자 기록 로딩, `MonitorShell.tsx` helper 분리, History 화면 한국어 문구, product gap evidence.
- 제외: MonitorShell 전체 분리, release signing/notarization, DB 저장소 전환.

## Slice

| ID | touch paths | 목적 | 검증 |
| --- | --- | --- | --- |
| LHC-1 | `components/history/useAdminHistoryIndex.ts` | local admin history 로딩/캐시/idle preload 분리 | TypeScript, tests |
| LHC-2 | `components/MonitorShell.tsx` | hook 사용과 Korean copy 정리 | tests, browser audit |
| LHC-3 | requirements/spec/history | 구조 부채 진행 증거 기록 | trace/evaluation |

## Merge Gate

- `test`, `check`, `build`, `build:customer`, `perf:budget`, `audit:surfaces`, `git diff --check` 통과.
