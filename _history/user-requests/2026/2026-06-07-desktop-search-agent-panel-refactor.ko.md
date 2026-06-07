# 2026-06-07 데스크톱 검색 에이전트 패널 분리 요청

## 요청 요약

사용자는 데스크톱 내부 패키징 실패를 고치고, 너무 큰 TypeScript/Rust 소스를 계속 쪼개서 구현하라고 요청했다. 이전 조각에서 typecheck 실패와 런타임/공급자 경계 일부를 복구한 뒤, 이번 조각은 이어서 `MonitorShell.tsx`의 검색 에이전트 채팅 UI와 모델 라우팅 로직을 별도 파일로 분리하는 범위다.

## 수용 기준

- `MonitorShell.tsx`에서 검색 에이전트 채팅 UI와 모델 라우팅 세부 로직을 분리한다.
- TypeScript check/test와 데스크톱 readiness 검사가 새 파일 경계를 인식한다.
- Rust 경계는 깨지지 않아야 하며 `cargo check` 또는 패키징 빌드에서 확인한다.
- 최종적으로 `desktop:package:run:internal`이 통과해야 한다.

