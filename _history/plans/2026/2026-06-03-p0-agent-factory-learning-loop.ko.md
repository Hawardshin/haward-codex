# Plan Record: P0 Agent Factory and Learning Loop

## 분류

- work mode: `ship_first`
- view mode: `superadmin_developer`
- installable desktop app scope: `platform-desktop-app/`

## 선택한 slice

직전 제품 갭 레지스트리의 P0 항목인 `agent_factory_creation_wizard`와 `learning_feedback_automation_loop`를 먼저 닫는다. PTY, native Git depth, public distribution gate는 별도 P1/P2/external gate로 유지한다.

## 결정

- Agent Factory는 source repo 직접 쓰기 전에 app-data proposal을 남기는 native command로 구현한다.
- Learning Loop는 자동 승격이 아니라 accumulated evidence 기반 candidate와 human decision record를 먼저 구현한다.
- readiness는 더 이상 두 P0 gap을 missing/partial로 요구하지 않고 implemented status를 요구한다.

## 검증 게이트

- TypeScript check
- Rust cargo check
- platform tests
- customer build
- platform readiness check
