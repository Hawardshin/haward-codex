# 웹 검색 기록: 런타임 리소스 누수 하드닝

## 검색 목적

메모리 누수나 유사한 런타임 리소스 누수 점검 요청을 처리하기 전에 React effect cleanup, fetch abort, Rust child process lifecycle 기준을 확인했다.

## 검색 일시

- 날짜: 2026-06-03
- 작업 모드: `standard`

## 검색 쿼리

- `React useEffect cleanup memory leaks official documentation timers subscriptions polling`
- `Rust child process kill wait drop resource leak official documentation std process Child`
- `Tauri command async process cleanup resource leak best practices`

## 확인한 주요 출처

| 출처 | 유형 | 확인 내용 | 적용 |
| --- | --- | --- | --- |
| React Docs, `useEffect`, https://react.dev/reference/react/useEffect | 공식 문서 | Effect는 외부 시스템 연결, timer, subscription 같은 setup에 대응하는 cleanup을 반환해야 한다. | polling interval cleanup과 unmount 후 state update guard를 확인했다. |
| MDN, AbortController, https://developer.mozilla.org/en-US/docs/Web/API/AbortController | 웹 표준 문서 | fetch 같은 비동기 요청을 abort signal로 취소할 수 있다. | `SnapshotLoader` fetch에 `AbortController`를 연결했다. |
| Rust std docs, `std::process::Child`, https://doc.rust-lang.org/std/process/struct.Child.html | 공식 문서 | `Child` drop은 wait를 호출하지 않으므로 child process lifecycle을 명시적으로 관리해야 한다. | cancel/timeout/error 경로에서 `kill()` 뒤 `wait()`를 호출하게 했다. |

## 약한 출처와 제외

- 일반 블로그의 “React memory leak” 체크리스트는 공식 React/MDN 문서보다 직접성이 낮아 주요 근거로 쓰지 않았다.
- Tauri community 글은 이번 코드의 핵심 lifecycle이 Rust `Child`와 React effect에 있기 때문에 보조 신호로만 보았다.

## 계획 영향

- 전체 앱을 장시간 soak profiling하지 않고, 먼저 실제 생성/cleanup 경로가 있는 child process, reader thread, session store, interval, fetch/effect slice를 점검한다.
- 완료 session retention/prune 기준을 추가하고, 기존 task-run store는 durable record로 계속 보존한다.
- resource guard input을 남기고 `check-resources`로 close-out한다.

## 불확실성

- 실제 외부 CLI를 연결한 장시간 RSS/heap soak test는 이번 범위에서 실행하지 않았다. 실제 installed adapter를 계속 사용하는 단계에서 별도 soak profile을 추가해야 한다.
