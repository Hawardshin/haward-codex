# 계획: Monitor 성능 가드레일 완성

## 단계

1. 현재 성능 최적화 구조를 유지하면서 heavy panel 경계 목록을 확정한다.
2. `MonitorShell.tsx`를 대상으로 runtime static import, dynamic import, preload path 계약을 검사하는 스크립트를 만든다.
3. Workspace Monitor check와 tests에 계약을 추가한다.
4. section switch audit에 반복 실행과 long-task telemetry를 추가한다.
5. desktop readiness/test가 새 계약을 요구하도록 연결한다.
6. 전체 check, internal package build, built output performance audits를 실행한다.
7. 요구사항, 스펙, 검증, 리소스/누락/evaluation 기록을 남기고 commit/push한다.

## 롤백 경계

- lazy-boundary contract가 과하게 막으면 target 목록이나 preload 검사만 되돌릴 수 있다.
- audit threshold가 환경 변동에 너무 민감하면 threshold와 반복 횟수만 조정할 수 있다.
- UI/runtime source 변경은 이번 슬라이스에서 최소화했으므로 rollback surface는 scripts/tests/check wiring에 집중된다.

## 잔여 마이그레이션

- `MonitorShell.tsx` domain panel 분리
- `globals.css` feature ownership 분리
- `src-tauri/src/lib.rs` command domain module 분리
- OS-level memory/process telemetry를 release smoke에 연결
