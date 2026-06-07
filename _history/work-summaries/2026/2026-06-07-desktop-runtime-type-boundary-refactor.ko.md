# 2026-06-07 desktop runtime type boundary refactor 작업 요약

- `MonitorShell.tsx`에 남아 있던 데스크톱 런타임/CLI/워크스페이스 report 타입 묶음을 `types/desktop.ts`로 이동함.
- `MonitorShell.tsx`는 이동한 타입을 명시 import하도록 정리함.
- `tool-studio.test.mjs`의 구조 계약을 새 타입 위치 기준으로 갱신함.
- `MonitorShell.tsx`는 약 17,465줄에서 16,883줄로 감소함.
- 기존 Rust service readiness 분리는 유지하고, `cargo check`, Rust test/build, 전체 내부 패키징에서 재검증함.

