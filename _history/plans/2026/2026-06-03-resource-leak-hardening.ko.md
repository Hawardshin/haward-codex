# 계획 기록: 런타임 리소스 누수 하드닝

## 요청

메모리 누수나 유사한 런타임 리소스 누수가 있는지 보고 필요한 작업을 한다.

## 범위 분해

| slice | 조사 대상 | 결정 |
| --- | --- | --- |
| Rust CLI supervisor | child process, stdout/stderr reader thread, session store, bounded output | 구현 대상 |
| React monitor lifecycle | fetch, initial async refresh, active session polling interval | 구현 대상 |
| generated/build/dependency output | `target/`, `.next`, `node_modules`, generated large files | 제외 |
| long-running soak profile | 실제 external CLI를 오래 돌린 RSS/heap 측정 | 후속 후보 |

## 실행

1. web search와 memory bootstrap을 먼저 실행한다.
2. `_ops/workflows/69-resource-leak-prevention.md`를 적용한다.
3. `rg`로 timer, fetch, subscription, child process, thread, kill/wait 경로를 inventory한다.
4. Rust session store cleanup과 process wait 누락 경로를 보강한다.
5. React fetch abort와 async state update guard를 보강한다.
6. Rust/Node/Next/customer bundle/resource guard 검증을 실행한다.

## 판단

- 완료 session은 UI에서 계속 보일 필요가 있지만 task-run store가 durable record를 보존하므로, in-memory session store는 30분/40개 기준으로 제한한다.
- 실제 installed adapter soak profile은 현재 CLI 설치/인증 상태와 사용자 환경에 의존하므로 이번 source hardening 범위에서는 defer하고, resource guard에 후속 후보로 기록한다.
