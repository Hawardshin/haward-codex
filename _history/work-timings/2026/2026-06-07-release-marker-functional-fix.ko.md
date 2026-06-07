# 2026-06-07 release marker 기능 이슈 작업 시간

## 단계별 기록

- 웹 확인: Tauri command/error handling, React state, Rust visibility 공식 문서 확인.
- 소스 조사: product gap registry, release readiness script, public release config, service readiness runtime marker 확인.
- 구현: preflight가 `service_readiness.rs`와 generated public config resource map을 함께 검사하도록 수정.
- 테스트: customer bundle/release preflight 테스트에 marker passed 회귀 조건 추가.
- 검증: platform desktop tests, public release report-only, platform desktop check, final internal package/run.

## 병목

- 이전 Rust module split 이후 일부 검사 스크립트가 `lib.rs` 단일 파일 토큰 검사에 남아 있어 false blocker가 발생했다.

## 개선 후보

- release/readiness 검사에서 Rust source file 목록을 공용 helper로 관리하면 다음 module split 후 false blocker를 줄일 수 있다.
