# 2026-06-07 Task Run Store panel split 작업 시간

## 단계별 기록

- 웹 확인: React props/TypeScript, Rust module split 공식 문서 확인.
- 소스 조사: Task Run Store UI 블록, task run state/action, readiness/test source aggregation 확인.
- 구현: `TaskRunStorePanel.tsx` 추가, `MonitorShell.tsx` 호출부 전환.
- 테스트 보정: `tool-studio.test.mjs`가 새 feature source를 함께 검사하도록 수정.
- 검증: workspace monitor check/test, desktop app test/check 실행.

## 병목

- 기존 test 하나가 `MonitorShell.tsx` 단일 파일만 검사하고 있어, 분리된 컴포넌트의 copy를 못 찾았다. source aggregation으로 해결했다.
