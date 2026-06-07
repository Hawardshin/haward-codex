# 2026-06-08 request trace

## 요청

- Codex CLI/PTY/CLI 탭 첫 실행 차단 문제 해결
- 어댑터 설정 불일치 해결
- Rust `lib.rs`와 관련 TypeScript 파일 분리

## 결과

- Codex류 AI CLI 어댑터를 네이티브 PTY 세션으로 시작하는 경로를 추가했다.
- GUI PATH와 로그인 셸 PATH 차이를 흡수하는 resolver를 추가했다.
- Rust `lib.rs`를 31줄 진입점과 28개 `lib_parts` 파일로 분리했다.
- RuntimeTerminalDrawer를 하위 모듈로 분리했다.
- readiness/check/test aggregation을 새 구조에 맞췄다.

## 산출물

- `platform-desktop-app/docs/requirements/2026-06-08-codex-cli-pty-first-run.ko.md`
- `platform-desktop-app/specs/2026-06-08-codex-cli-pty-first-run/`
- `_history/evaluations/2026/2026-06-08-codex-cli-pty-first-run.ko.md`

## 검증

- Rust, platform, renderer 테스트와 check, renderer customer build 통과.

## 후속

- 기존 대형 TypeScript 파일 전체 분리는 별도 안전 리팩터링으로 남음.
