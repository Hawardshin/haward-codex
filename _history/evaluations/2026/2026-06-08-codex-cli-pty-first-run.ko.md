# 2026-06-08 Codex CLI PTY first-run 평가

## 평가

- 요구 충족: 부분 통과. Codex CLI 첫 실행/PTY 실행/어댑터 PATH 문제는 해결했다. 기존 모든 대형 TypeScript 파일 분리는 후속 범위가 남는다.
- 기능 보존: 통과. pipe session은 유지하고 TUI CLI만 PTY 경로로 라우팅했다.
- 구조 개선: 통과. Rust `lib.rs`는 31줄, `lib_parts` 최대 495줄이다. RuntimeTerminalDrawer와 하위 터미널 파일은 최대 498줄이다.
- 검증: 통과. Rust, Node, TypeScript, readiness, customer build 검증을 통과했다.
- 공개 배포: 범위 외. public signing/notarization/updater credential blocker는 기존 정책상 유지된다.

## 잔여 리스크

- `MonitorShell.tsx` 등 기존 대형 TypeScript 파일이 남아 있다. 안전한 후속 slice로 상태/핸들러/패널 단위 분리가 필요하다.
- 인앱 Browser 도구가 노출되지 않아 시각 QA는 수행하지 못했다.
