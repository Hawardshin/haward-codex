# Parallel Snapshot Collector 작업 시간 기록

| 단계 | 상태 | 메모 |
| --- | --- | --- |
| 조사 | 완료 | 공식 문서와 기존 Rust 구조 확인 |
| 구현 | 완료 | worker pool, file worker, async buildSnapshot |
| 1차 검증 | 완료 | collect/check/test 통과 |
| 최종 패키징 | 완료 | Tauri package, codesign, hdiutil verify 완료 |

## 관측

`time corepack pnpm --filter workspace-monitor run collect`에서 222% CPU 사용률과 0.855s wall time을 관측했다. snapshot에는 document workers 6, source workers 4가 기록됐다.
registry와 기록 반영 후 재측정에서는 280% CPU, 0.645s wall time을 관측했다.
