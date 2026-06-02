# 작업 평가: 런타임 리소스 누수 하드닝

## 요청

메모리 누수나 유사한 런타임 리소스 누수를 보고 필요한 작업을 하라는 요청이었다.

## 완료

- Rust CLI supervisor에 완료 session retention/prune을 추가했다.
- child process cancel/timeout/error 경로에서 `kill()` 뒤 `wait()`를 호출하게 했다.
- session cleanup에서 join 가능한 stdout/stderr reader thread handle을 회수한다.
- `SnapshotLoader` fetch abort와 Desktop runtime panel mounted-ref guard를 추가했다.
- resource guard가 `resource_ready`로 통과했다.

## 평가

- 초기 요청과 결과는 일치한다. 단순 점검이 아니라 실제 누적 가능성이 있는 session store, process cleanup, fetch/effect cleanup 경로를 보강했다.
- 실제 외부 CLI를 장시간 실행하는 soak profile은 이번 source hardening 범위에서는 실행하지 않았고 후속 개선 후보로 남겼다.
