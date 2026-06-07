# Spec: deferred queue final closure

- 날짜: 2026-06-08
- 소유 범위: root backlog, `platform-desktop-app/renderer/workspace-monitor`

## 목표

남은 deferred queue를 실제 기능과 검증으로 닫는다. 핵심은 답변 대기 질문이 사용자 화면에 드러나도록 만들고, `MonitorShell`의 일부 화면을 독립 component로 분리하며, 오래된 backlog를 근거 기반 상태로 갱신하는 것이다.

## 기능 요구

- collector는 spec reconciliation input/report와 human decision inbox에서 열린 clarification 질문을 수집한다.
- snapshot은 `clarificationQueue`와 `stats.clarificationQuestions`를 제공한다.
- workspace monitor는 Decision Inbox drilldown에 clarification queue panel을 렌더링한다.
- Unified Ops panel은 `MonitorShell.tsx`가 아닌 별도 feature module에서 렌더링된다.
- backlog는 완료, 외부 gate, 구조 압력을 구분한다.

## 비범위

- macOS Developer ID signing, notarization, Windows installer smoke는 이번 로컬 구현에서 완료하지 않는다.
- `MonitorShell.tsx`와 모든 TS 파일을 이번 slice에서 500줄 이하로 만들었다고 주장하지 않는다.
