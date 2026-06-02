# 계획: 런타임 리소스 누수 하드닝

## 작업 모드

- `standard`

## 큰 범위 분해

| slice | 범위 | 대표 파일 | 제외 |
| --- | --- | --- | --- |
| R1 Rust CLI supervisor | child process, reader thread, session store retention | `platform-desktop-app/src-tauri/src/lib.rs` | `target/`, Cargo dependency source |
| R2 React monitor lifecycle | fetch abort, initial async refresh, polling cleanup | `workspace-monitor/components/SnapshotLoader.tsx`, `workspace-monitor/components/MonitorShell.tsx` | 전체 UI redesign |
| R3 Validation and guard | build/test/check-resources | `_history/evaluations/2026/` | production soak profiling |

## 근거

- React effect cleanup 공식 문서 기준으로 외부 시스템과 비동기 작업 cleanup을 확인한다.
- Rust `Child` 공식 문서 기준으로 child process는 drop만으로 wait되지 않는다는 점을 반영한다.
- 기존 repo resource guard workflow를 적용한다.

## 실행 순서

1. web-first intake, memory bootstrap, resource workflow를 확인한다.
2. 생성/cleanup 경로를 `rg`로 inventory한다.
3. Rust session store와 kill/wait 경로를 보강한다.
4. React fetch/effect cleanup을 보강한다.
5. Rust/Node/Next/customer bundle/resource guard 검증을 실행한다.

## 판단

- 장시간 프로파일링은 이번 범위에서 자동화하지 않는다. 대신 lifecycle cleanup, bounded output, retention, build/test/resource guard를 close-out 기준으로 삼는다.
