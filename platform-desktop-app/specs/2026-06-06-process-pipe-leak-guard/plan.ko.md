# 구현 계획: 프로세스/파이프 누수 방지

## 순서

1. Rust std/process, portable-pty, Tauri child process lifecycle 관련 공식 문서와 issue/community 신호를 확인한다.
2. 기존 CLI/PTY session store의 종료 경로를 찾고 직접 kill-only 경로를 정리한다.
3. CLI spawn에 Unix process group을 설정하고 timeout/error/store cleanup에서 kill/wait를 통합한다.
4. CLI/PTY session struct에 Drop guard와 dispose/finalize helper를 추가한다.
5. readiness tests에 lifecycle token을 추가해 regressions를 막는다.
6. Rust/Node tests와 내부 패키징 빌드를 실행한다.
7. 요구사항, 스펙, 검증, resource/omission/evaluation trace를 남기고 commit/push한다.

## 검증 게이트

- `corepack pnpm --filter platform-desktop-app test`
- `cd platform-desktop-app/src-tauri && cargo check`
- `cd platform-desktop-app/src-tauri && cargo test`
- `corepack pnpm --filter workspace-monitor run collect`
- `corepack pnpm run desktop:package:internal`
- `git diff --check`

## Rollback

`Cargo.toml`의 `libc` 직접 의존성, process group setup, dispose/finalize helper, readiness token을 되돌린 뒤 `cargo check`, `platform-desktop-app test`, `desktop:package:internal`을 재실행한다.
