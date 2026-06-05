# 구현 계획

1. 공식 문서와 crate metadata를 확인해 PTY/xterm 구현 옵션을 검토한다.
2. `portable-pty`를 Tauri 프로젝트 로컬 Rust 의존성으로 추가하고 설치 감사 기록을 남긴다.
3. Rust runtime에 별도 `PtySessionStore`와 PTY start/list/poll/write/resize/cancel command를 구현한다.
4. `RuntimeTerminalDrawer`에 PTY tab과 xterm surface를 추가한다.
5. `DesktopRuntimePanel`에서 PTY 세션 상태, 폴링, 입력, resize, cancel을 연결한다.
6. CSS, runtime contract, product gap registry, architecture docs, readiness tests를 갱신한다.
7. Rust/TypeScript/readiness/package build를 실행하고 리소스/누락 평가를 기록한다.
