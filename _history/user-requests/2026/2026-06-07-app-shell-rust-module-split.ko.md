# 2026-06-07 사용자 요청 요약: 앱 셸 Rust 모듈 분리

## 요청

“싹다 구현”이라고 요청했다. 이전 맥락상 기능 이슈 없이 큰 소스를 계속 분리하고, 공통 로직과 구조를 일관되게 만들라는 의미다.

## 이번 처리 범위

- Rust `lib.rs`에 남아 있는 앱 셸 read-only 명령 3개를 `features/app_shell.rs`로 이동했다.
- 기존 프론트엔드 invoke command 이름과 payload shape는 유지했다.
- 검사 스크립트를 `lib.rs` 단일 파일 가정에서 runtime source aggregate 가정으로 바꿨다.

## 제외

- 모든 남은 `lib.rs` 구현을 한 번에 옮기지는 않았다. process/PTY/git/workspace cache 영역은 상태와 리소스 위험이 커서 후속 슬라이스로 나눠야 한다.
