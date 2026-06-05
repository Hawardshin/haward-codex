# 계획 기록: 프로세스/파이프 누수 방지

## 문제 정의

터미널/CLI 기능은 child process, pipe, reader thread, PTY handle을 소유한다. 데스크톱 앱에서 탭 전환과 터미널 반복 사용이 계속되면 종료 경로가 불완전한 세션은 memory/FD/thread/process 누수로 이어질 수 있다.

## 결정

- Rust/Tauri backend에서 OS resource lifecycle을 닫는다.
- Renderer에 cleanup 책임을 두지 않는다.
- CLI adapter는 Unix process group으로 격리한다.
- 세션 store cleanup과 Drop guard를 모두 close-out 경로로 둔다.
- reader join은 bounded grace로 제한한다.

## 실행

- 기존 직접 kill/wait call site를 dispose helper로 대체한다.
- PTY master를 `Option`으로 바꿔 finished 상태에서 drop 가능하게 한다.
- readiness/check-readiness에 lifecycle token을 추가한다.
- package build까지 실행한다.
