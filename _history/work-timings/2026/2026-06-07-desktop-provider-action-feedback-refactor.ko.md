# 2026-06-07 provider/action feedback 분리 작업 시간

## 단계별 기록

- intake 및 웹 확인: React props/component, TypeScript module, Rust module 공식 문서 확인.
- 소스 조사: `MonitorShell.tsx`, `src-tauri/src/lib.rs`, provider/readiness/test 검사 지점을 확인.
- Rust 구현: provider credential/model/task 실행 구현을 `features/providers.rs`로 이동하고 wrapper 호출을 정리.
- TypeScript 구현: `DesktopActionFeedbackCard.tsx` 추가 및 `MonitorShell.tsx` 호출부 교체.
- 검사 보완: readiness와 구조 테스트가 새 파일을 포함하도록 업데이트.
- 검증: Rust check, workspace-monitor check/test, desktop-app test/check, 최종 internal package/run.

## 병목

- 기존 테스트와 readiness 일부가 `lib.rs` 또는 `MonitorShell.tsx` 단일 파일 토큰 검사에 의존해 파일 분리 후 오판했다.

## 개선 후보

- 반복되는 source split 작업을 위해 검사 대상 파일 목록을 한 곳에서 선언하는 작은 helper를 만들면 후속 분리 비용이 줄어든다.
