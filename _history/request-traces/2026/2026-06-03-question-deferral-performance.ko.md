# 요청-결과 추적: 질문 보류 성능

## 요청

- 사용자는 질문 보류 기능에 속도적 측면도 모두 고려해 달라고 요청했다.

## 결과

- backend 질문 감지 scan을 bounded tail로 제한했다.
- frontend active session polling에 overlap guard, inbox throttle, session report merge, idle elapsed bucket을 추가했다.
- readiness/test/check/build/performance budget 검증을 통과했다.

## 산출물

- `platform-desktop-app/src-tauri/src/lib.rs`
- `workspace-monitor/components/MonitorShell.tsx`
- `platform-desktop-app/specs/2026-06-03-question-deferral-performance/`
