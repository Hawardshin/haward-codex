# 2026-06-07 desktop package typecheck fix 작업 요약

- `DesktopRuntimePanel`에서 부모 스코프의 `refreshProviderCredentials`를 직접 참조하던 문제를 prop 전달 구조로 수정함.
- refresh 부작용을 `useRuntimeEnvironmentRefresh` 훅으로 분리해 `MonitorShell.tsx`의 책임을 줄임.
- 서비스 readiness 타입을 `types/desktop.ts`로 옮기고, Rust 서비스 readiness 로직을 `src-tauri/src/features/service_readiness.rs`로 분리함.
- Provider 계정 패널과 runtime customization 패널 분리 구조에 맞춰 readiness/check/test 계약을 업데이트함.
- 내부 패키징 명령이 앱/DMG 생성, 서명 검증, DMG 검증, 내부 앱 실행까지 통과함.

