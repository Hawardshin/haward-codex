# 요청-결과 추적: 질문 보류 기능

## 요청

- 사용자는 CLI가 질문을 했을 때 작업을 멈추거나 임의 결정하지 말고 질문 보류 기능을 모두 넣어 달라고 요청했다.

## 결과

- 자동 보류 기본값, 수동 보류, 전체 감지 질문 보류, decision inbox 저장, answer/resume 연결을 구현했다.
- 활성 session 자동 polling으로 사용자가 자리를 비운 상태에서도 질문 감지가 동작할 수 있게 했다.

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `workspace-monitor/app/globals.css`
- `platform-desktop-app/specs/2026-06-03-question-deferral/`
- `_requirements/changes/2026-06-03-question-deferral.ko.md`

## 검증

- 최종 검증 결과는 `_history/evaluations/2026/2026-06-03-question-deferral-evaluation-result.json`에 기록한다.
