# 2026-06-05 Desktop Doctor Request

## Summary

사용자는 기능 개선을 요청했다.

## Interpreted Requirement

- 최근 desktop install/build 개선 흐름에서 사용자가 다음 명령을 고르기 전에 환경 상태를 빠르게 이해할 수 있어야 한다.
- 느린 전체 빌드나 패키징 전에 Node, pnpm, Rust, Tauri, Playwright, renderer bundle, release gate를 한 번에 확인한다.
- 실패와 public release용 남은 gate를 분리해 internal package 가능 여부를 명확히 보여준다.
- 기존 generated snapshot 산출물은 건드리지 않는다.
