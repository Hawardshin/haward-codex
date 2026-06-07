# 2026-06-08 Codex CLI PTY first-run 작업 타이밍

## 단계별 기록

- 웹/공식 문서 확인: 약 5분
- 로컬 원인 분석과 구현: 약 35분
- Rust/TypeScript 분리: 약 35분
- readiness/test/build 보정: 약 25분
- 기록/평가/커밋 준비: 약 15분

## 병목

- 기존 검증 스크립트와 테스트가 `lib.rs` 단일 파일 전제를 여러 곳에 갖고 있어 source aggregation 갱신이 필요했다.
- 기존 TypeScript 대형 파일 전체 분리는 별도 구조 리팩터링이 필요하다.
