# 작업 계획: Overview UX 내비게이션 개선

## 요청

- 사용자 요청: `UX UI 개선해`
- 요청 ID: `UR-2026-06-03-011`
- 소유 프로젝트: `workspace-monitor/`

## 계획

1. 웹 검색으로 상태 피드백, command bar, dense dashboard UX 기준을 확인한다.
2. `workspace-monitor/components/MonitorShell.tsx`와 `workspace-monitor/app/globals.css`의 기존 Overview 구조를 검토한다.
3. 기존 snapshot 데이터만 사용해 section tab badge와 operator strip을 추가한다.
4. UX 변경에 대한 요구사항, 스펙, traceability, history를 갱신한다.
5. Next/TypeScript/test/build와 desktop customer bundle, Rust/Tauri 검증을 실행한다.
6. static/browser smoke로 렌더링 토큰을 확인한다.

## 범위 통제

- 저장소 전체 UI 재설계가 아니라, 현재 가장 자주 진입하는 Workspace Monitor Overview 상단 UX를 개선한다.
- 새로운 런타임 데이터 모델이나 고객 bundle 정책은 이번 변경에서 건드리지 않는다.
