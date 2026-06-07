# 2026-06-08 Codex CLI PTY first-run 누락 점검

## 체크리스트

- 새 지시 전 웹 검색 수행: 완료.
- 로컬 CLI 설치 상태 확인: 완료.
- 첫 실행 차단 원인 반영: 완료.
- PTY 경로 구현: 완료.
- GUI PATH 차이 대응: 완료.
- provider env 전달: 완료.
- Rust `lib.rs` 분리: 완료.
- 터미널 TypeScript 표면 분리: 완료.
- readiness/test aggregation 갱신: 완료.
- check/test/build 실행: 완료.
- `_private/` 미열람: 완료.
- 기존 대형 TypeScript 파일 전체 분리: 미완료, 후속 리팩터링 대상으로 기록.

## 판단

사용자의 핵심 차단 문제인 Codex CLI 첫 실행/PTY 실행 경로는 구현했다. 전체 TypeScript 파일 500줄 이하 목표는 기존 대형 파일이 많아 별도 리팩터링 범위가 남는다.
