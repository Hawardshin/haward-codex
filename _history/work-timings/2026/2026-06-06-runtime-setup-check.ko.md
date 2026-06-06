# Work Timing: Runtime Setup Check

## 단계별 기록

| 단계 | 대략 소요 | 메모 |
| --- | ---: | --- |
| web-first intake | 3분 | Node child_process, Tauri/macOS PATH 관련 확인 |
| 요구사항/스펙 | 8분 | runtime setup check 요구사항과 구현 범위 기록 |
| 구현 | 25분 | Rust command, renderer state/action/UI, CSS, test contract |
| 검증 | 25분 | test/check/cargo/package/browser 확인 |
| 기록/정리 | 10분 | validation, omission/resource, 평가, trace 기록 |

## 병목

- settings modal이 상위 shell에 있어 Desktop Runtime panel의 `workingDir` state를 직접 공유하지 않는다. 이번 구현은 앱 기본 workspace 기준으로 terminal check를 수행하고, 세션별 working dir check는 후속 확장으로 남겼다.
- generated snapshot/admin index는 공유 파일이라 `test`와 `check`를 병렬 실행하면 history payload gate가 흔들릴 수 있다. collect 후 check를 직렬로 실행해 통과시켰다.
