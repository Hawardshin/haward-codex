# 2026-06-07 소스 에디터 세션 훅 분리 요청

## 요청 요약

- 이전 구현보다 더 넓은 범위로 계속 구현한다.
- 큰 `MonitorShell.tsx`에 남아 있는 source editor 세션 상태, ref, timer 로직을 더 분리한다.
- 기능 이슈가 생기지 않도록 구조 계약, TypeScript, Rust/Tauri 패키징까지 확인한다.

## 적용 범위

- 소유 프로젝트: `platform-desktop-app`
- 주요 대상: Workspace Monitor source editor 세션 상태 경계
- 작업 모드: `standard`

## 수용 기준

- Monaco editor instance ref, active source path ref, visible draft ref, draft sync timer를 `MonitorShell.tsx` 밖으로 이동한다.
- visible source state 적용, draft update scheduling, current editor draft read, effective draft snapshot 계산을 하나의 hook으로 묶는다.
- source editor 구조 계약과 readiness source map이 새 hook을 검증한다.
- Workspace Monitor check/test, platform-desktop-app test, 내부 패키징 명령이 통과해야 한다.
